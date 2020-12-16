import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import Empty from '../Components/Empty';
import Loader from '../Components/Loader';
import { server } from '../config';
import classes from './Result.module.css'
import locale from "../locale";
import ok from "../Assets/ok.svg";
import unknown from "../Assets/unknown.svg";
import warn1 from "../Assets/warn1.svg";
import warn2 from "../Assets/warn2.svg";
import warn3 from "../Assets/warn3.svg";
import { Link } from 'react-router-dom';
import { getLocal } from "../utils";
import clsx from 'clsx';
import Modal from '../Components/Modal';
import Skeleton from '../Components/Skeleton';
import { countries } from 'country-flag-icons'

const roundSum = (el) => Math.round(el * 100) / 100

const getRounds = (rounds, num) => {
    const result = [];
    for (let i = 0; i < rounds; i++) {
        num ? result.push(0) : result.push(i)
    }
    return result;
}

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

const Result = ({ match, lang, history }) => {
    const l = locale[lang];
    const [grade, setGrade] = useState(0)
    const [year, setYear] = useState({
        isFetching: true,
        data: null,
        grades: []
    })
    const [modal, setModal] = useState({
        title: "",
        open: false,
        content: null
    })
    const { addToast } = useToasts()
    const getYear = () => {
        Axios({
            url: server + `api/v1/year/`,
            params: {
                yearNumber: match.params.year,
                subject: match.params.subject,
                olympiad: match.params.olympiad,
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setYear({
                    isFetching: false,
                    data: res.data.year,
                    grades: res.data.grades.sort((a, b) => b.grade - a.grade)
                })
            } else {
                setYear({
                    isFetching: false,
                    data: null,
                    grades: []
                })
                addToast("Error", {
                    appearance: "error"
                })
                history.push("/404")
            }
        })
    }
    useEffect(getYear, [match.params.id])
    const evals = ["transparency", "uniqueness", "screening", "award"]
    return (
        <div className={classes.Result}>
            <div className="container">
                {year.isFetching ? (
                    <>
                        <div className={classes.titleSkeleton}></div>
                        <Skeleton level={[1, 1, 1]} noItems />
                        <Loader />
                    </>
                ) : (
                        year.data ? (
                            <>
                                <h1>{year.data.olympiad[lang]}. {year.data.year}</h1>
                                <div className={classes.bread}>
                                    <Link to="/results" className={classes.piece}>
                                        {l.fields.subject}
                                    </Link>
                                    <span className={classes.arrow}>→</span>
                                    <Link to={`/results/${match.params.subject}`} className={classes.piece}>
                                        {year.data.olympiad.subject[lang]}
                                    </Link>
                                    <span className={classes.arrow}>→</span>
                                    <Link to={`/results/${match.params.subject}/${match.params.olympiad}`} className={classes.piece}>
                                        {year.data.olympiad[lang]}
                                    </Link>
                                    <span className={classes.arrow}>→</span>
                                    <span className={classes.piece}>
                                        {year.data.year}
                                    </span>
                                </div>
                                <div className={classes.card}>
                                    <div className={classes.yearEvals}>
                                        {evals.map((el) => (
                                            <div onClick={() => {
                                                year.data[getLocal(el, lang)] && setModal({
                                                    open: true,
                                                    title: l.algorithm.labels[el],
                                                    content: year.data[getLocal(el, lang)]
                                                })
                                            }} key={el} className={clsx(classes.yearEval, {
                                                [classes.clickable]: year.data[getLocal(el, lang)]
                                            })}>
                                                <div style={{
                                                    borderColor: colors[year.data[el]]
                                                }} className={classes.yearEvalValue}>
                                                    {year.data[el] ? `${year.data[el]}/5` : ""}
                                                </div>
                                                <div className={classes.yearEvalLabel}>{l.algorithm.labels[el]}</div>
                                                {year.data[getLocal(el, lang)] ? <div className={classes.evalInfo}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                </div> : null}
                                            </div>
                                        ))}
                                        <div onClick={() => {
                                            year.data[getLocal("reputation", lang)] && setModal({
                                                open: true,
                                                title: l.rating.reputation.title,
                                                content: year.data[getLocal("reputation", lang)]
                                            })
                                        }} className={clsx(classes.yearEval, {
                                            [classes.clickable]: year.data[getLocal("reputation", lang)]
                                        })}>
                                            {year.data[getLocal("reputation", lang)] ? <div className={classes.evalInfo}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </div> : null}
                                            <img height={64} src={reputationMap[year.data.reputation]} alt={l.rating.reputation.title} />
                                            <div className={classes.yearEvalLabel}>{l.rating.reputation.title}</div>
                                        </div>
                                    </div>
                                </div>
                                <Link className={classes.link} to="/algorithm">{l.algorithm.title}</Link>
                                <div className={classes.more}>
                                    <div className={classes.fields}>
                                        {year.data.participants ? <div className={classes.field}>
                                            <div className={classes.fieldValue}>
                                                {year.data.participants}
                                            </div>
                                            <div className={classes.fieldLabel}>{l.rating.participants}</div>
                                        </div> : null}
                                        {year.data.countries ? <div className={classes.field}>
                                            <div className={classes.fieldValue}>
                                                {year.data.countries}
                                            </div>
                                            <div className={classes.fieldLabel}>{l.rating.countries}</div>
                                        </div> : null}
                                    </div>
                                    <ul className={classes.points}>
                                        {year.data[getLocal("points", lang)].map((el, i) => (
                                            <li key={`point-${i}`}>{el}</li>
                                        ))}
                                    </ul>
                                </div>
                                {year.data.multiple ? (
                                    <div className={classes.tabs}>
                                        <div className={classes.tabsWrap}>
                                            {year.grades.map((el, i) => (
                                                <div key={i} onClick={() => setGrade(i)} className={clsx(classes.tab, {
                                                    [classes.active]: grade === i
                                                })}>
                                                    {el.grade} {l.fields.grade}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                                {year.grades[grade] ? <Grade year={year.data} grade={year.grades[grade]} lang={lang} /> : null}
                                <div className={classes.request}>
                                    <h2>{l.oops.title}</h2>
                                    <p>{l.oops.p}</p>
                                </div>
                                <div className={classes.request}>
                                    <h2>{l.request.title}</h2>
                                    <p>{l.request.p}</p>
                                </div>
                            </>
                        ) : <Empty />
                    )}
            </div>
            <Modal open={modal.open} title={modal.title} close={() => setModal({
                ...modal,
                open: false
            })}>
                <div className={classes.modalContent} dangerouslySetInnerHTML={{ __html: modal.content }} />
            </Modal>
        </div>
    );
}

const Grade = ({ grade, lang, year }) => {
    const { addToast } = useToasts();
    const [participants, setParticipants] = useState({
        isFetching: true,
        items: []
    })
    const l = locale[lang]
    useEffect(() => {
        setParticipants({
            isFetching: true,
            items: []
        })
        Axios({
            url: server + `api/v1/participant/`,
            params: {
                grade: grade._id
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                setParticipants({
                    isFetching: false,
                    items: res.data.participants.map((el) => {
                        return {
                            ...el,
                            sum: el.rounds.length > 0 ? el.rounds.reduce((a, b) => a + b) : null
                        }
                    })
                })
            } else if (res.data && res.data.message) {
                addToast(res.data.message, {
                    appearance: 'error'
                })
            }
        })
    }, [grade, addToast])
    return grade ? (
        <div className={classes.Grade}>
            <div className={classes.table}>
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            {year.olympiad.int ? <th>{l.fields.country}</th> : null}
                            <th>{l.fields.name}</th>

                            {grade.rounds > 1 ? getRounds(grade.rounds).map((el) => (
                                <th key={el}>{lang === "en" ? `${l.fields.round} ${el + 1}` : `${el + 1} ${l.fields.round}`}</th>
                            )) : null}
                            {grade.rounds === 0 ? null : <th>{l.fields.sum}</th>}
                            <th>{l.fields.medal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.items.sort((a, b) => b.sum - a.sum).map((el, i) => (
                            <tr className={clsx(el.medal)} key={el._id}>
                                <td>{i + 1}</td>
                                {year.olympiad.int ? <td>{el.country ? (
                                    countries.includes(el.country) ? <img
                                        alt={el.country}
                                        className={classes.flag}
                                        src={`https://catamphetamine.gitlab.io/country-flag-icons/3x2/${el.country}.svg`} /> : el.country
                                ) : "N/A"}</td> : null}
                                <td>{el.student ? (<Link to={`/profile/${el.student}`}>{el[getLocal("name", lang)]}</Link>) : el[getLocal("name", lang)]}</td>
                                {el.rounds.length > 1 ? el.rounds.map((el, i) => (
                                    <td key={i}>{el}</td>
                                )) : null}
                                {grade.rounds === 0 ? null : <td>{roundSum(el.sum)}</td>}
                                <td>{l.medals[el.medal]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {participants.isFetching ? <Loader /> : (
                participants.items.length ? null : (<Empty />)
            )}
        </div>
    ) : null
}

export default connect(state => state)(Result);