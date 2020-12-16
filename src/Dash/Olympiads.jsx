import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import Select from '../Components/Select';
import Edit from "../Components/Icons/Edit"
import Trash from "../Components/Icons/Trash"
import { server } from '../config';
import classes from './Olympiads.module.css'
import { connect } from 'react-redux';
import Modal from '../Components/Modal';
import Input from '../Components/Input';
import Button from '../Components/Button';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import Empty from '../Components/Empty';
import { hasRight } from '../utils';
import Checkbox from '../Components/Checkbox';

const Olympiads = ({ token, user }) => {
    const { addToast } = useToasts();
    const [newOlymp, setNewOlymp] = useState({
        en: "",
        ru: "",
        kk: "",
        path: "",
        int: false,
        subject: ""
    })
    const [editOlymp, setEditOlymp] = useState({
        en: "",
        ru: "",
        kk: "",
        path: "",
        subject: "",
        int: false,
        id: "",
    })
    const [newModal, setNewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [subjects, setSubjects] = useState({
        isFetching: true,
        items: []
    });
    const showEdit = (data) => {
        setEditOlymp(data);
        setEditModal(true)
    }
    const getSubjects = () => {
        Axios({
            url: server + `api/v1/subject`
        }).then((res) => {
            if (res.data && res.data.success) {
                setSubjects({
                    isFetching: false,
                    items: res.data.subjects
                })
                setSubject(res.data.subjects.length > 0 ? res.data.subjects[0]._id : "");
                setNewOlymp({
                    ...newOlymp,
                    subject: res.data.subjects.length > 0 ? res.data.subjects[0]._id : ""
                })
            }
        })
    }
    const [subject, setSubject] = useState("")
    const [olympiads, setOlympiads] = useState({
        isFetching: true,
        items: []
    })
    const getOlympiads = () => {
        Axios({
            url: server + `api/v1/olympiad/`,
            params: {
                subject
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setOlympiads({
                    isFetching: false,
                    items: res.data.olympiads
                })
            }
        })
    }
    useEffect(getSubjects, []);
    useEffect(() => {
        if (!subject) {
            return
        }
        getOlympiads()
    }, [subject])
    const saveOlymp = () => {
        Axios({
            url: server + `api/v1/olympiad/create`,
            method: "POST",
            data: newOlymp,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setNewOlymp({
                    ...newOlymp,
                    en: "",
                    ru: "",
                    kk: "",
                    path: "",
                })
                setNewModal(false);
                getOlympiads()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const saveEditOlymp = () => {
        if (!editOlymp.id) {
            return
        }
        const data = {
            ...editOlymp
        }
        delete data.id
        Axios({
            url: server + `api/v1/olympiad/edit/${editOlymp.id}`,
            method: "POST",
            data: data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setEditOlymp({
                    ...editOlymp,
                    en: "",
                    ru: "",
                    kk: "",
                    path: "",
                })
                setEditModal(false);
                getOlympiads()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const visible = hasRight(user, ["admin", "moderator"])
    return (
        <div className={classes.Olympiads}>
            <h1>Olympiads</h1>
            <Select label="Subject" name="subject" items={subjects.items.map(el => ({
                value: el._id,
                label: el.en
            }))} value={subject} onChange={(e) => {
                setSubject(e.target.value)
            }} />
            <div className={classes.olympiads}>
                {
                    olympiads.isFetching ? (<Loader />) : (
                        olympiads.items.length ? olympiads.items.map((el) => (
                            <Olympiad visible={visible} edit={showEdit} token={token} update={getOlympiads} olympiad={el} key={el._id} />
                        )) : <Empty />
                    )
                }
            </div>
            {visible ? <button onClick={() => setNewModal(true)} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button> : null}
            <Modal open={newModal} title="New olympiad" close={() => setNewModal(false)}>
                <form onSubmit={e => {
                    e.preventDefault();
                    saveOlymp()
                }}>
                    <div className={classes.field}>
                        <Select label="Subject" name="subjectNew" items={subjects.items.map(el => ({
                            value: el._id,
                            label: el.en
                        }))} value={newOlymp.subject} onChange={(e) => {
                            setNewOlymp({
                                ...newOlymp,
                                subject: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.field}>
                        <Input name="newEn" type="text" value={newOlymp.en} onChange={e => setNewOlymp({
                            ...newOlymp,
                            en: e.target.value,
                            path: encodeURIComponent(e.target.value.toLowerCase()).replace(/\W/g, '')
                        })} placeholder="Math" label="Name (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newRu" type="text" value={newOlymp.ru} onChange={e => setNewOlymp({
                            ...newOlymp,
                            ru: e.target.value
                        })} placeholder="Математика" label="Name (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newKk" type="text" value={newOlymp.kk} onChange={e => setNewOlymp({
                            ...newOlymp,
                            kk: e.target.value
                        })} placeholder="Математика" label="Name (kk)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newPath" type="text" value={newOlymp.path} onChange={e => setNewOlymp({
                            ...newOlymp,
                            path: e.target.value
                        })} placeholder="math" label="Path" />
                    </div>
                    <div className={classes.field}>
                        <Checkbox label="International" value={newOlymp.int} onChange={e => setNewOlymp({
                            ...newOlymp,
                            int: e
                        })} />
                    </div>
                    <Button>Save</Button>
                </form>
            </Modal>
            <Modal open={editModal} title="Edit olympiad" close={() => setEditModal(false)}>
                <form onSubmit={e => {
                    e.preventDefault();
                    saveEditOlymp()
                }}>
                    <div className={classes.field}>
                        <Select label="Subject" name="subjectEdit" items={subjects.items.map(el => ({
                            value: el._id,
                            label: el.en
                        }))} value={editOlymp.subject} onChange={(e) => {
                            setEditOlymp({
                                ...editOlymp,
                                subject: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.field}>
                        <Input name="editEn" type="text" value={editOlymp.en} onChange={e => setEditOlymp({
                            ...editOlymp,
                            en: e.target.value,
                        })} placeholder="Math" label="Name (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editRu" type="text" value={editOlymp.ru} onChange={e => setEditOlymp({
                            ...editOlymp,
                            ru: e.target.value
                        })} placeholder="Математика" label="Name (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editKk" type="text" value={editOlymp.kk} onChange={e => setEditOlymp({
                            ...editOlymp,
                            kk: e.target.value
                        })} placeholder="Математика" label="Name (kk)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editPath" type="text" value={editOlymp.path} onChange={e => setEditOlymp({
                            ...editOlymp,
                            path: e.target.value
                        })} placeholder="math" label="Path" />
                    </div>
                    <div className={classes.field}>
                        <Checkbox label="International" value={editOlymp.int} onChange={e => setEditOlymp({
                            ...editOlymp,
                            int: e
                        })} />
                    </div>
                    <Button>Save</Button>
                </form>
            </Modal>
        </div>
    );
}

const Olympiad = ({ token, update, olympiad, edit, visible }) => {
    const deleteOlympiad = () => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/olympiad/remove/${olympiad._id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                update();
            }
        })
    }
    return (
        <Link to={`/dashboard/olympiad/${olympiad._id}`} className={classes.olympiad}>
            {visible ? <div className={classes.olympiadActions}>
                <button onClick={(e) => {
                    e.preventDefault()
                    edit({
                        en: olympiad.en,
                        ru: olympiad.ru,
                        kk: olympiad.kk,
                        path: olympiad.path,
                        id: olympiad._id,
                        subject: olympiad.subject
                    })
                }}>
                    <Edit />
                </button>
                <button onClick={(e) => {
                    e.preventDefault();
                    deleteOlympiad();
                }}>
                    <Trash />
                </button>
            </div> : null}
            <div className={classes.olympiadTitle}>{olympiad.en}</div>
            <div className={classes.olympiadInfo}>{olympiad.ru} | {olympiad.kk}</div>
        </Link>
    )
}

export default connect(state => state)(Olympiads);