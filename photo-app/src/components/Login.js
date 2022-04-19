import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios'

const login_state = {
    email: '',
    password: '',
    login_email_error: '',
    login_password_error: '',
    error: ''
}
const Login = () => {

    const [IsLoading, setIsLoading] = useState(false);
    const history = useNavigate();
    const [loginObject, setloginObject] = useState(login_state)

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const login_parameter = {
            email: loginObject.email,
            password: loginObject.password,
        }

        if (loginObject.email === '' && loginObject.password === '') {

            setloginObject({
                ...loginObject,
                login_email_error: 'Email is Required',
                login_password_error: 'Password is Required'
            })
        } else if (loginObject.email === '') {
            setloginObject({...loginObject, login_email_error: 'Email is Required'})
        } else if (loginObject.password === '') {
            setloginObject({...loginObject, login_password_error: 'Password is Required'})
        } else {
            setIsLoading(true)
            axios.post('/login', login_parameter, {headers: {'Content-Type': 'application/json', Accept: "*/*"}})
                .then(response => {

                    setIsLoading(false)
                    let state_value = response.data.status
                    if (state_value === "success") {
                        localStorage.setItem("user_id", response.data.data.user.user.id)
                        localStorage.setItem('token', response.data.data.token)
                        localStorage.setItem('name', response.data.data.user.user.name)
                        history('/');
                    }
                    localStorage.setItem("access-token", response.data);

                }).catch(error => {
                setIsLoading(false)
                let state_value = error.response && error.response.status
                if (state_value === 401) {
                    console.log(error.response)
                    if (error.response.data.errors[0] !== "") {

                        setloginObject({
                            ...loginObject, error: error.response.data.errors[0]
                        })
                    } else if (state_value === 400) {
                        setloginObject({
                            ...loginObject, error: error.response.data.errors[0]
                        })
                    } else if (state_value === 500) {
                        history("/error")
                    }
                }
            });
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">

                    <h2 className="text-muted mt-5">Log in</h2>

                    <form className="mt-3" onSubmit={handleLoginSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label text-start">Email</label>
                            <input type="email" className="form-control"
                                   onChange={event => setloginObject({
                                       ...loginObject, email: event.target.value,
                                       login_email_error: '', error: ''
                                   })}
                                   id="exampleInputEmail1"
                                   placeholder="Enter email"
                                   aria-describedby="emailHelp"/>
                            <p className="text-danger">{loginObject.login_email_error}</p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label text-start">Password</label>
                            <input type="password" className="form-control"
                                   onChange={event => setloginObject({
                                       ...loginObject, password: event.target.value,
                                       login_password_error: '', error: ''
                                   })}
                                   placeholder="Enter password"
                                   id="exampleInputPassword1"/>
                            <p className="text-danger">{loginObject.login_password_error}</p>
                        </div>

                        <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Login"}</button>
                        <p className="text-danger">{loginObject.error}</p>
                    </form>
                    <a className="mt-3" href="/Register">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login;