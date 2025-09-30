import React, { useContext } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { UserContext } from '../../context/UserContext'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { CoursesContext } from '../../context/CoursesContext'
import SalesGraph from '../../components/salesGraph'
import AllUsers from './AllUsers'

const DashboardHome = () => {
    // const BASE_URL = import.meta.env.VITE_API_URL;
    const sideMenue = ['Dashboard', 'Add Instructor']

    const { allUsers, setAllUsers } = useContext(UserContext);
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData } = useContext(CoursesContext);

    const [purchasedCoursesPrice, setPurchasedCoursesPrice] = useState([])

    const [boughtCourses, setBoughtCourses] = useState(0);


    // to match id and fetch prices
    useEffect(() => {
        const purchasedCourse = allUsers.filter((user) => user.role === 'user')
            .flatMap((course) => course.purchasedCourses)
        setBoughtCourses(purchasedCourse.length)
        console.log('purchasedCourse', purchasedCourse)

        // filtering bought courses from all courses to fetch prices and add them
        const totalRevenue = purchasedCourse.reduce((acc, courseId) => {
            const course = allCourses.find((c) => c._id === courseId);
            return acc + (course?.price || 0);
        }, 0);

        setPurchasedCoursesPrice(totalRevenue)

    }, [allUsers])



    return (
        <div>
            <Navbar />
            <div className='flex bg-gray-50'>

                {/* sidebar */}
                <Sidebar />

                {/* right */}
                {/* flex-1 for remaining width */}
                <div className='flex flex-1 py-4 w-full min-h-screen'>

                    <div className='mx-auto w-full px-5 lg:px-28 flex flex-col gap-10'>
                        <div className='flex gap-10 '>
                            {/* box1 */}
                            <div className='rounded-xl h-28 border-2 border-gray-500 bg-gray-500 shadow-xl p-4 py-5'>
                                <h3 className='font-bold text-2xl'>Total Sale</h3>
                                <p className='font-bold text-xl'>{boughtCourses}</p>
                            </div>

                            {/* box2 */}
                            <div className='rounded-xl h-28 border-2 border-gray-500 bg-gray-500 shadow-xl p-4 py-5'>
                                <h3 className='font-bold text-2xl'>Total Revenue</h3>
                                <p className='font-bold text-xl'>Rs.{purchasedCoursesPrice}</p>
                            </div>
                        </div>

                        {/* all users */}
                        <AllUsers />
                        {/* <div className='rounded-xl bg-gray-700 h-72'></div> */}
                    </div>


                </div>


            </div>
            <Footer />
        </div>
    )
}

export default DashboardHome
