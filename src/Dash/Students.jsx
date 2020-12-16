import Axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import Button from '../Components/Button';
import Checkbox from '../Components/Checkbox';
import Empty from '../Components/Empty';
import Edit from '../Components/Icons/Edit';
import Trash from '../Components/Icons/Trash';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import Modal from '../Components/Modal';
import { server } from '../config';
import { hasRight } from '../utils';
import classes from './Students.module.css'

const activeStyle = {
    borderColor: 'var(--primary)'
};

const acceptStyle = {
    borderColor: 'var(--primary)'
};

const rejectStyle = {
    borderColor: 'var(--red)'
};


const Students = ({ token, history, user }) => {
    const { addToast } = useToasts()
    const [students, setStudents] = useState({
        isFetching: true,
        items: []
    });
    const [modal, setModal] = useState({
        open: false,
        edit: null
    })
    const getStudents = () => {
        Axios({
            url: server + `api/v1/student/`
        }).then((res) => {
            if (res.data && res.data.success) {
                setStudents({
                    isFetching: false,
                    items: res.data.students
                })
            }
        })
    }
    const removeStudent = (id) => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/student/remove/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                getStudents();
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: "error"
                });
            }
        })
    }
    const edit = (data) => {
        setModal({
            open: true,
            edit: data
        })
    }
    const visible = hasRight(user, ["admin", "curator"])
    useEffect(getStudents, [])
    return (
        <div className={classes.Students}>
            <h1>Students</h1>
            <div className={classes.students}>
                {students.isFetching ? <Loader /> : (
                    students.items.length ? (
                        students.items.map((el) => (
                            <User visible={visible} edit={edit} remove={removeStudent} student={el} key={el._id} />
                        ))
                    ) : (<Empty />)
                )}
            </div>
            {visible ? <button onClick={() => setModal({
                open: true,
                edit: null
            })} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button> : null}
            <Modal title={modal.edit ? "Edit profile" : "New profile"} open={modal.open} close={() => setModal({
                open: false,
                edit: null
            })}>
                <NewStudent edit={modal.edit} update={() => {
                    setModal({
                        open: false,
                        edit: null
                    })
                    getStudents()
                }} token={token} />
            </Modal>
        </div>
    );
}

const User = ({ student, edit, remove, visible }) => (
    <div className={classes.User}>
        <div style={{
            backgroundImage: student.avatar ? `url(${server}uploads/${student.avatar})` : null
        }} className={classes.UserAvatar} />
        <div className={classes.UserData}>
            <div className={classes.UserDataName}>{student.nameEn}</div>
            <div className={classes.UserDataEmail}>{student.email}</div>
        </div>
        {visible ? <div className={classes.UserActions}>
            <button onClick={() => edit(student)} >
                <Edit />
            </button>
            <button onClick={() => remove(student._id)}>
                <Trash />
            </button>
        </div> : null}
    </div>
)

const fields = [
    {
        label: "Name",
        items: [
            ["nameEn", "Name (en)", "text"],
            ["nameRu", "Name (ru)", "text"],
            ["nameKk", "Name (kk)", "text"],
        ]
    },
    {
        label: "Title",
        items: [
            ["titleEn", "Title (en)", "text"],
            ["titleRu", "Title (ru)", "text"],
            ["titleKk", "Title (kk)", "text"],
        ]
    },
    {
        label: "School",
        items: [
            ["schoolEn", "School (en)", "text"],
            ["schoolRu", "School (ru)", "text"],
            ["schoolKk", "School (kk)", "text"],
        ]
    },
    {
        label: "Bio",
        items: [
            ["bioEn", "Bio (en)", "textarea"],
            ["bioRu", "Bio (ru)", "textarea"],
            ["bioKk", "Bio (kk)", "textarea"],
        ]
    }
]

const singleFields = [
    ["email", "E-mail", "email"],
    ["link", "Link", "text"],
]

const points = [
    {
        label: "Experience",
        items: [
            ["experienceEn", "Experience (en)"],
            ["experienceRu", "Experience (ru)"],
            ["experienceKk", "Experience (kk)"],
        ]
    },
    {
        label: "Projects",
        items: [
            ["projectsEn", "Projects (en)"],
            ["projectsRu", "Projects (ru)"],
            ["projectsKk", "Projects (kk)"],
        ]
    },
    {
        label: "Interests",
        items: [
            ["interestsEn", "Interests (en)"],
            ["interestsRu", "Interests (ru)"],
            ["interestsKk", "Interests (kk)"]
        ]
    }
]

