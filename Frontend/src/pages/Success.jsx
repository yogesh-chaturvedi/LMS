import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CoursesContext } from '../context/CoursesContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';


const Success = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("courseId");

    const [currentBuy, setCurrentBuy] = useState([])
    console.log(currentBuy)

    const hasRun = useRef(false);

    // to get data and set it to usestate so that i can send it to with Link 
    useEffect(() => {
        async function getCourse() {
            try {
                setCurrentBuy([])
                const response = await axios({
                    method: 'get',
                    url: `${BASE_URL}/payment/get-course/${courseId}`,
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
        // to prevent duplication
        if (user?.purchasedCourses?.includes(courseId)) {
            console.log("Already purchased, skipping add-course call");
            return;
        }

        async function addPurchasedCourse() {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}/payment/add-course`,
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


        if (courseId && !hasRun.current) {
            hasRun.current = true;
            addPurchasedCourse();
        }


    }, [courseId])

    return (
        <div className="flex items-center justify-center h-screen bg-green-50 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md border border-green-200">

                {/* Success Icon */}
                <CheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800">Payment Successful</h1>
                <p className="text-gray-600 mt-2">
                    Congratulations! Your payment has been processed successfully.
                </p>

                {/* Button */}
                <Link
                    to={`/course-details/${courseId}`}
                    state={currentBuy}
                    className="inline-block mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
                >
                    Go To Course
                </Link>
            </div>
        </div>
    )
}

export default Success
