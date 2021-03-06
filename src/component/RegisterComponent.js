import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import isEmpty from "validator/es/lib/isEmpty";
import isEmail from "validator/es/lib/isEmail";
import CheckButton from 'react-validation/build/button';
import axios from "axios";

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger ms-3">This field is required</small>;
    }
}

const noUnderscoreAndComma = (value) => {
    if (value.includes("_") || value.includes(",")) {
        return <small className="form-text text-danger ms-3">Underscore and comma are not allowed</small>;
    }
}

const email = (value) => {
    if (!isEmail(value)) {
        return <small className="form-text text-danger ms-3">Invalid email format</small>;
    }
}

const lt = (value, props) => {
    // get the maxLength from component's props
    if (!value.toString().trim().length > props.maxLength) {
        // Return jsx
        return <span className="error ms-3">The value exceeded {props.maxLength} symbols.</span>
    }
};

const minLength = (value) => {
    if (value.trim().length < 6) {
        return <small className="form-text text-danger ms-3">Password must be at least 6 characters long</small>;
    }
}

class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {signUpRequestStatus: "", done: false, failureNotification: ""}
    }
    onSubmit(e){
        e.preventDefault();
        this.form.validateAll();

        if ( this.checkBtn.context._errors.length === 0 ) {
            // alert('success')
            let signInRequest = {
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value
            }
            axios.post('http://localhost:8080/api/auth/signup', signInRequest)
                .then((res)=>{
                    if(res.status === 200) {
                        this.setState({signUpRequestStatus: "Registration success! You will be redirected " +
                                "in 5 seconds", done:true},()=> setTimeout(()=>this.props.history.push('/signIn'), 5000));
                    }
                }, (err)=>{
                    this.setState({failureNotification: "Registration failed please choose another Username or Email"});

                })
        }
    }

    render() {
        return (<div className="container">
            <div className="login-container">
                <div id="output"></div>
                <div className="avatar"></div>
                <div className="form-box d-flex start vh-100">
                    {!this.state.done?
                        <Form onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }} className={"w-50"}>
                            <h2 className={"text-success text-center"}>Registration Form</h2>
                            <p className={"text-danger ms-3"}>{this.state.failureNotification}</p>

                            <Input
                            name="username"
                            onChange={this.onChangeHandler}
                            type="text"
                            placeholder="UserName"
                            className="form-control ms-3 mt-2"
                            validations={[required, minLength, noUnderscoreAndComma]}
                        />
                        <Input
                            name="email"
                            onChange={this.onChangeHandler}
                            type="text"
                            placeholder="Email"
                            className="form-control ms-3 mt-2"
                            validations={[required, email]}
                        />
                        <Input
                            name="password"
                            onChange={this.onChangeHandler}
                            type="password"
                            placeholder="Password"
                            className="form-control ms-3 mt-2"
                            validations={[required, minLength]}
                        />

                            {/*<Input*/}
                            {/*    name="address"*/}
                            {/*    onChange={this.onChangeHandler}*/}
                            {/*    type="text"*/}
                            {/*    placeholder="Address"*/}
                            {/*    className="form-control ms-3 mt-2"*/}
                            {/*    validations={[required, minLength]}*/}
                            {/*/>*/}
                            {/*<Input*/}
                            {/*    name="age"*/}
                            {/*    min="1" max="130"*/}
                            {/*    onChange={this.onChangeHandler}*/}
                            {/*    type="number"*/}
                            {/*    placeholder="Age"*/}
                            {/*    className="form-control ms-3 mt-2 w-30"*/}
                            {/*    validations={[required, email]}*/}
                            {/*/>*/}
                        {/*    <div className={"d-flex justify-content-start p-3"}>*/}
                        {/*    <Input type="radio" id="html" name="fav_language" value="HTML" className={"me-1"}/>*/}
                        {/*    <label htmlFor="html" className={"me-4"}>Male</label>*/}
                        {/*    <Input type="radio" id="css" name="fav_language" value="CSS" className={"me-1"}/>*/}
                        {/*    <label htmlFor="css">Female</label>*/}

                        {/*    </div>*/}
                        {/*<Input*/}
                        {/*        name="email"*/}
                        {/*        type="checkbox"*/}
                        {/*        id="genderF"*/}
                        {/*        name="Gender"*/}
                        {/*        value="Female"*/}
                        {/*        className=""*/}
                        {/*    />*/}
                        {/*    <label htmlFor="genderF"> Female</label>*/}
                        {/*    <Input type="checkbox"  name="vehicle1" value="Bike"/>*/}
                        {/*        <label htmlFor="vehicle1"> I have a bike</label>*/}
                        <button className="btn btn-outline-success btn-block login ms-3 mt-3" type="submit">Register</button>
                        <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                    </Form>:<h1 className={"text-success"}>{this.state.signUpRequestStatus}</h1>}
                </div>
            </div>
        </div>);
    }
}
export default withRouter(RegisterComponent)