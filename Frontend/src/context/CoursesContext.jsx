import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CoursesContext = createContext();


const CoursesContextProvider = (props) => {

    // for url
    const BASE_URL = import.meta.env.VITE_API_URL;

    // to add course basic details
    const [courseDetails, setCourseDetails] = useState({
        title: '',
        subTitle: '',
        category: '',
        level: '',
        price: '',
    })

    const [isEdit, setIsEdit] = useState(false)  // mode

    const [lectureName, setLectureName] = useState('')

    const [allCourses, setAllCourses] = useState([]);

    const [instuctorDetails, setInstuctorDetails] = useState({});

    console.log('instuctorDetails', instuctorDetails)


    // to fetch all courses
    async function getData() {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/course/fetch`,
                withCredentials: true
            })

            const { message, success, courses } = response.data;
            if (success) {
                console.log(message);
                setAllCourses(courses);
                console.log(courses)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    useEffect(() => {
        getData();
    }, [])


    // to fetch instructor details 
    async function getInstructorInfo(id) {
        try {
            const response = await axios({
                method: 'get',
                url: `${BASE_URL}/user/info/${id}`,
                withCredentials: true
            })
            const { message, success, details } = response.data;
            if (success) {
                console.log(message);
                setInstuctorDetails((prev) => ({ ...prev, [id]: details }));
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }


    const value = { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails }

    return (
        <CoursesContext.Provider value={value}>
            {props.children}
        </CoursesContext.Provider>
    )
}

export default CoursesContextProvider