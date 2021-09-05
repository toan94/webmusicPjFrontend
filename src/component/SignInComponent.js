import React from "react"
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import { useHistory } from "react-router-dom";
import {Button, Form} from "react-bootstrap";


const SignInComponent = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({username: '', password: ''})
    const [failureNotification, setFailureNotification] = React.useState("");
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    let history = useHistory();

    // let {history} =this.props;
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/auth/signin', formData)
            .then((res)=>{
                if(res.status === 200){
                    let expiresIn = 86400000;
                    let authState = {id: res.data.id, roles: res.data.roles, name: res.data.username};

                    if(signIn({token: res.data.accessToken,
                        expiresIn:expiresIn,
                        tokenType: "Bearer",
                        authState: authState})){
                        // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                        // refreshTokenExpireIn: res.data.refreshTokenExpireIn})){ // Only if you are using refreshToken feature
                        // Redirect or do-something
                        console.log('login ok');
                        // console.log(res);
                        // console.log(auth());
                        history.push('/Home');
                        // console.log(isAuthenticated());
                        // this.props.push('/library');
                    }else {
                        //Throw error
                    }
                }
            }, (err)=>{
                setFailureNotification("Login failed, please try again!");
            })
    }

    return (
        <>
            <h2 className={"text-dark text-center"}>Authentication Form</h2>
            <p className={"text-danger text-center"}>{failureNotification}</p>
        <div className={"vh-100 d-flex justify-content-center"}>
            <form onSubmit={onSubmit}>
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-5 col-form-label">Username</label>
                    <div className="col-10">
                        <input type="text" onChange={(e)=>setFormData({...formData, username: e.target.value})}
                               className="form-control" />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-5 col-form-label">Password</label>
                    <div className="col-10">
                        <input type="password" onChange={(e)=>setFormData({...formData, password: e.target.value})}
                               className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        {/*<div className="form-check">*/}
                        {/*    <input className="form-check-input" type="checkbox" id="gridCheck1"/>*/}
                        {/*        <label className="form-check-label" htmlFor="gridCheck1">*/}
                        {/*            Example checkbox*/}
                        {/*        </label>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-success" >Sign in</button>
            </form>
        {/*<form onSubmit={onSubmit}>*/}
        {/*    <input type={"text"} onChange={(e)=>setFormData({...formData, username: e.target.value})}/>*/}
        {/*    <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>*/}

        {/*    <button>Submit</button>*/}
        {/*</form>*/}
        </div>
        </>
    )
}
export default SignInComponent;