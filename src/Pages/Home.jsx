import React from 'react';
import classes from './Home.module.css'
import locale from "../locale"
import { connect } from 'react-redux';

const Home = ({ lang }) => {
    const l = locale[lang]
    return (
        <div className={classes.Home}>
            <div className={classes.hero}>
                <div className="container">
                    <div className={classes.text}>
                        <h1>{l.home.title}</h1>
                        <p>{l.home.p1}</p>
                        <p>{l.home.p2}</p>
                        <p>{l.home.p3}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(state => state)(Home);