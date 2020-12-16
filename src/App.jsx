import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications'
import ScrollToTop from "./ScrollToTop"
import './App.css';
import Login from './Dash/Login';
import Dashboard from './Dash/Dashboard';
import Axios from 'axios';
import { server } from './config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from './Redux/actions';
import Logout from './Dash/Logout';
import Index from './Pages/Index';

const App = ({ token, user, login }) => {
  useEffect(() => {
    if (token && !user) {
      Axios({
        url: server + `api/v1/auth/me`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data && res.data.success) {
          login(res.data.admin, token, true)
        }
      })
    }
  }, [])
  return (
    <Router>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-right"
      >
        <ScrollToTop>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Index} />
          </Switch>
        </ScrollToTop>
      </ToastProvider>
    </Router>
  )
}

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(login, dispatch)
})

export default connect(state => state, mapDispatchToProps)(App);
