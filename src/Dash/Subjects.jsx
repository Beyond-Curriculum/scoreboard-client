import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Trash from '../Components/Icons/Trash';
import Edit from '../Components/Icons/Edit';
import { server } from '../config';
import classes from './Subjects.module.css'
import Modal from "../Components/Modal"
import Loader from '../Components/Loader';
import { useToasts } from 'react-toast-notifications';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Empty from '../Components/Empty';
import { hasRight } from '../utils';

const Subjects = ({ token, user }) => {
    const { addToast } = useToasts()
    const [newModal, setNewModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newSubject, setNewSubject] = useState({
        en: "",
        ru: "",
        kk: "",
        path: "",
        text: "",
        icon: "",
    })
    const [editSubject, setEditSubject] = useState({
        en: "",
        ru: "",
        kk: "",
        path: "",
        text: "",
        icon: "",
        id: ""
    })
    const [subjects, setSubjects] = useState({
        isFetching: true,
        items: []
    });
    const showEdit = (data) => {
        setEditSubject(data);
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
            }
        })
    }
    useEffect(getSubjects, [])
    const saveSubject = () => {
        Axios({
            url: server + `api/v1/subject/create`,
            method: "POST",
            data: newSubject,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setNewSubject({
                    en: "",
                    ru: "",
                    kk: "",
                    text: "",
                    path: "",
                    icon: ""
                })
                setNewModal(false);
                getSubjects()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const saveEditSubject = () => {
        if (!editSubject.id) {
            return
        }
        const data = {
            ...editSubject
        }
        delete data.id
        Axios({
            url: server + `api/v1/subject/edit/${editSubject.id}`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        }).then((res) => {
            if (res.data && res.data.success) {
                setEditSubject({
                    en: "",
                    ru: "",
                    kk: "",
                    text: "",
                    path: "",
                    id: ""
                })
                setEditModal(false);
                getSubjects()
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }
    const admin = hasRight(user, ["admin"])
    return (
        <div className={classes.Subjects}>
            <h1>Subjects</h1>
            <div className={classes.subjects}>
                {
                    subjects.isFetching ? (
                        <Loader />
                    ) : (subjects.items.length ? subjects.items.map((el) => (
                        <Subject edit={showEdit} admin={admin} token={token} subject={el} key={el._id} update={getSubjects} />
                    )) : <Empty />)
                }
            </div>
            {admin ? <button onClick={() => setNewModal(true)} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button> : null}
            <Modal open={newModal} title="New subject" close={() => setNewModal(false)}>
                <form onSubmit={e => {
                    e.preventDefault();
                    saveSubject()
                }}>
                    <div className={classes.field}>
                        <Input name="icon" type="text" value={newSubject.icon} onChange={e => setNewSubject({
                            ...newSubject,
                            icon: e.target.value,
                        })} placeholder="<svg ..." label="Icon" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newEn" type="text" value={newSubject.en} onChange={e => setNewSubject({
                            ...newSubject,
                            en: e.target.value,
                            path: encodeURIComponent(e.target.value.toLowerCase()).replace(/\W/g, '')
                        })} placeholder="Math" label="Name (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newRu" type="text" value={newSubject.ru} onChange={e => setNewSubject({
                            ...newSubject,
                            ru: e.target.value
                        })} placeholder="Математика" label="Name (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newKk" type="text" value={newSubject.kk} onChange={e => setNewSubject({
                            ...newSubject,
                            kk: e.target.value
                        })} placeholder="Математика" label="Name (kk)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="newPath" type="text" value={newSubject.path} onChange={e => setNewSubject({
                            ...newSubject,
                            path: e.target.value
                        })} placeholder="math" label="Path" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textRu" type="text" value={newSubject.textRu} onChange={e => setNewSubject({
                            ...newSubject,
                            textRu: e.target.value
                        })} placeholder="..." label="Description (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textEn" type="text" value={newSubject.textEn} onChange={e => setNewSubject({
                            ...newSubject,
                            textEn: e.target.value
                        })} placeholder="..." label="Description (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textKk" type="text" value={newSubject.textKk} onChange={e => setNewSubject({
                            ...newSubject,
                            textKk: e.target.value
                        })} placeholder="..." label="Description (kk)" />
                    </div>
                    <Button>Save</Button>
                </form>
            </Modal>
            <Modal open={editModal} title="Edit subject" close={() => setEditModal(false)}>
                <form onSubmit={e => {
                    e.preventDefault();
                    saveEditSubject()
                }}>
                    <div className={classes.field}>
                        <Input name="icon" type="text" value={editSubject.icon} onChange={e => setEditSubject({
                            ...editSubject,
                            icon: e.target.value,
                        })} placeholder="<svg ..." label="Icon" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editEn" type="text" value={editSubject.en} onChange={e => setEditSubject({
                            ...editSubject,
                            en: e.target.value,
                        })} placeholder="Math" label="Name (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editRu" type="text" value={editSubject.ru} onChange={e => setEditSubject({
                            ...editSubject,
                            ru: e.target.value
                        })} placeholder="Математика" label="Name (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editKk" type="text" value={editSubject.kk} onChange={e => setEditSubject({
                            ...editSubject,
                            kk: e.target.value
                        })} placeholder="Математика" label="Name (kk)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="editPath" type="text" value={editSubject.path} onChange={e => setEditSubject({
                            ...editSubject,
                            path: e.target.value
                        })} placeholder="math" label="Path" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textRu" type="text" value={editSubject.textRu} onChange={e => setEditSubject({
                            ...editSubject,
                            textRu: e.target.value
                        })} placeholder="..." label="Description (ru)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textEn" type="text" value={editSubject.textEn} onChange={e => setEditSubject({
                            ...editSubject,
                            textEn: e.target.value
                        })} placeholder="..." label="Description (en)" />
                    </div>
                    <div className={classes.field}>
                        <Input name="textKk" type="text" value={editSubject.textKk} onChange={e => setEditSubject({
                            ...editSubject,
                            textKk: e.target.value
                        })} placeholder="..." label="Description (kk)" />
                    </div>
                    <Button>Save</Button>
                </form>
            </Modal>
        </div>
    );
}

const Subject = ({ subject, token, update, edit, admin }) => {
    const { addToast } = useToasts()
    const deleteSubject = () => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/subject/remove/${subject._id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                update();
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error',
                })
            }
        })
    }
    return (
        <div className={classes.subject}>
            <div dangerouslySetInnerHTML={{ __html: subject.icon }} className={classes.subjectIcon}></div>
            <div className={classes.subjectMain}>
                <div className={classes.subjectTitle}>{subject.en}</div>
                <div className={classes.subjectInfo}>{subject.ru} | {subject.kk}</div>
            </div>
            {admin ? <div className={classes.subjectActions}>
                <button onClick={() => edit({
                    en: subject.en,
                    ru: subject.ru,
                    kk: subject.kk,
                    path: subject.path,
                    icon: subject.icon,
                    textRu: subject.textRu,
                    textEn: subject.textEn,
                    textKk: subject.textKk,
                    id: subject._id
                })}>
                    <Edit />
                </button>
                <button onClick={deleteSubject}>
                    <Trash />
                </button>
            </div> : null}
        </div>
    )
}

export default connect(state => state)(Subjects);