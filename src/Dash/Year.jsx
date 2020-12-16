import Axios from 'axios';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import Button from '../Components/Button';
import Empty from '../Components/Empty';
import Edit from '../Components/Icons/Edit';
import Trash from '../Components/Icons/Trash';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import Modal from '../Components/Modal';
import Select from '../Components/Select';
import { server } from '../config';
import classes from './Year.module.css';
import ok from "../Assets/ok.svg";
import unknown from "../Assets/unknown.svg";
import warn1 from "../Assets/warn1.svg";
import warn2 from "../Assets/warn2.svg";
import warn3 from "../Assets/warn3.svg";
import { Link } from 'react-router-dom';
import schools from "../schools.json";
import { useDropzone } from 'react-dropzone';
import { countries } from 'country-flag-icons'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { hasRight } from '../utils';

const roundSum = (el) => Math.round(el * 100) / 100

const schoolsMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const activeStyle = {
    borderColor: 'var(--primary)'
};

const acceptStyle = {
    borderColor: 'var(--primary)'
};

const rejectStyle = {
    borderColor: 'var(--red)'
};

const colors = {
    0: "#b8b8b8",
    1: "#CA3200",
    2: "#F28F3B",
    3: "#FFBE40",
    4: "#92B725",
    5: "#0AAE02"
}

const reputationMap = {
    ok,
    unknown,
    warn1,
    warn2,
    warn3
}

/**
 * transparency: 1,
        uniqueness: 1,
        screening: 1,
        award: 1,
 */

const evals = [
    {
        value: "transparency",
        label: "Transparency of evaluation"
    },
    {
        value: "uniqueness",
        label: "Assignment uniqueness"
    },
    {
        value: "screening",
        label: "Screening selectivity"
    },
    {
        value: "award",
        label: "Award selectivity"
    }
]

const getRounds = (rounds, num) => {
    const result = [];
    for (let i = 0; i < rounds; i++) {
        num ? result.push(0) : result.push(i)
    }
    return result;
}

const Year = ({ token, match, user }) => {
    const { id } = match.params;
    const [year, setYear] = useState({
        isFetching: true,
        data: null,
        grades: []
    })
    const [grade, setGrade] = useState(0)
    const [modal, setModal] = useState({
        open: false,
        edit: null
    })
    const getYear = () => {
        Axios({
            url: server + `api/v1/year`,
            params: {
                id,
                fullGrade: true
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setYear({
                    isFetching: false,
                    data: res.data.year,
                    grades: res.data.grades
                })
                if (res.data.grades.length < 1) {
                    setModal({
                        open: true,
                        edit: null
                    })
                }
            }
        })
    }
    const visible = hasRight(user, ["admin", "moderator", "archiver"])
    useEffect(getYear, [])
    return (
        <div className={classes.Year}>
            <h1>{year.isFetching ? "Loading..." : year.data.year}</h1>
            {year.isFetching ? <Loader /> : (
                <>
                    <p className={classes.paragraph}>{year.data.olympiad ? year.data.olympiad.en : "No olympiad"}</p>
                    <div className={classes.yearEvals}>
                        {evals.map((el) => (
                            <div key={el.value} className={classes.yearEval}>
                                <div style={{
                                    borderColor: colors[year.data[el.value]]
                                }} className={classes.yearEvalValue}>
                                    {year.data[el.value] ? `${year.data[el.value]}/5` : ""}
                                </div>
                                <div className={classes.yearEvalLabel}>{el.label}</div>
                            </div>
                        ))}
                        <div className={classes.yearEval}>
                            <img height={48} src={reputationMap[year.data.reputation]} alt="Credibility" />
                            <div className={classes.yearEvalLabel}>Credibility</div>
                        </div>
                        {year.data.participants ? <div className={classes.yearEval}>
                            <div style={{
                                borderColor: "var(--border)"
                            }} className={classes.yearEvalValue}>
                                {year.data.participants}
                            </div>
                            <div className={classes.yearEvalLabel}>Participants</div>
                        </div> : null}
                        {year.data.countries ? <div className={classes.yearEval}>
                            <div style={{
                                borderColor: "var(--border)"
                            }} className={classes.yearEvalValue}>
                                {year.data.countries}
                            </div>
                            <div className={classes.yearEvalLabel}>Countries</div>
                        </div> : null}
                    </div>
                    {year.data.multiple ? (
                        <div className={classes.tabs}>
                            <label>Grades</label>
                            <div className={classes.tabsWrap}>
                                {year.grades.map((el, i) => (
                                    <div key={i} onClick={() => setGrade(i)} className={clsx(classes.tab, {
                                        [classes.active]: grade === i
                                    })}>
                                        {el.grade} grade
                                    </div>
                                ))}
                                {visible ? <div onClick={() => setModal({
                                    open: true,
                                    edit: null
                                })} className={classes.tab}>+ Add</div> : null}
                            </div>
                        </div>
                    ) : null}
                    {year.grades[grade] ? <Grade visible={visible} update={getYear} year={year.data} token={token} grade={year.grades[grade]} /> : <Empty />}
                    <Modal open={modal.open} close={() => setModal({
                        open: false,
                        edit: null
                    })} title={modal.edit ? "Edit grade" : (year.data.multiple ? "New grade" : "Rounds")}>
                        <NewGrade onDone={() => {
                            getYear()
                            setModal({
                                open: false,
                                edit: null
                            })
                        }} multiple={year.data.multiple} year={year.data._id} token={token} />
                    </Modal>
                </>
            )}
        </div>
    );
}

