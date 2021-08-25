import React from "react";
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import {useAuthHeader} from 'react-auth-kit'

function LibraryComponent(){
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const authHeader = useAuthHeader()

    // console.log(isAuthenticated());
    return (
        <>
        <div>
            {/*{authHeader()}*/}
        </div>
            <div>
                {/*{auth().roles}*/}
            </div>
        <div>
             {/*{isAuthenticated()? <h1>hahahahaha</h1>: <h2>ncl vay lmao</h2>}*/}
        </div>
        </>
    )
}
export default LibraryComponent;