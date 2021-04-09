import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { server } from '../config';
import classes from './Subjects.module.css'
import locale from "../locale"
import Empty from '../Components/Empty';
import { Link } from 'react-router-dom';
import Skeleton from '../Components/Skeleton';
import clsx from 'clsx';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Subjects = ({ lang }) => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])
    const [subjects, setSubjects] = useState({
        isFetching: true,
        items: []
    })
    const l = locale[lang]
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
    return (
        <div className={classes.Page}>
            <div className="container">
                <h1>{l.results.subject}</h1>
                {subjects.isFetching ? <Skeleton /> : (
                    subjects.items.length ? (
                        <>
                            <div className={classes.bread}>
                                <span className={classes.piece}>
                                    {l.fields.subject}
                                </span>
                                <span className={classes.arrow}>→</span>
                            </div>
                            <div className={classes.items}>
                                {subjects.items.map((el) => (
                                    <Link key={el._id} to={`/results/${el.path}`} className={clsx(classes.item, classes.withIcon)}>
                                        <span dangerouslySetInnerHTML={{ __html: el.icon }} className={classes.icon} />
                                        <span>{el[lang]}</span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : <Empty />
                )}
            </div>
        </div>
    )
}

export default connect(state => state)(Subjects);