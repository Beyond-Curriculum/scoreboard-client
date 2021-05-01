import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'
import Loader from '../Components/Loader';
import Empty from '../Components/Empty';
import Edit from "../Components/Icons/Edit"
import Trash from "../Components/Icons/Trash"
import { server } from '../config';
import classes from './Olympiad.module.css'
import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { useToasts } from 'react-toast-notifications';
import Checkbox from '../Components/Checkbox';
import ok from "../Assets/ok.svg";
import unknown from "../Assets/unknown.svg";
import warn1 from "../Assets/warn1.svg";
import warn2 from "../Assets/warn2.svg";
import warn3 from "../Assets/warn3.svg";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { hasRight } from '../utils';

const colors = {
    0: "#b8b8b8",
    1: "#CA3200",
    2: "#F28F3B",
    3: "#FFBE40",
    4: "#92B725",
    5: "#0AAE02"
}

const reputationTypes = [
    {
        icon: ok,
        value: "ok"
    },
    {
        icon: unknown,
        value: "unknown"
    },
    {
        icon: warn1,
        value: "warn1"
    },
    {
        icon: warn2,
        value: "warn2"
    },
    {
        icon: warn3,
        value: "warn3"
    }
]

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


const Olympiad = ({ token, match, user }) => {
    const { addToast } = useToasts();
    const { id } = match.params;
    const [modal, setModal] = useState({
        open: false,
        editYear: null
    })
    const [olympiad, setOlympiad] = useState({
        isFetching: true,
        data: null,
        years: []
    });
    const getOlympiad = () => {
        Axios({
            url: server + `api/v1/olympiad/`,
            params: {
                id,
                fullYear: true
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setOlympiad({
                    isFetching: false,
                    data: res.data.olympiad,
                    years: res.data.years
                })
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    const setEdit = (data) => {
        setModal({
            open: true,
            editYear: data
        })
    }
    const visible = hasRight(user, ["admin", "moderator"])
    useEffect(getOlympiad, [])
    return (
        <div className={classes.Olympiad}>
            <h1>{olympiad.isFetching ? "Loading..." : olympiad.data.en}</h1>
            {
                olympiad.isFetching ? (<Loader />) : (
                    <>
                        <p className={classes.paragraph}>Russian: {olympiad.data.ru} | Kazakh: {olympiad.data.kk}</p>
                        <div className={classes.years}>
                            {console.log(olympiad.years)}
                            {olympiad.years.length ? (olympiad.years.sort(function(a, b){return b.year - a.year}).map((el) => (
                                <Year visible={visible} token={token} update={getOlympiad} edit={setEdit} key={el._id} year={el} />
                            ))) : <Empty />}
                        </div>
                        <Modal open={modal.open} close={() => setModal({
                            open: false,
                            editYear: null
                        })} title={`${olympiad.data.en}`}>
                            <NewYear editYear={modal.editYear} onDone={() => {
                                setModal({
                                    open: false,
                                    editYear: null
                                });
                                getOlympiad();
                            }} token={token} olympiad={olympiad.data._id} />
                        </Modal>
                        {visible ? <button onClick={() => setModal({
                            open: true,
                            editYear: null
                        })} className={classes.fab}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button> : null}

                    </>
                )
            }
        </div>
    );
}

const Year = ({ year, edit, update, token, visible }) => {
    const { addToast } = useToasts()
    const remove = () => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/year/remove/${year._id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                update()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    return (
        <Link className={classes.year} to={`/dashboard/year/${year._id}`}>
            {visible ? <div className={classes.yearActions}>
                <button onClick={(e) => {
                    e.preventDefault()
                    edit(year)
                }}>
                    <Edit />
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    remove(year)
                }}>
                    <Trash />
                </button>
            </div> : null}
            <div className={classes.yearTitle}>{year.year}</div>
            <div className={classes.yearEvals}>
                {evals.map((el) => (
                    <div key={el.value} className={classes.yearEval}>
                        <div style={{
                            borderColor: colors[year[el.value]]
                        }} className={classes.yearEvalValue}>
                            {year[el.value] ? `${year[el.value]}/5` : ""}
                        </div>
                        <div className={classes.yearEvalLabel}>{el.label}</div>
                    </div>
                ))}
                <div className={classes.yearEval}>
                    <img height={48} src={reputationMap[year.reputation]} alt="Credibility" />
                    <div className={classes.yearEvalLabel}>Credibility</div>
                </div>
                {year.participants ? <div className={classes.yearEval}>
                    <div style={{
                        borderColor: "var(--border)"
                    }} className={classes.yearEvalValue}>
                        {year.participants}
                    </div>
                    <div className={classes.yearEvalLabel}>Participants</div>
                </div> : null}
                {year.countries ? <div className={classes.yearEval}>
                    <div style={{
                        borderColor: "var(--border)"
                    }} className={classes.yearEvalValue}>
                        {year.countries}
                    </div>
                    <div className={classes.yearEvalLabel}>Countries</div>
                </div> : null}
            </div>
        </Link>
    )
}

const NewYear = ({ olympiad, token, onDone, editYear }) => {
    const { addToast } = useToasts();
    const [year, setYear] = useState({
        olympiad: olympiad,
        year: "",
        participants: '',
        countries: '',
        reputation: 'unknown',
        reputationEn: "",
        reputationRu: "",
        reputationKk: "",
        transparency: 1,
        transparencyEn: "",
        transparencyRu: "",
        transparencyKk: "",
        uniqueness: 1,
        uniquenessEn: "",
        uniquenessRu: "",
        uniquenessKk: "",
        screening: 1,
        screeningEn: "",
        screeningRu: "",
        screeningKk: "",
        award: 1,
        awardEn: "",
        awardRu: "",
        awardKk: "",
        multiple: true,
        pointsEn: [],
        pointsRu: [],
        pointsKk: [],
        problemsUrl: "",
        open: true
    })
    useEffect(() => {
        if (editYear) {
            setYear({
                ...editYear,
                _id: undefined,
                __v: undefined
            })
        } else {
            setYear({
                olympiad: olympiad,
                year: "",
                participants: '',
                countries: '',
                reputation: 'unknown',
                transparencyEn: "",
                transparencyRu: "",
                transparencyKk: "",
                reputationEn: "",
                reputationRu: "",
                reputationKk: "",
                uniqueness: 1,
                uniquenessEn: "",
                uniquenessRu: "",
                uniquenessKk: "",
                screening: 1,
                screeningEn: "",
                screeningRu: "",
                screeningKk: "",
                award: 1,
                awardEn: "",
                awardRu: "",
                awardKk: "",
                multiple: true,
                pointsEn: [],
                pointsRu: [],
                pointsKk: [],
                problemsUrl: "",
            })
        }
    }, [editYear])
    const handleChange = (field) => (e) => {
        setYear({
            ...year,
            [field]: e.target.value
        })
    }
    const handleChangeValue = (field) => (value) => {
        setYear({
            ...year,
            [field]: value
        })
    }
    const saveYear = () => {
        Axios({
            url: server + (editYear ? `api/v1/year/edit/${editYear._id}` : `api/v1/year/create`),
            method: "POST",
            headers: {
                Authorization: `Token ${token}`
            },
            data: {
                ...year,
                year: Number(year.year)
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setYear({
                    olympiad: olympiad,
                    year: "",
                    participants: '',
                    countries: '',
                    reputation: 'unknown',
                    reputationEn: "",
                    reputationRu: "",
                    reputationKk: "",
                    transparencyEn: "",
                    transparencyRu: "",
                    transparencyKk: "",
                    uniqueness: 1,
                    uniquenessEn: "",
                    uniquenessRu: "",
                    uniquenessKk: "",
                    screening: 1,
                    screeningEn: "",
                    screeningRu: "",
                    screeningKk: "",
                    award: 1,
                    awardEn: "",
                    awardRu: "",
                    awardKk: "",
                    multiple: true,
                    pointsEn: [],
                    pointsRu: [],
                    pointsKk: [],
                    problemsUrl: "",
                })
                onDone();
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    return (
        <form onSubmit={e => {
            e.preventDefault();
            saveYear()
        }}>
            <div className={classes.field}>
                <Input type="number" value={year.year} placeholder={2020} label="Year" name="year" onChange={handleChange("year")} />
            </div>
            <div className={classes.field}>
                <Slider colors={colors} label="Transparency of evaluation" value={year.transparency} onChange={handleChangeValue("transparency")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (en)" value={year.transparencyEn} onChange={handleChange("transparencyEn")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (ru)" value={year.transparencyRu} onChange={handleChange("transparencyRu")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (kk)" value={year.transparencyKk} onChange={handleChange("transparencyKk")} />
            </div>
            <div className={classes.field}>
                <Slider colors={colors} label="Assignment uniqueness" value={year.uniqueness} onChange={handleChangeValue("uniqueness")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (en)" value={year.uniquenessEn} onChange={handleChange("uniquenessEn")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (ru)" value={year.uniquenessRu} onChange={handleChange("uniquenessRu")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (kk)" value={year.uniquenessKk} onChange={handleChange("uniquenessKk")} />
            </div>
            <div className={classes.field}>
                <Slider colors={colors} label="Screening selectivity" value={year.screening} onChange={handleChangeValue("screening")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (en)" value={year.screeningEn} onChange={handleChange("screeningEn")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (ru)" value={year.screeningRu} onChange={handleChange("screeningRu")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (kk)" value={year.screeningKk} onChange={handleChange("screeningKk")} />
            </div>
            <div className={classes.field}>
                <Slider colors={colors} label="Award selectivity" value={year.award} onChange={handleChangeValue("award")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (en)" value={year.awardEn} onChange={handleChange("awardEn")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (ru)" value={year.awardRu} onChange={handleChange("awardRu")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (kk)" value={year.awardKk} onChange={handleChange("awardKk")} />
            </div>
            <div className={classes.field}>
                <Checkbox label="Multiple grades" value={year.multiple} onChange={handleChangeValue("multiple")} />
            </div>
            <div className={classes.field}>
                <label className={classes.label}>Reputation</label>
                <div className={classes.types}>
                    {reputationTypes.map(el => (
                        <div key={el.value} onClick={() => handleChangeValue("reputation")(el.value)} className={clsx(classes.type, {
                            [classes.active]: el.value === year.reputation
                        })}>
                            <img src={el.icon} alt={el.value} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (en)" value={year.reputationEn} onChange={handleChange("reputationEn")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (ru)" value={year.reputationRu} onChange={handleChange("reputationRu")} />
            </div>
            <div className={classes.field}>
                <Input type="textarea" label="Comment (kk)" value={year.reputationKk} onChange={handleChange("reputationKk")} />
            </div>
            <div className={classes.field}>
                <Points value={year.pointsEn} label="Points (En)" onChange={handleChangeValue("pointsEn")} />
            </div>
            <div className={classes.field}>
                <Points value={year.pointsRu} label="Points (Ru)" onChange={handleChangeValue("pointsRu")} />
            </div>
            <div className={classes.field}>
                <Points value={year.pointsKk} label="Points (Kk)" onChange={handleChangeValue("pointsKk")} />
            </div>
            <div className={classes.field}>
                <Input value={year.participants} placeholder="~500" label="Participants" name="participants" onChange={handleChange("participants")} />
            </div>
            <div className={classes.field}>
                <Input value={year.countries} placeholder="10" label="Countries" name="countries" onChange={handleChange("countries")} />
            </div>
            <div className={classes.field}>
                <Input type="url" label="Link to problems" value={year.problemsUrl} onChange={handleChange("problemsUrl")} />
            </div>
            <div className={classes.field}>
                <Checkbox label="Visible" value={year.open} onChange={handleChangeValue("open")} />
            </div>
            <Button>{editYear ? "Save" : "Create"}</Button>
        </form>
    )
}

const Points = ({ value, onChange, label }) => {
    return (
        <div className={classes.Points}>
            <label>{label}</label>
            {value.map((el, i) => (
                <div key={i} className={classes.PointsInput}>
                    <Input value={el} onChange={(e) => {
                        const strs = [...value];
                        strs[i] = e.target.value;
                        onChange(strs)
                    }} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        const strs = [...value];
                        strs.splice(i, 1);
                        onChange(strs)
                    }}><Trash /></button>
                </div>
            ))}
            <Button style={{
                width: "fit-content"
            }} onClick={(e) => {
                e.preventDefault();
                const strs = [...value];
                strs.push("")
                onChange(strs)
            }} size="small">+</Button>
        </div>
    )
}

const getNumbers = (min, max) => {
    const result = [];
    for (var i = min; i <= max; i++) {
        result.push(i)
    }
    return result
}

const Slider = ({ label, value, onChange, min = 0, max = 5, colors = {} }) => (
    <div style={{
        "--sliderColor": colors[value] || `var(--primary)`
    }} className={classes.Slider}>
        {label ? <label>{label}</label> : null}
        <ReactSlider min={min} max={max} className={classes.slider} thumbClassName={classes.thumb} trackClassName={classes.track} value={value} onChange={onChange} />
        <div className={classes.labels}>
            <span onClick={() => onChange(0)}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></span>
            {getNumbers(1, max).map(number => (
                <span onClick={() => onChange(number)} key={number}>{number}</span>
            ))}
        </div>
    </div>
)


export default connect(state => state)(Olympiad);