import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios'

const signup_state = {
  fname: '',
  lname:'',
  email: '',
  password: '',
  signup_fname_error: false,
  signup_lname_error: false,
  signup_email_error: false,
  signup_password_error: false,
  error: ''
}

const Register = () => {

  const [signUpObject, setSignUpObject] = useState(signup_state);
    const [IsLoading, setIsLoading] = useState(false);
    const history = useNavigate();

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    const signup_parameter = {
        user: {
            first_name: signUpObject.fname,
            last_name: signUpObject.lname,
            email: signUpObject.email,
            password: signUpObject.password
        }
    }
    if (signUpObject.fname === '') {
        setSignUpObject({...signUpObject, signup_name_error: true})
    }
    else if (signUpObject.lname === '') {
      setSignUpObject({...signUpObject, signup_lname_error: true})
  } else if (signUpObject.email === '') {
        setSignUpObject({...signUpObject, signup_email_error: true})
    } else if (signUpObject.password === '') {
        setSignUpObject({...signUpObject, signup_password_error: true})
    } else {
        setIsLoading(true)
        axios.post('/users', signup_parameter, {
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => {
                setIsLoading(false)

                let state_value = response.status
                if (state_value === 200) {
                    history('/login');
                }
            }).catch(error => {
                if(error.response.status == 400){
                    setSignUpObject({
                        ...signUpObject,
                        signup_email_error: error.response.data.errors[0], error: ''
                    })
                }
        })
    }
}

  return (
   <div className="container">
       <div className="row">
           <div className="col-md-4"></div>
           <div className="col-md-4">
               <h2 className="text-muted mt-5">Sign up</h2>
               <form onSubmit={handleSignupSubmit} className="mt-4">
                   <div className="mb-3">
                       <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                       <input type="text" className="form-control"
                              onChange={event => setSignUpObject({
                                  ...signUpObject, fname: event.target.value,
                                  signup_fname_error: '', error: ''
                              })}
                              placeholder="Enter First name"
                              aria-describedby="emailHelp" />
                       <p className="text-danger">{signUpObject.signup_fname_error}</p>

                   </div>
                   <div className="mb-3">
                       <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                       <input type="text" className="form-control"
                              onChange={event => setSignUpObject({
                                  ...signUpObject, lname: event.target.value,
                                  signup_lame_error: '', error: ''
                              })}
                              placeholder="Enter Last name"
                              aria-describedby="emailHelp" />
                       <p className="text-danger">{signUpObject.signup_lname_error}</p>
                   </div>
                   <div className="mb-3">
                       <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                       <input type="email" className="form-control"
                              onChange={event => setSignUpObject({
                                  ...signUpObject, email: event.target.value,
                                  signup_email_error: '', error: ''
                              })}
                              placeholder="Enter email"
                              aria-describedby="emailHelp" />
                       <p className="text-danger">{signUpObject.signup_email_error}</p>
                   </div>
                   <div className="mb-3">
                       <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                       <input type="password" className="form-control"
                              onChange={event => setSignUpObject({
                                  ...signUpObject, password: event.target.value,
                                  signup_password_error: '', error: ''
                              })}
                              placeholder="Enter password" />
                       <p className="text-danger">{signUpObject.signup_password_error}</p>
                   </div>

                   <button type="submit" className="btn btn-primary">{IsLoading ? "Please Wait...." : "Sign up"}</button>
                   <p className="text-danger">{signUpObject.error}</p>
               </form>
               <a href="/login">Login</a>
           </div>
       </div>
   </div>
  )
}

export default Register;