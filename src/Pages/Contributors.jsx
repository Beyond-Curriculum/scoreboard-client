import React from 'react';
import locale from "../locale"
import { connect } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Contributors = ({ lang }) => {
    const { trackPageView } = useMatomo();

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, []);

    const l = locale[lang]
    return (
        <div style={{
          padding: '64px 0'
        }}>
            <div className="container">
                <h1>{l.contributors.title}</h1>
                <p>{l.contributors.text}</p>
            </div>
        </div>
    );
}

export default connect(state => state)(Contributors);