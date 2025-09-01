import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CoursesContext } from '../context/CoursesContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const Success = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [currentBuy, setCurrentBuy] = useState([])
    console.log(currentBuy)


    // to get data and set it to usestate so that i can send it to with Link 
    useEffect(() => {
        async function getCourse() {
            try {
                setCurrentBuy([])
                const response = await axios({
                    method: 'get',
                    url: `${BASE_URL}payment/get-course/${courseId}`,
                    withCredentials: true
                })

                const { message, success, course } = response.data;
                if (success) {
                    console.log(message)
                    setCurrentBuy(course)
                }
            }
            catch (error) {
                console.log('there is an error', error);
            }
        }
        getCourse()
    }, [])


    useEffect(() => {

        async function addPurchasedCourse() {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}payment/add-course`,
                    data: { courseId },
                    withCredentials: true
                })

                const { message, success, updatedUser } = response.data;
                if (success) {
                    console.log(message)
                    setUser(updatedUser)
                }

            }
            catch (error) {
                console.log('there is an error', error);
            }
        }

        addPurchasedCourse()

    }, [courseId])


    return (
        <div className='flex items-center justify-center bg-green-100  h-screen'>

            <div className="box border-2 border-black p-3">
                <p className='font-bold text-2xl'>Congratulations</p>
                <p className='font-bold text-xl'>Payment successfull</p>
                <Link to={`/course-details/${courseId}`} state={currentBuy} className='text-green-700 mt-2 hover:underline'>Go To Course</Link>
            </div>

        </div>
    )
}

export default Success
