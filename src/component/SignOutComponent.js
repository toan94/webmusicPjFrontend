import React from "react"
import { useSignOut } from 'react-auth-kit'
import { useHistory } from "react-router-dom";
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';

 const SignOutComponent = () => {
    const signOut = useSignOut()
     let history = useHistory();
     const auth = useAuthUser()
     const isAuthenticated = useIsAuthenticated()
    return (
        <button onClick={() => {
            signOut();
            // console.log(isAuthenticated());
            // console.log(auth());
            // history.push('/library');
        }}>Sign Out</button>
    )
};
export default SignOutComponent;