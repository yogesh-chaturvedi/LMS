import { createContext, useEffect, useState } from "react";
import axios from "axios"



export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function protectRouter() {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/auth/verify',
                    withCredentials: true
                })

                const { success, user } = response.data;
                if (success) {
                    console.log(response.data.user)
                    setUser(response.data.user)
                }
                else {
                    setUser(null);
                }
            }

            catch (error) {
                console.log("there is an error")
            }
            finally {
                setLoading(false);
            }

        }
        protectRouter()
    }, [])


    const value = { user, setUser, loading, setLoading };

    return (

        < AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthContextProvider