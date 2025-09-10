import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InstructorSidebar from '../../components/InstructorSidebar'
import { Trash, UserPen } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { CoursesContext } from '../../context/CoursesContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyCourses = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, getData } = useContext(CoursesContext)
    const navigate = useNavigate()

    // const [courseStatus, setCourseStatus] = useState(false)

    // it will navigate user to add-courses page and pre-fill the form with previous data that user wants to change
    function handleEdit(indexToBeEdit, courseToBeSelected) {
        // console.log(indexToBeEdit)
        setIsEdit(true)
        setCourseDetails(courseToBeSelected)
        navigate('/instructor/add-courses')
    }


    function handleClick(courseId) {
        navigate(`/instructor/add-lectures/${courseId}`)
    }


    // toggle course status
    async function handleStatus(courseId, status) {

        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}course/status/${courseId}`,
                data: { status },
                withCredentials: true
            })
            const { message, success, course } = response.data
            if (success) {
                setAllCourses(prev => prev.map(c => (c._id === courseId ? course : c)))
            }
        }
        catch (error) {
            console.log("there is an error", error)
            const message = error?.response?.data?.message
            toast(message, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }


    async function handleDelete(courseId) {
        // console.log(courseId)

        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}course/removeCourse`,
                data: { courseId },
                withCredentials: true
            })

            const { message, success } = response.data;
            if (success) {
                console.log(message)
                getData()
            }

        }
        catch (error) {
            console.log("there is an error", error)
        }
    }


    return (
        <div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <Navbar />

            <div className='flex'>

                {/* sidebar */}
                <InstructorSidebar />

                {/* right */}
                <div className="flex-1 bg-gray-50 px-28 overflow-auto h-[91vh] py-8">

                    <h2 className='font-bold text-2xl pb-2'>My Courses</h2>

                    <div className="border shadow-xl rounded-lg overflow-hidden ">
                        {/* Heading Row */}
                        <div className="flex justify-between bg-gray-100 px-4 py-3 font-bold text-lg">
                            <p className="w-1/3">Title</p>
                            <p className="w-1/6 text-center">Price</p>
                            <p className="w-1/6 text-center">Status</p>
                            <p className="w-1/6 text-center">Action</p>
                        </div>

                        {/* .filter((courses, index) => courses._id === user.id) */}
                        {/* Data Rows */}
                        <div className="divide-y">
                            {allCourses.filter((course, index) => course.instructor === user.id)
                                .map((course, index) => {
                                    return (<div key={index} className="flex justify-between items-center px-4 py-3">
                                        {/* Title */}
                                        <p onClick={() => handleClick(course._id)} className="w-1/3 hover:underline cursor-pointer font-medium truncate">{course.title}</p>

                                        {/* Price */}
                                        <p className="w-1/6 text-center font-semibold">{course.price}</p>

                                        {/* Status */}
                                        <button onClick={() => { handleStatus(course._id, course.status) }} className={`w-1/6 text-center font-semibold ${course.status ? "text-green-600" : "text-red-600"}`} >{course.status ? 'Published' : 'Unpublished'}</button>

                                        {/* Action */}
                                        <div className="w-1/6 text-center flex items-center justify-center gap-2 text-blue-600 ">

                                            <div className='flex gap-1 items-center '>
                                                {/* edit */}
                                                <span onClick={() => { handleEdit(index, course) }} className='cursor-pointer hover:bg-gray-400 rounded-full px-2 py-1 '><UserPen size={18} color='black' /></span>
                                                <span>|</span>
                                                {/* delete */}
                                                <span onClick={() => { handleDelete(course._id) }} className='cursor-pointer hover:bg-gray-400 rounded-full px-2 py-1 '> <Trash size={18} color='black' /></span>
                                            </div>

                                        </div>
                                    </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default MyCourses
