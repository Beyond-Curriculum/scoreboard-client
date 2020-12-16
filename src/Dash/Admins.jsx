import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import Button from '../Components/Button';
import Empty from '../Components/Empty';
import Trash from '../Components/Icons/Trash';
import Input from '../Components/Input';
import Loader from '../Components/Loader';
import Modal from '../Components/Modal';
import Select from '../Components/Select';
import { server } from '../config';
import classes from './Admins.module.css';

const accessTypes = [
    {
        label: "Admin",
        value: "admin"
    },
    {
        label: "Moderator",
        value: "moderator"
    },
    {
        label: "Archiver",
        value: "archiver"
    },
    {
        label: "Curator",
        value: "curator"
    }
]

const Admins = ({ token }) => {
    const { addToast } = useToasts();
    const [modal, setModal] = useState(false);
    const [admin, setAdmin] = useState({
        login: "",
        password: "",
        access: "moderator"
    })
    const [password, setPassword] = useState("")
    const [admins, setAdmins] = useState({
        isFetching: true,
        items: []
    })
    const add = () => {
        if (!admin.password || !admin.login) {
            return addToast("Fill all fields", {
                appearance: "error"
            })
        }
        if (admin.password !== password) {
            return addToast("Passwords don't match", {
                appearance: "error"
            })
        }
        Axios({
            url: server + `api/v1/auth/register`,
            method: "POST",
            headers: {
                Authorization: `Token ${token}`
            },
            data: admin
        }).then((res) => {
            if (res.data && res.data.success) {
                addToast("Successfully added", {
                    appearance: "success"
                })
                setAdmin({
                    ...admin,
                    login: "",
                    password: "",
                })
                setPassword("");
                setModal(false);
                getAdmins()
            } else if (res.data) {
                addToast(res.data.message, {
                    appearance: "error"
                })
            }
        })
    }
    const getAdmins = () => {
        Axios({
            url: server + `api/v1/auth`,
            headers: {
                Authorization: `Token ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setAdmins({
                    isFetching: false,
                    items: res.data.admins
                })
            }
        })
    }
    useEffect(getAdmins, []);
    const remove = (id) => {
        if (!window.confirm("Are you sure?")) {
            return
        }
        Axios({
            url: server + `api/v1/auth/remove/${id}`,
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                getAdmins()
            } else if (res.data) {
                addToast(res.data.message || "Error", {
                    appearance: "error"
                })
            }
        })
    }
    return (
        <div className={classes.Admin}>
            <h1>Admins</h1>
            <div className={classes.admins}>
                {admins.isFetching ? <Loader /> : (
                    admins.items.length ? (
                        admins.items.map((el) => (
                            <div className={classes.admin} key={el._id}>
                                <div className={classes.adminInfo}>
                                    <div className={classes.adminLogin}>{el.login}</div>
                                    <div className={classes.adminAccess}>{el.access}</div>
                                </div>
                                <div className={classes.adminActions}>
                                    <button onClick={() => remove(el._id)}>
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : <Empty />
                )}
            </div>
            <button onClick={() => setModal(true)} className={classes.fab}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <Modal open={modal} close={() => setModal(false)} title="New admin">
                <form onSubmit={e => {
                    e.preventDefault()
                    add()
                }}>
                    <div className={classes.field}>
                        <Input type="text" value={admin.login} label="Login" placeholder="admin" onChange={e => setAdmin({
                            ...admin,
                            login: e.target.value
                        })} />
                    </div>
                    <div className={classes.field}>
                        <Input type="password" value={admin.password} label="Password" placeholder="••••••" onChange={e => setAdmin({
                            ...admin,
                            password: e.target.value
                        })} />
                    </div>
                    <div className={classes.field}>
                        <Input type="password" value={password} label="Password repeat" placeholder="••••••" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className={classes.field}>
                        <Select items={accessTypes} value={admin.access} label="Role" onChange={e => setAdmin({
                            ...admin,
                            access: e.target.value
                        })} />
                    </div>
                    <Button>Add</Button>
                </form>
            </Modal>
        </div>
    );
}


export default connect(state => state)(Admins);