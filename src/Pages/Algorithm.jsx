import React from 'react';
import { connect } from 'react-redux';
import classes from './Algorithm.module.css'
import locale from "../locale"

const evals = ["transparency", "uniqueness", "screening", "award"]

const Algorithm = ({ lang }) => {
    const l = locale[lang]
    return (
        <div className={classes.Algorithm}>
            <div className="container">
                <div className={classes.section}>
                    <h1>{l.rating.page.t1}</h1>
                    <p>{l.rating.page.p1}</p>
                    <ul>
                        {l.rating.page.list.map((el, i) => (
                            <li key={`list-${i}`}>{el}</li>
                        ))}
                    </ul>
                    <p>{l.rating.page.p2}</p>
                </div>
                <div className={classes.section}>
                    <h2>{l.algorithm.t1}</h2>
                    {evals.map((el) => (
                        <div key={el}>
                            <h3>{l.algorithm.labels[el]}</h3>
                            <ul>
                                {l.algorithm.values[el].map((el, i) => (
                                    <li key={`list-${i}`}>{el}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={classes.section}>
                    <h2>{l.rating.reputation.title}</h2>
                    {l.rating.reputation.p.map((el, i) => (
                        <p key={i}>{el}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default connect(state => state)(Algorithm);