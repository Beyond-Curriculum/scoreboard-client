import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Subjects from './Subjects';
import Home from "./Home"
import Olympiads from './Olympiads';
import Years from './Years';
import Result from './Result';
import Hall from './Hall';
import Profile from './Profile';
import What from './What';
import Footer from '../Components/Footer';
import Algorithm from './Algorithm';
import NotFound from './NotFound';
import { useMatomo } from '@datapunt/matomo-tracker-react'

const Index = () => {
    const { trackPageView } = useMatomo()

    // Track page view
    React.useEffect(() => {
        trackPageView()
    }, [])

    return (
        <div style={{
            paddingTop: 72
        }}>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/olympiads" exact component={What} />
                <Route path="/results" exact component={Subjects} />
                <Route path="/results/:path" exact component={Olympiads} />
                <Route path="/results/:subject/:path" exact component={Years} />
                <Route path="/results/:subject/:olympiad/:year" exact component={Result} />
                <Route path="/hall" exact component={Hall} />
                <Route path="/profile/:id" exact component={Profile} />
                <Route path="/algorithm" exact component={Algorithm} />
                <Route path="*" exact component={NotFound} />
            </Switch>
            <Footer />
        </div>
    );
}

export default Index;