import React from 'react';
import locale from "../locale"
import { connect } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const PEOPLE = {
    "ru": [
        "Жаксылыков Азамат",
        "Сейткалиев Улан",
        "Моргунов Антон",
        "Адылхан Арай",
        "Уалиева Дильназ",
        "Валеев Рустам",
        "Болатов Арман",
        "Кайроллаев Ернур",
        "Нурмухамбетов Мансур",
        "Косман Адам"
    ],
    "kk": [
        "Жаксылыков Азамат",
        "Сейткалиев Улан",
        "Моргунов Антон",
        "Адылхан Арай",
        "Уалиева Дильназ",
        "Валеев Рустам",
        "Болатов Арман",
        "Қайроллаев Ернұр",
        "Нурмухамбетов Мансур",
        "Косман Адам"
    ],
    "en": [
        "Azamat Zhaksylykov",
        "Ulan Seitkaliyev",
        "Anton Morgunov",
        "Aray Adylkhan",
        "Dilnaz Ualiyeva",
        "Rustam Valeev",
        "Arman Bolatov",
        "Ernur Kairollayev",
        "Mansur Nurmukhambetov",
        "Adam Cosman"
    ]
}
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
            <div className="container">
                <ul>
                    {PEOPLE ? PEOPLE[lang].sort().map((person, i) => (
                        <li key={i}>{person}</li>
                    )) : null}
                </ul>
            </div>
        </div>
    );
}

export default connect(state => state)(Contributors);