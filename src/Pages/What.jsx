import React from 'react';
import { connect } from 'react-redux';
import classes from './What.module.css'
import locale from "../locale"
import { useMatomo } from '@datapunt/matomo-tracker-react'

const What = ({ lang }) => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])
    const l = locale[lang]
    return (
        <div className={classes.What}>
            <div className="container">
                <h1>{l.olympiads.title}</h1>
                <p>{l.olympiads.p1}</p>
                <div className={classes.timeline}>
                    {l.olympiads.list.map(((el, i) => (
                        <div className={classes.timelineBlock} key={i}>
                            <div className={classes.timelineDate}>{el[1]}</div>
                            <div className={classes.timelineTitle}>{el[0]}</div>
                        </div>
                    )))}
                </div>
                <p>{l.olympiads.p2}</p>
                <div className={classes.section}>
                    <h2>{l.olympiads.t2}</h2>
                    <p>{l.olympiads.p3}</p>
                </div>
            </div>
        </div>
    );
}

export default connect(state => state)(What);