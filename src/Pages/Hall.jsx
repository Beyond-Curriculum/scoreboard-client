import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Hall.module.css'
import locale from "../locale"
import Axios from 'axios';
import { server } from '../config';
import Loader from '../Components/Loader';
import Empty from '../Components/Empty';
import { Link } from 'react-router-dom';
import { getLocal } from '../utils';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Hall = ({ lang }) => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])
    const l = locale[lang];
    const [students, setStudents] = useState({
        isFetching: true,
        items: []
    })
    const getStudents = () => {
        Axios({
            url: server + `api/v1/student`,
            params: {
                visible: true
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setStudents({
                    isFetching: false,
                    items: res.data.students
                })
            }
        })
    }
    useEffect(getStudents, [])
    return (
        <div className={classes.Hall}>
            <div className="container">
                <h1>{l.nav.hall}</h1>
                {students.isFetching ? <Loader /> : (
                    students.items.length ? (
                        <div className={classes.students}>
                            {students.items.map((el) => (
                                <Student lang={lang} key={el._id} student={el} />
                            ))}
                        </div>
                    ) : <Empty />
                )}
                <div className={classes.request}>
                    <h2>{l.request.title}</h2>
                    <p>{l.request.p}</p>
                </div>
            </div>
        </div>
    );
}

const Student = ({ student, lang }) => (
    <Link className={classes.student} to={`/profile/${student._id}`}>
        <div style={{
            backgroundImage: `url(${server}uploads/${student.avatar})`
        }} className={classes.avatar} />
        <div className={classes.name}>{student[getLocal("name", lang)]}</div>
        <div className={classes.title}>{student[getLocal("title", lang)]}</div>
    </Link>
)

export default connect(state => state)(Hall);