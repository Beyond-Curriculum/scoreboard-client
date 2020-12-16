import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, Redirect } from "react-router-dom";
import logo from "../Assets/logo.svg";
import classes from "./Login.module.css";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Checkbox from "../Components/Checkbox";
import { login } from "../Redux/actions"
import Axios from "axios";
import { server } from "../config";
import { useToasts } from "react-toast-notifications"

const Login = ({ logInTo, token, user }) => {
    const { addToast } = useToasts()
    const [loading, setLoading] = useState(false)
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const submit = () => {
        if (loading) return;
        if (!login || !password) {
            return addToast("Заполните все поля", { appearance: 'error' })
        }
        setLoading(true);
        Axios({
            url: server + "api/v1/auth/login",
            method: "POST",
            data: {
                login,
                password
            }
        }).then((res) => {
            if (res.data.token) {
                setLoading(false)
                return logInTo(res.data.user, res.data.token, remember)
            } else {
                setLoading(false)
                return addToast(res.data.details[0].message || "Error", { appearance: 'error' })
            }
        }).catch(err => {
            setLoading(false)
            return addToast("Error", { appearance: 'error' })
        })
    }
    return (
        <div className={classes.Login}>
            {token && user ? <Redirect to="/dashboard" /> : null}
            <div className={classes.plate}>
                <div className={classes.main}>
                    <Link to="/"><div className={classes.brand}>
                        <img height={24} className={classes.logo} src={logo} alt="Scoreboard" />
                    </div></Link>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}>
                        <h1>Log in to account</h1>
                        <div className={classes.field}>
                            <Input
                                name="login"
                                label="Login"
                                placeholder="admin"
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <Input
                                name="password"
                                label="Password"
                                placeholder="••••••"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <Checkbox label="Remember?" value={remember} onChange={setRemember} />
                        </div>
                        <Button disabled={loading}>{loading ? "Loading..." : "Login"}</Button>
                    </form>
                    <footer>BeyondCurriculum</footer>
                </div>
            </div>
            <div className={classes.picture}>
                <div className={classes.pattern} />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    logInTo: bindActionCreators(login, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Login);
