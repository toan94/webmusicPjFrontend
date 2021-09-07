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
import {withAuthHeader, withAuthUser} from "react-auth-kit";
import firebaseService from "../services/firebaseService";

const required = (value) => {
    if (isEmpty(value)) {
        return <small className="form-text text-danger ms-3">This field is required</small>;
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
        return <small className="form-text text-danger ms-3">Song name must be at least 6 characters long</small>;
    }
}

class SongUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {signUpRequestStatus: "", done: false, failureNotification: ""}
    }
    onSubmit(e){
        e.preventDefault();
        this.form.validateAll();

        if ( this.checkBtn.context._errors.length === 0 ) {
            // alert('success')

            let formData = new FormData();
            formData.append("file", e.target.songFile.files[0]);
            formData.append("songName", e.target.songName.value);

            axios.post('http://localhost:8080/api/songs/upload', formData,
                {headers: {'Content-Type': 'multipart/form-data', "Authorization": this.props.authHeader}})
                .then((res)=>{
                    if(res.status === 200) {
                        // this.setState({signUpRequestStatus: "Registration success! You will be redirected " +
                        //         "in 5 seconds", done:true},()=> setTimeout(()=>this.props.history.push('/signIn'), 5000));
                        console.log(this.props.authState);
                        let note = {
                            subject : this.props.authState.name + " uploaded a new song",
                            content: "song name: " + e.target.songName.value,
                            data: {url: "/artist/The Beatles"}
                        }
                        firebaseService.sendPush(this.props.authState.name, note, this.props.authHeader).then((res)=>{
                            console.log(res);
                            this.props.history.push('/mySongs');
                        }).catch(e=>console.log(e));

                    }
                }, (err)=>{
                    // this.setState({failureNotification: "Registration failed please choose another Username or Email"});
                    console.log(err);

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
                        <Form  onSubmit={e => this.onSubmit(e)} ref={c => { this.form = c }} className={"w-50"}>
                            <h2 className={"text-success text-center"}>New Song Upload</h2>
                            <p className={"text-danger ms-3"}>{this.state.failureNotification}</p>

                            <Input
                                name="songName"
                                // onChange={this.onChangeHandler}
                                type="text"
                                placeholder="Song Name"
                                className="form-control ms-3 mt-2"
                                validations={[required]}
                            />
                            <Input
                                name="songFile"
                                // onChange={this.onChangeHandler}
                                type="file"
                                className="form-control ms-3 mt-2"
                            />



                            <button className="btn btn-outline-success btn-block login ms-3 mt-3" type="submit">Upload</button>
                            <CheckButton style={{ display: 'none' }} ref={c => { this.checkBtn = c }} />
                        </Form>:<h1 className={"text-success"}>{this.state.signUpRequestStatus}</h1>}
                </div>
            </div>
        </div>);
    }
}
export default withAuthUser(withAuthHeader(withRouter(SongUploadComponent)))