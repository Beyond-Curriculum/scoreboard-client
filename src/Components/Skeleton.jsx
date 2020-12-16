import clsx from 'clsx';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import locale from "../locale";
import classes from './Skeleton.module.css'

const Skeleton = ({ lang, level = [], noItems }) => {
    const l = locale[lang]
    return (
        <div className={classes.Skeleton}>
            <div className={classes.bread}>
                <span className={classes.piece}>
                    {l.fields.subject}
                </span>
                <span className={classes.arrow}>→</span>
                {level.map((_, i) => (
                    <Fragment key={i}>
                        <span className={classes.pieceSkeleton}></span>
                        <span className={classes.arrow}>→</span>
                    </Fragment>
                ))}
            </div>
            {noItems ? null : <div className={clsx(classes.items, {
                [classes.years]: level.length === 2,
                [classes.withIcons]: level.length === 0
            })}>
                <div className={classes.item}><span></span></div>
                <div className={classes.item}><span></span></div>
                <div className={classes.item}><span></span></div>
            </div>}
        </div>
    );
}

export default connect(state => state)(Skeleton);