import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { server } from '../config';
import classes from './Subjects.module.css'
import locale from "../locale"
import Empty from '../Components/Empty';
import { Link } from 'react-router-dom';
import Skeleton from '../Components/Skeleton';
import { getLocal } from "../utils"

const Olympiads = ({ lang, match }) => {
    const { path } = match.params;
    const [subject, setSubject] = useState({
        isFetching: true,
        data: null
    })
    const [olympiads, setOlympiads] = useState([])
    const l = locale[lang]
    const getSubject = () => {
        Axios({
            url: server + `api/v1/subject`,
            params: {
                path
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setSubject({
                    isFetching: false,
                    data: res.data.subject
                })
                setOlympiads(res.data.olympiads)
            }
        })
    }
    useEffect(getSubject, [])
    return (
        <div className={classes.Page}>
            <div className="container">
                <h1>{l.results.olymp}</h1>
                {subject.isFetching ? <Skeleton level={[1]} /> : (
                    subject.data ? (
                        <>
                            <div className={classes.bread}>
                                <Link to="/results" className={classes.piece}>
                                    {l.fields.subject}
                                </Link>
                                <span className={classes.arrow}>→</span>
                                <span className={classes.piece}>
                                    {subject.data[lang]}
                                </span>
                                <span className={classes.arrow}>→</span>
                            </div>
                            <div className={classes.items}>
                                {olympiads.length ? olympiads.map((el) => (
                                    <Link key={el._id} to={`/results/${path}/${el.path}`} className={classes.item}>{el[lang]}</Link>
                                )) : <Empty />}
                            </div>
                        </>
                    ) : <Empty />
                )}
                {subject.data ? <p className={classes.desc}>{subject.data[getLocal("text", lang)]}</p> : null}
            </div>
        </div>
    )
}

export default connect(state => state)(Olympiads);