const NewStudent = ({ token, update, edit }) => {
    const { addToast } = useToasts();
    const [myFiles, setMyFiles] = useState([])

    const [student, setStudent] = useState({
        avatar: "",
        nameEn: "",
        nameRu: "",
        nameKk: "",
        schoolEn: "",
        schoolRu: "",
        schoolKk: "",
        titleEn: "",
        titleRu: "",
        titleKk: "",
        bioEn: "",
        bioRu: "",
        bioKk: "",
        email: "",
        link: "",
        experienceEn: [],
        experienceRu: [],
        experienceKk: [],
        projectsEn: [],
        projectsRu: [],
        projectsKk: [],
        interestsEn: [],
        interestsRu: [],
        interestsKk: [],
        visible: true
    })
    const handleChange = (field) => (e) => {
        setStudent({
            ...student,
            [field]: e.target.value
        })
    }
    const handleChangeValue = (field) => (value) => {
        setStudent({
            ...student,
            [field]: value
        })
    }
    useEffect(() => {
        if (edit) {
            setStudent({
                ...edit,
                _id: undefined,
                __v: undefined
            })
        } else {
            setStudent({
                avatar: "",
                nameEn: "",
                nameRu: "",
                nameKk: "",
                schoolEn: "",
                schoolRu: "",
                schoolKk: "",
                titleEn: "",
                titleRu: "",
                titleKk: "",
                bioEn: "",
                bioRu: "",
                bioKk: "",
                email: "",
                link: "",
                experienceEn: [],
                experienceRu: [],
                experienceKk: [],
                projectsEn: [],
                projectsRu: [],
                projectsKk: [],
                interestsEn: [],
                interestsRu: [],
                interestsKk: [],
                visible: true,
            })
        }
        setMyFiles([])
    }, [edit])
    const [uploading, setUploading] = useState(false)
    const upload = (file) => {
        setUploading(true);
        const fd = new FormData();
        fd.append("image", file)
        Axios({
            url: server + 'api/v1/student/upload',
            method: "POST",
            data: fd,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data && res.data.success) {
                setStudent({
                    ...student,
                    avatar: res.data.name
                });
                setUploading(false);
            } else if (res.data) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length < 1) {
            return
        }
        setMyFiles([...myFiles, ...acceptedFiles])
        const fr = new FileReader();
        fr.onload = () => {
            upload(acceptedFiles[0])
        }
        fr.readAsDataURL(acceptedFiles[0]);
    }, [myFiles])
    const { getRootProps, getInputProps, isDragActive,
        isDragAccept,
        isDragReject } = useDropzone({
            accept: 'image/jpeg, image/png',
            onDrop
        });
    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragAccept, isDragActive, isDragReject]);

    const saveStudent = () => {
        Axios({
            url: server + (edit ? `api/v1/student/edit/${edit._id}` : `api/v1/student/create`),
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: student
        }).then((res) => {
            if (res.data && res.data.success) {
                update();
                setStudent({
                    avatar: "",
                    nameEn: "",
                    nameRu: "",
                    nameKk: "",
                    schoolEn: "",
                    schoolRu: "",
                    schoolKk: "",
                    titleEn: "",
                    titleRu: "",
                    titleKk: "",
                    bioEn: "",
                    bioRu: "",
                    bioKk: "",
                    email: "",
                    link: "",
                    experienceEn: [],
                    experienceRu: [],
                    experienceKk: [],
                    projectsEn: [],
                    projectsRu: [],
                    projectsKk: [],
                    interestsEn: [],
                    interestsRu: [],
                    interestsKk: [],
                    visible: true
                })
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    return (
        <form onSubmit={e => {
            e.preventDefault()
            saveStudent()
        }}>
            <div className={classes.group}>
                <label className={classes.label}>Avatar</label>
                <div className={classes.avatar}>
                    <div style={{
                        backgroundImage: student.avatar ? `url(${server}uploads/${student.avatar})` : null
                    }} className={classes.avatarPhoto}>
                        {uploading ? <div className={classes.avatarLoading} /> : null}
                    </div>
                    <div className={classes.avatarInfo}>
                        {
                            myFiles.length ? (
                                <div className={classes.file}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z" /><path d="M13 3v6h6" /></svg>
                                    <span>{myFiles[0].path}</span>
                                    <button onClick={() => {
                                        setMyFiles([]);
                                        setStudent({
                                            ...student,
                                            avatar: ""
                                        })
                                    }}>
                                        <Trash />
                                    </button>
                                </div>
                            ) : <div {...getRootProps({ style, className: classes.dropzone })}>
                                    <input {...getInputProps()} />
                                    <p>Drag files here or click to select</p>
                                </div>
                        }
                    </div>
                </div>
            </div>
            {
                fields.map((group) => (
                    <div className={classes.group} key={group.label}>
                        <label className={classes.label}>{group.label}</label>
                        {group.items.map((el) => (
                            <div key={el[0]} className={classes.field}>
                                <Input type={el[2]} value={student[el[0]]} onChange={handleChange(el[0])} label={el[1]} name={el[0]} />
                            </div>
                        ))}
                    </div>
                ))
            }
            {singleFields.map((el) => (
                <div key={el[0]} className={classes.field}>
                    <Input type={el[2]} value={student[el[0]]} onChange={handleChange(el[0])} label={el[1]} name={el[0]} />
                </div>
            ))}
            {points.map((group) => (
                <div key={group.label} className={classes.group}>
                    <label className={classes.label}>{group.label}</label>
                    {group.items.map((el) => (
                        <div key={el[0]} className={classes.field}>
                            <Points value={student[el[0]]} label={el[1]} onChange={handleChangeValue(el[0])} />
                        </div>
                    ))}
                </div>
            ))}
            <div className={classes.field}>
                <Checkbox value={student.visible} onChange={handleChangeValue("visible")} label="Visible in the Hall of Fame" />
            </div>
            <Button>Save</Button>
        </form>
    )
}

const Points = ({ value, onChange, label }) => {
    return (
        <div className={classes.Points}>
            <label className={classes.label}>{label}</label>
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

export default connect(state => state)(Students);