const Grade = ({ grade, token, year, update, visible }) => {
    const { addToast } = useToasts();
    const [modal, setModal] = useState({
        open: false,
        edit: null
    })
    const [participants, setParticipants] = useState({
        isFetching: true,
        items: []
    })
    const [imp, setImp] = useState(false);
    const removeGrade = () => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/grade/remove/${grade._id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                update();
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const getParticipants = () => {
        Axios({
            url: server + `api/v1/participant/`,
            params: {
                grade: grade._id
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setParticipants({
                    isFetching: false,
                    items: res.data.participants.map((el) => ({
                        ...el,
                        sum: el.rounds.length > 0 ? el.rounds.reduce((a, b) => a + b) : null
                    }))
                })
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const remove = (id) => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/participant/remove/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                getParticipants();
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    useEffect(() => {
        setParticipants({
            isFetching: true,
            items: []
        })
        getParticipants()
    }, [grade])
    return grade ? (
        <div className={classes.Grade}>
            <div className={classes.table}>
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            {year.olympiad.int ? <th>Country</th> : null}
                            <th>Name</th>

                            <th>School</th>
                            {grade.rounds > 1 ? getRounds(grade.rounds).map((el) => (
                                <th key={el}>Round {el + 1}</th>
                            )) : null}
                            {grade.rounds === 0 ? null : <th>Sum</th>}
                            <th>Medal</th>
                            {visible ? <th>Actions</th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {participants.items.sort((a, b) => b.sum - a.sum).map((el, i) => (
                            <tr key={el._id}>
                                <td>{i + 1}</td>
                                {year.olympiad.int ? <td>{el.country ? (
                                    countries.includes(el.country) ? <img
                                        alt={el.country}
                                        className={classes.flag}
                                        src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${el.country}.svg`} /> : el.country
                                ) : "N/A"}</td> : null}
                                <td>{el.student ? (<Link to={`/profile/${el.student}`}>{el.nameEn}</Link>) : el.nameEn}</td>

                                <td>{el.school ? schools[el.school] : "-"}</td>
                                {el.rounds.length > 1 ? el.rounds.map((el, i) => (
                                    <td key={i}>{el}</td>
                                )) : null}
                                {grade.rounds === 0 ? null : <td>{roundSum(el.sum)}</td>}
                                <td>{el.medal}</td>
                                {visible ? <td className={classes.participantActions}>
                                    <button onClick={() => {
                                        setModal({
                                            open: true,
                                            edit: el
                                        })
                                    }}>
                                        <Edit />
                                    </button>
                                    <button onClick={() => {
                                        remove(el._id)
                                    }}>
                                        <Trash />
                                    </button>
                                </td> : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {participants.isFetching ? <Loader /> : (
                participants.items.length ? null : (<Empty />)
            )}
            {year.multiple && visible ? <Button icon={<Trash size={20} />} style={{
                width: "fit-content"
            }} type="outline" size="small" onClick={removeGrade}>Delete grade</Button> : null}
            {visible ? <button onClick={() => setModal({
                open: true,
                edit: null
            })} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button> : null}
            {visible ? <button style={{
                bottom: 80
            }} onClick={() => setImp(true)} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" /><path d="M16 16l-4-4-4 4" /></svg>
            </button> : null}
            <Modal open={modal.open} close={() => setModal({
                open: false,
                edit: null
            })} title={modal.edit ? "Edit participant" : "New participant"}>
                <NewParticipant update={() => {
                    setModal({
                        open: false,
                        edit: null
                    })
                    getParticipants()
                }} token={token} edit={modal.edit} grade={grade} />
            </Modal>
            <Modal open={imp} close={() => setImp(false)} title="Import">
                <Import grade={grade} token={token} onDone={() => {
                    getParticipants()
                    setImp(false)
                }} />
            </Modal>
        </div>
    ) : null
}

const fields = [
    ["nameEn", "Name (en)"],
    ["nameRu", "Name (ru)"],
    ["nameKk", "Name (kk)"],
]

const NewParticipant = ({ token, update, grade, edit }) => {
    const [participant, setParticipant] = useState({
        nameRu: "",
        nameEn: "",
        nameKk: "",
        country: "",
        school: 20,
        student: "",
        rounds: getRounds(grade.rounds, true),
        medal: "none",
        grade: grade._id,
    })
    const [students, setStudents] = useState([]);
    const handleChange = (field) => e => {
        setParticipant({
            ...participant,
            [field]: e.target.value
        })
    }
    const handleChangeValue = (field) => value => {
        setParticipant({
            ...participant,
            [field]: value
        })
    }
    useEffect(() => {
        setParticipant({
            nameRu: "",
            nameEn: "",
            nameKk: "",
            country: "",
            school: 20,
            student: "",
            rounds: getRounds(grade.rounds, true),
            medal: "none",
            grade: grade._id,
        })
    }, [grade])
    useEffect(() => {
        if (edit) {
            setParticipant({
                ...edit,
                sum: undefined,
                _id: undefined,
                __v: undefined
            })
        }
    }, [edit])
    useEffect(() => {
        Axios({
            url: server + `api/v1/student/`
        }).then((res) => {
            if (res.data && res.data.success) {
                setStudents(res.data.students)
            }
        })
    }, [])
    const saveParticipant = () => {
        Axios({
            url: server + (edit ? `api/v1/participant/edit/${edit._id}` : `api/v1/participant/create`),
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                ...participant,
                student: participant.student || ""
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setParticipant({
                    nameRu: "",
                    nameEn: "",
                    nameKk: "",
                    country: "",
                    school: 20,
                    student: "",
                    rounds: getRounds(grade.rounds, true),
                    medal: "none",
                    grade: grade._id,
                })
                update()
            }
        })
    }
    return (
        <form onSubmit={e => {
            e.preventDefault();
            saveParticipant()
        }}>
            <div className={classes.field}>
                <Select label="Profile" value={participant.student || ""} onChange={(e) => {
                    const student = students.filter(el => el._id === e.target.value)[0];
                    if (student) {
                        setParticipant({
                            ...participant,
                            student: student._id,
                            nameEn: student.nameEn,
                            nameRu: student.nameRu,
                            nameKk: student.nameKk,
                        })
                    } else {
                        handleChange("student")(e)
                    }
                }} items={[
                    {
                        value: "",
                        label: "No profile"
                    },
                    ...students.map((el) => ({
                        value: el._id,
                        label: el.nameEn
                    }))
                ]} />
            </div>
            {fields.map(el => (
                <div className={classes.field} key={el[0]}>
                    <Input value={participant[el[0]]} onChange={handleChange(el[0])} label={el[1]} />
                </div>
            ))}
            {participant.rounds.map((el, i) => (
                <div className={classes.field} key={i}>
                    <Input type="number" value={el} onChange={(e) => {
                        const strs = [...participant.rounds];
                        strs[i] = e.target.value;
                        handleChangeValue("rounds")(strs)
                    }} label={`Round ${i + 1}`} />
                </div>
            ))}
            <div className={classes.field}>
                <Select
                    label="Country"
                    value={participant.country}
                    onChange={handleChange("country")}
                    items={[
                        {
                            value: "",
                            label: "N/A"
                        },
                        ...countries.map((el) => ({
                            value: el,
                            label: getUnicodeFlagIcon(el) + " " + el
                        }))
                    ]} />
            </div>
            <div className={classes.field}>
                <Select label="Medal" value={participant.medal} onChange={handleChange("medal")} items={[
                    {
                        value: 'gold',
                        label: "Gold"
                    },
                    {
                        value: 'silver',
                        label: "Silver"
                    },
                    {
                        value: 'bronze',
                        label: "Bronze"
                    },
                    {
                        value: 'diploma',
                        label: "Diploma"
                    },
                    {
                        value: 'none',
                        label: "None"
                    }
                ]} />
            </div>
            <div className={classes.field}>
                <Select label="School" value={participant.school} onChange={handleChange("school")} items={schoolsMap.map((el) => ({
                    value: el,
                    label: schools[el]
                }))} />
            </div>
            <Button>Save</Button>
        </form>
    )
}

const Import = ({ token, grade, onDone }) => {
    const { addToast } = useToasts()
    const [myFiles, setMyFiles] = useState([]);
    const [items, setItems] = useState([]);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length < 1) {
            return
        }
        setMyFiles([...myFiles, ...acceptedFiles])
        const fr = new FileReader();
        fr.onload = (e) => {
            let result = [];
            try {
                result = JSON.parse(e.target.result)
            } catch (err) {
                setMyFiles([]);
                addToast("Error during JSON parsing", { appearance: "error" })
            }
            let arr = Object.values(result);
            for (const item of arr) {
                if (item.rounds.length !== grade.rounds) {
                    console.log(item.rounds.length, grade.rounds)
                    setMyFiles([])
                    return addToast("Bad round count", { appearance: "error" })
                }

            }
            setItems(Object.values(result))
        }
        fr.readAsText(acceptedFiles[0]);
    }, [myFiles, grade]);

    const { getRootProps, getInputProps, isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
            accept: 'application/json',
            onDrop
        });
    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragAccept, isDragActive, isDragReject]);

    const doImport = async (items) => {
        for (const i in items) {
            await saveParticipant(items[i])
            setProgress(i * 1 + 1)
        }
        setProgress(0);
        setItems([]);
        setMyFiles([]);
        onDone()
    }

    const saveParticipant = (item) => {
        return new Promise((resolve, reject) => {
            Axios({
                url: server + `api/v1/participant/create`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    ...item,
                    grade: grade._id
                }
            }).then((res) => {
                if (res.data && res.data.success) {
                    return resolve()
                } else {
                    console.log(res.data);
                    addToast("Error during import", { appearance: "error" })
                    return reject()
                }
            }).catch((err) => {
                console.log(err);
                addToast("Error during import", { appearance: "error" })
                return reject()
            })
        })

    }
    return (
        <div className={classes.import}>
            <div className={classes.zone}>
                {
                    myFiles.length ? (
                        progress ? (null) : (<div className={classes.file}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" /><path d="M13 3v6h6" /></svg>
                            <span>{myFiles[0].path}</span>
                            <button onClick={() => {
                                setMyFiles([]);
                                setItems([])
                            }}>
                                <Trash />
                            </button>
                        </div>)
                    ) : <div {...getRootProps({ style, className: classes.dropzone })}>
                            <input {...getInputProps()} />
                            <p>Drag files here or click to select</p>
                        </div>
                }
            </div>
            <Button onClick={() => doImport(items)} style={{ marginTop: 12 }} disabled={items.length < 1 || progress > 0}>{items.length > 0 ? (
                progress > 0 ? `Importing ${progress}/${items.length}` : `Import ${items.length} items`
            ) : "Waiting for file"}</Button>
        </div>
    )
}

const NewGrade = ({ year, token, multiple, onDone }) => {
    const { addToast } = useToasts()
    const [grade, setGrade] = useState({
        grade: multiple ? "" : "1",
        rounds: 1,
        year: year
    });
    const saveGrade = () => {
        Axios({
            url: server + `api/v1/grade/create`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                ...grade,
                grade: Number(grade.grade)
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                onDone()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    return (
        <form onSubmit={e => {
            e.preventDefault();
            saveGrade()
        }}>
            {multiple ? <div className={classes.field}>
                <Input type="number" placeholder="10" label="Grade" name="grade" value={grade.grade} onChange={e => setGrade({
                    ...grade,
                    grade: e.target.value
                })} />
            </div> : null}
            <div className={classes.field}>
                <label>Rounds</label>
                <div className={classes.numberSwitch}>
                    <button disabled={grade.rounds < 1} onClick={(e) => {
                        e.preventDefault()
                        setGrade({
                            ...grade,
                            rounds: grade.rounds - 1
                        })
                    }} className={classes.numberSwitchDec}>-</button>
                    <div className={classes.numberSwitchValue}>{grade.rounds}</div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setGrade({
                            ...grade,
                            rounds: +grade.rounds + 1
                        })
                    }} className={classes.numberSwitchInc}>+</button>
                </div>
            </div>
            <Button>Create</Button>
        </form>
    )
}

export default connect(state => state)(Year);