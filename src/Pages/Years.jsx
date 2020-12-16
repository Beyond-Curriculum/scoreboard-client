import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { server } from '../config';
import classes from './Subjects.module.css'
import locale from "../locale"
import Empty from '../Components/Empty';
import { Link } from 'react-router-dom';
import Skeleton from '../Components/Skeleton';

const Years = ({ lang, match, history }) => {
    const { path } = match.params;
    const [olympiad, setOlympiad] = useState({
        isFetching: true,
        data: null
    })
    const [years, setYears] = useState([])
    const l = locale[lang]
    const getSubject = () => {
        Axios({
            url: server + `api/v1/olympiad`,
            params: {
                path,
                subject: match.params.subject
            }
        }).then((res) => {
            if (res.data && res.data.success) {
                if (res.data.olympiad.subject.path !== match.params.subject) {
                    history.push("/404")
                }
                setOlympiad({
                    isFetching: false,
                    data: res.data.olympiad
                })
                setYears(res.data.years)
            } else {
                history.push("/404")
            }
        })
    }
    useEffect(getSubject, [])
    return (
        <div className={classes.Page}>
            <div className="container">
                <h1>{l.results.year}</h1>
                {olympiad.isFetching ? <Skeleton level={[1, 1]} /> : (
                    olympiad.data ? (
                        <>

                            <div className={classes.bread}>
                                <Link to="/results" className={classes.piece}>
                                    {l.fields.subject}
                                </Link>
                                <span className={classes.arrow}>→</span>
                                <Link to={`/results/${olympiad.data.subject.path}`} className={classes.piece}>
                                    {olympiad.data.subject[lang]}
                                </Link>
                                <span className={classes.arrow}>→</span>
                                <span className={classes.piece}>
                                    {olympiad.data[lang]}
                                </span>
                                <span className={classes.arrow}>→</span>
                            </div>
                            <div className={classes.items}>
                                {years.length ? years.sort((a, b) => b.year - a.year).map((el) => (
                                    <Link key={el._id} to={`/results/${olympiad.data.subject.path}/${olympiad.data.path}/${el.year}`} className={classes.item}>{el.year}</Link>
                                )) : <Empty />}
                            </div>
                        </>
                    ) : <Empty />
                )}
            </div>
        </div>
    )
}

export default connect(state => state)(Years);