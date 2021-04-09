import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Profile.module.css'
import locale from "../locale"
import Axios from 'axios';
import { server } from '../config';
import Loader from '../Components/Loader';
import Empty from '../Components/Empty';
import { Link } from 'react-router-dom';
import { getLocal } from '../utils';
import clsx from 'clsx';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Profile = ({ lang, match, history }) => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])
    const l = locale[lang];
    const [student, setStudent] = useState({
        isFetching: true,
        data: null,
        participation: []
    })
    const getStudents = () => {
        Axios({
            url: server + `api/v1/student/`,
            params: {
                id: match.params.id
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setStudent({
                    isFetching: false,
                    data: res.data.student,
                    participation: res.data.participation.map((el) => ({
                        ...el,
                        sum: el.rounds.length ? el.rounds.reduce((a, b) => a + b) : null
                    }))
                })
            } else {
                history.push("/404")
            }
        })
    }
    useEffect(getStudents, [])
    return (
        <div className={classes.Profile}>
            <div className="container">
                {student.isFetching ? (<Loader />) : (
                    student.data ? (
                        <>
                            <div style={{
                                backgroundImage: `url(${server}uploads/${student.data.avatar})`
                            }} className={classes.avatar} />
                            <h2>{student.data[getLocal("name", lang)]}</h2>
                            <p>{student.data[getLocal("title", lang)]}</p>
                            <p>{student.data[getLocal("bio", lang)]}</p>
                            {student.participation.length ? (
                                <div className={classes.table}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>№</th>
                                                <th>{l.fields.olympiad}</th>
                                                <th>{l.fields.grade}</th>
                                                <th>{l.fields.sum}</th>
                                                <th>{l.fields.medal}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {student.participation.sort((a, b) => b - a).map((el, i) => (
                                                <tr className={clsx(el.medal)} key={el._id}>
                                                    <td>{i + 1}</td>
                                                    {el.grade && el.grade.year ? <td><Link to={`/results/${el.grade.year.olympiad.subject.path}/${el.grade.year.olympiad.path}/${el.grade.year.year}`}>{el.grade.year.olympiad[lang]} {el.grade.year.year}</Link></td> : null}
                                                    <td>{el.grade.year.multiple ? el.grade.grade : "-"}</td>
                                                    <td>{el.sum}</td>
                                                    <td>{l.medals[el.medal]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : null}
                            <div className={classes.fields}>
                                <div className={classes.col}>
                                    {student.data[getLocal("school", lang)] ? <div className={classes.field}>
                                        <div className={classes.fieldLabel}>{l.fields.school}</div>
                                        <div className={classes.fieldValue}>{student.data[getLocal("school", lang)]}</div>
                                    </div> : null}
                                    <div className={classes.field}>
                                        <div className={classes.fieldLabel}>E-mail</div>
                                        <div className={classes.fieldValue}><a href={`mailto:${student.data.email}`}>{student.data.email}</a></div>
                                    </div>
                                    <div className={classes.field}>
                                        <div className={classes.fieldLabel}>{l.fields.link}</div>
                                        <div className={classes.fieldValue}><a href={student.data.link}>{student.data.link}</a></div>
                                    </div>
                                </div>
                                <div className={classes.col}>
                                    {student.data[getLocal("experience", lang)].length ? (
                                        <div className={classes.field}>
                                            <div className={classes.fieldLabel}>{l.fields.experience}</div>
                                            <div className={classes.fieldValue}>{
                                                <ul>
                                                    {student.data[getLocal("experience", lang)].map((el, i) => (
                                                        <li key={i}>{el}</li>
                                                    ))}
                                                </ul>
                                            }</div>
                                        </div>
                                    ) : null}
                                    {student.data[getLocal("projects", lang)].length ? (
                                        <div className={classes.field}>
                                            <div className={classes.fieldLabel}>{l.fields.projects}</div>
                                            <div className={classes.fieldValue}>{
                                                <ul>
                                                    {student.data[getLocal("projects", lang)].map((el, i) => (
                                                        <li key={i}>{el}</li>
                                                    ))}
                                                </ul>
                                            }</div>
                                        </div>
                                    ) : null}
                                    {student.data[getLocal("interests", lang)].length ? (
                                        <div className={classes.field}>
                                            <div className={classes.fieldLabel}>{l.fields.interests}</div>
                                            <div className={classes.fieldValue}>{
                                                <ul>
                                                    {student.data[getLocal("interests", lang)].map((el, i) => (
                                                        <li key={i}>{el}</li>
                                                    ))}
                                                </ul>
                                            }</div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </>
                    ) : <Empty />
                )}
            </div>
        </div>
    );
}

export default connect(state => state)(Profile);