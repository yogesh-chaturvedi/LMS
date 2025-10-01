import { createContext, useEffect, useState } from "react";
import axios from "axios"



export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const BASE_URL = import.meta.env.VITE_API_URL;

    // to fetch users
    async function fetchUser() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/auth/verify`,
                withCredentials: true
            })

            const { success, userData } = response.data;
            if (success) {
                console.log('userData', response.data.userData)
                setUser(userData)
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

    // runs when component mount
    useEffect(() => {
        fetchUser()
    }, [])

    const value = { user, setUser, loading, setLoading, fetchUser };

    return (

        < AuthContext.Provider value={value} >
            {props.children}
        </AuthContext.Provider >
    )
}

export default AuthContextProvider