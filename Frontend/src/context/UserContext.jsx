import axios from "axios";
import { createContext, useEffect, useState } from "react";



export const UserContext = createContext();


const UserContextProvider = (props) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const [allUsers, setAllUsers] = useState([]);
    console.log('allUsers', allUsers)


    async function getAllUser() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/user/fetch-allUser`,
                withCredentials: true
            })
            const { message, success, allUser } = response.data;
            if (success) {
                console.log(message)
                setAllUsers(allUser)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])


    const value = { allUsers, setAllUsers, getAllUser }
    
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider