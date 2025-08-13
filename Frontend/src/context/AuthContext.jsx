import { createContext, useEffect, useState } from "react";
import axios from "axios"



export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        async function protectRouter() {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/auth/verify',
                    withCredentials: true
                })

                const { success } = response.data;
                if (success) {
                    setAuth(true);
                }

            }

            catch (error) {
                console.log("there is an error")
                setAuth(false);
            }

        }
        protectRouter()
    }, [])


    const value = { auth, setAuth }


    return (

        < AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthContextProvider