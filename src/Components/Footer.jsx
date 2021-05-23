import React from 'react';
import { connect } from 'react-redux';
import beyond from "../Assets/beyond.svg";
import locale from '../locale';
import classes from './Footer.module.css'

const Footer = ({ lang }) => {
    const l = locale[lang]
    return (
        <footer className={classes.Footer}>
            <div className="container">
                <button onClick={() => {
                    if (document.body.classList.toggle("dark")) {
                        localStorage.setItem("theme", "dark")
                    } else {
                        localStorage.setItem("theme", "")
                    }
                }} className={classes.dark}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button>
                <div className={classes.label}>Created by</div>
                <a href="https://bc-pf.org"><img src={beyond} height={32} alt="BeyondCurriculum" /></a>
                <div className={classes.flex}>
                    <div className={classes.copyright}>© <a href="https://bc-pf.org">Beyond Curriculum PF</a> 2020-2021</div>
                    <a className={classes.link} href="https://bc-pf.org/donate">{l.support + " "}<span aria-label="heart" role="img">❤️</span></a>
                </div>
            </div>
        </footer>
    );
}

export default connect(state => ({ lang: state.lang }))(Footer);