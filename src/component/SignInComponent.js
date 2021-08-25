import React from "react"
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import { useHistory } from "react-router-dom";


const SignInComponent = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({username: '', password: ''})
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
                        // console.log('hahaa login ok');
                        // console.log(res);
                        // console.log(auth());
                        history.push('/library');
                        // console.log(isAuthenticated());
                        // this.props.push('/library');
                    }else {
                        //Throw error
                    }
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type={"text"} onChange={(e)=>setFormData({...formData, username: e.target.value})}/>
            <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>

            <button>Submit</button>
        </form>
    )
}
export default SignInComponent;