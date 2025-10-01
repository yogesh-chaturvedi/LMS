import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Camera, PlayCircle } from 'lucide-react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { CoursesContext } from '../context/CoursesContext'


const CourseDetails = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext)

    const { id } = useParams();

    const location = useLocation()
    // console.log(location.state)

    // stores the data
    const course = location.state || null;
    // console.log(course)

    const navigate = useNavigate()

    // for stripe payment
    async function handleCheckOut(role) {
        if (role === "instructor") {
            toast(`Instructor Can't Buy Course`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }
        if (role === "admin") {
            toast(`Admin Can't Buy Course`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        if (user.purchasedCourses.includes(id)) {
            toast(`Already purchased`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return
        }

        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}/payment/checkout`,
                data: { course },
                withCredentials: true
            })
            // const { message, success } = response.data;
            console.log(response.data.message);
            window.location.href = response.data.url;
        }
        catch (error) {
            console.log("there is an error", error)
        }

    }

    // to get instructor info 
    useEffect(() => {
        allCourses.forEach((courses) => {
            getInstructorInfo(courses.instructor)
        })
    }, [allCourses])

    const instructor = instuctorDetails[course.instructor]

    // const cleanText = (text) => {
    //     if (!text) return "";
    //     return text
    //         .replace(/\*\*/g, "")         // remove bold markers
    //         .replace(/^\s*[-*•]\s?/gm, "• ") // normalize list markers
    //         .replace(/\n{2,}/g, "\n")     // collapse multiple newlines
    //         .trim();
    // };


    function goToCourseProgress(courseId, lectureId) {
        navigate(`/course-progress/${courseId}/${lectureId}`, { state: course })
    }

    return (
        <div>
            <Navbar />

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            {/* course details hero section */}
            <div className="bg-gray-700 text-gray-200 shadow-md p-6 w-full px-5 lg:px-28 ">

                {course && (
                    <div>
                        {/* Course Name */}
                        <h3 className="text-xl font-bold">{course.title}</h3>

                        {/* One-line Description */}
                        <p className="mt-1 line-clamp-2">{course.description}</p>

                        {/* Instructor */}
                        <p className="mt-3 ">
                            <span className="font-semibold ">Instructor:</span> {instructor ? instructor.name : "Loading"}
                        </p>

                        {/* Students Enrolled
                        <p className="text-sm ">
                            <span className="font-semibold">Enrolled:</span>40</p> */}
                    </div>
                )}
            </div>

            {/* course details */}
            <div className='bg-gray-50 px-5 lg:px-28 py-10 flex md:flex-row items-center md:items-start flex-col-reverse  md:justify-between w-full'>

                {/*left*/}
                <div className='left flex flex-col gap-3'>

                    {/* discription */}
                    <section className=''>
                        <div className="max-w-3xl mx-auto rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800">Course Description</h2>
                            <p className="text-gray-600 leading-relaxed">{course.description}</p>

                            {/* key takaways */}
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">key takaways</h2>
                            <div className='text-gray-600 leading-relaxed'>
                                {course.takeaways
                                    .split('\n')
                                    .map((line, index) => {
                                        return (
                                            <p key={index} className="text-gray-600 leading-relaxed">{line.trim()}</p>
                                        )
                                    })}
                            </div>

                            {/* prerequisites */}
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">Prerequisites</h2>
                            <div className='text-gray-600 leading-relaxed'>
                                {course.prerequisites
                                    .split('\n')
                                    .map((line, index) => {
                                        return (
                                            <p key={index} className="text-gray-600 leading-relaxed">{line.trim()}</p>
                                        )
                                    })}
                            </div>

                        </div>
                    </section>

                    {/* course content */}
                    <div className="shadow-md rounded-lg p-6 max-w-2xl border border-gray-200">
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                            <p className="text-sm text-gray-500">{`${course.lecture.length} Lectures`}</p>
                        </div>

                        {/* Topics List */}
                        <ul className="space-y-3">
                            {course?.lecture?.map((topic, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition"><PlayCircle className="w-5 h-5 text-blue-500" /><span>{topic.lectureTitle}</span></li>
                            ))}
                        </ul>
                    </div>

                </div>


                {/* right */}
                <div className='right w-full pb-2 md:w-[60vw] lg:w-[45vw] xl:w-[29vw] '>
                    <div className="w-full pb-3 shadow-md rounded-lg overflow-hidden border border-gray-200 max-w-md">

                        {/* video section */}
                        <video width="600" controls>
                            <source
                                src={`${BASE_URL}${course?.lecture?.[0]?.lectureVideo?.url}`}
                                type={course?.lecture?.[0]?.lectureVideo?.contentType}
                            />
                        </video>

                        {/* Price Section */}
                        <div className="p-4">
                            <h3 className="text-2xl font-bold text-gray-800">Rs.{course.price}</h3>
                            <p className="text-sm text-gray-500">One-time payment for lifetime access</p>
                        </div>

                        {/* to show buy or purchase */}
                        {user.purchasedCourses.length > 0 && user.purchasedCourses.includes(id) ? (<div className='text-center'>
                            <button onClick={() => goToCourseProgress(id, course.lecture[0]._id)} className='bg-green-500 hover:bg-green-600 px-2 rounded-lg text-lg font-medium'>Continue Course</button>
                        </div>) : (<div className='text-center'>
                            <button onClick={() => handleCheckOut(user.role)} type='button' className='bg-green-500 hover:bg-green-600 px-2 rounded-lg text-lg font-medium'>Buy Course</button>
                        </div>)}

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default CourseDetails
