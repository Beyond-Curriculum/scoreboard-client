import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../Assets/logo.svg"
import classes from './Navbar.module.css'
import locale from "../locale"
import { connect } from 'react-redux';
import clsx from 'clsx';
import { bindActionCreators } from 'redux';
import { changeLocale } from '../Redux/actions';

const langs = ["ru", "en", "kk"]

const Navbar = ({ lang, changeLocale }) => {
    const l = locale[lang];
    const [state, setState] = useState({
        langMenu: false,
        menu: false
    })
    return (
        <nav className={clsx(classes.Navbar, {
            [classes.menuActive]: state.menu
        })}>
            <div className="container">
                <div onClick={() => setState({
                    ...state,
                    langMenu: !state.langMenu
                })} className={clsx(classes.langMobile, classes.lang, {
                    [classes.open]: state.langMenu
                })}>
                    <span>{lang}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    <div className={classes.menu}>
                        {langs.map((el, i) => (
                            <div key={i} onClick={e => {
                                e.stopPropagation()
                                changeLocale(el)
                                setState({
                                    ...state,
                                    langMenu: false
                                })
                            }} className={clsx({
                                [classes.langMenuItem]: true,
                                [classes.langMenuItemSelected]: lang === el
                            })}>{el}</div>
                        ))}
                    </div>
                </div>
                <NavLink to="/" className={classes.brand}>
                    <img src={logo} alt="Scoreboard logo" />
                </NavLink>
                <div onClick={() => setState({
                    ...state,
                    menu: !state.menu
                })} className={classes.burger}>
                    <div />
                    <div />
                    <div />
                </div>
                <div className={classes.links}>
                    <NavLink onClick={() => setState({
                        ...state,
                        menu: false
                    })} exact to="/" activeClassName={classes.active} className={classes.link}>
                        {l.nav.home}
                    </NavLink>
                    <NavLink onClick={() => setState({
                        ...state,
                        menu: false
                    })} exact to="/olympiads" activeClassName={classes.active} className={classes.link}>
                        {l.olympiads.title}
                    </NavLink>
                    <NavLink onClick={() => setState({
                        ...state,
                        menu: false
                    })} to="/results" activeClassName={classes.active} className={classes.link}>
                        {l.nav.results}
                    </NavLink>
                    <NavLink onClick={() => setState({
                        ...state,
                        menu: false
                    })} to="/hall" activeClassName={classes.active} className={classes.link}>
                        {l.nav.hall}
                    </NavLink>
                    <NavLink onClick={() => setState({
                        ...state,
                        menu: false
                    })} to="/contributors" activeClassName={classes.active} className={classes.link}>
                        {l.contributors.title}
                    </NavLink>
                    <a onClick={() => setState({
                        ...state,
                        menu: false
                    })} href="https://olympiads.bc-pf.org/" className={classes.link}>
                        {l.nav.olympiads}
                    </a>
                    <a onClick={() => setState({
                        ...state,
                        menu: false
                    })} href="https://ask.bc-pf.org/" className={classes.link}>
                        {l.nav.ask}
                    </a>
                    <div onClick={() => setState({
                        ...state,
                        langMenu: !state.langMenu
                    })} className={clsx(classes.lang, {
                        [classes.open]: state.langMenu
                    })}>
                        <span>{lang}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                        <div className={classes.menu}>
                            {langs.map((el, i) => (
                                <div key={i} onClick={e => {
                                    e.stopPropagation()
                                    changeLocale(el)
                                    setState({
                                        ...state,
                                        langMenu: false
                                    })
                                }} className={clsx({
                                    [classes.langMenuItem]: true,
                                    [classes.langMenuItemSelected]: lang === el
                                })}>{el}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const mapDispatchToProps = (dispatch) => ({
    changeLocale: bindActionCreators(changeLocale, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Navbar);