import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'
import axios from 'axios'
import { MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AllCourses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext);

    const navigate = useNavigate()

    const [options, setOptions] = useState(null)

    const [isloading, setIsloading] = useState(null)
    // function CourseStatus() {
    //     console.log("published Clicked")
    // }

    async function addtoTopRated(courseId) {
        setIsloading(courseId)
        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}course/toprated`,
                data: { courseId },
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                console.log(message)
                setIsloading(false)
                getData()  // re-run this function to fetch data
            }

        }
        catch (error) {
            console.log("there is an error", error)
        }
        finally {
            setIsloading(null);
        }
    }


    // to get instructors details 
    useEffect(() => {
        allCourses.forEach((courses) => {
            getInstructorInfo(courses.instructor)
        })
    }, [allCourses])


    // to toggle state
    function handleOptions(indexToToggle) {
        if (options === null) {
            setOptions(indexToToggle)
        }
        else {
            setOptions(null)
        }
    }
    console.log(options)


    // to remove course
    async function handleRemove(courseId) {
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
                setOptions(null)
                getData()
            }
        }
        catch (error) {
            console.log('there is an error', error)
        }
    }


    function handleViewCourse(courses) {
        navigate(`/course-details/${courses._id}`, { state: courses })
    }

    return (
        <div>
            <Navbar />
            <div className='flex  bg-gray-50'>

                {/* left */}
                <Sidebar />

                {/* right */}
                {/* flex-1 for remaining width */}
                <div className='flex flex-1 flex-col gap-4 lg:pr-28 px-5 py-4 min-h-screen lg:max-h-screen overflow-auto'>

                    {allCourses.map((courses, index) => {
                        const instructor = instuctorDetails[courses.instructor]
                        return <div key={index} className="flex relative sm:flex-row flex-col gap-2 sm:gap-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-4 bg-white w-full h-[160p]">
                            {/* Image (Left) */}
                            <img src={`${courses.thumbnail}`} alt="courseThumbnail" className=" w-full sm:w-48 sm:h-32 object-cover rounded-lg shadow-md" />

                            {/* Content (Right) */}
                            <div className='flex justify-between items-start w-full '>

                                {/* course Info */}
                                <div className="flex flex-col">
                                    {/* Title */}
                                    <h2 className="font-bold text-xl text-gray-800">{courses.title}</h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 h-11 line-clamp-2">{courses.description}</p>

                                    {/* Instructor */}
                                    <p className="text-gray-700 truncate">Instructor: <span className="font-semibold w-[100px]">{instructor ? instructor.name : 'Loading...'}</span></p>

                                    {/* Level */}
                                    <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">{courses.level}</span>
                                </div>

                                <span onClick={() => handleOptions(index)} className='cursor-pointer'><MoreVertical size={30} color='black' /></span>


                                {/* to publish and unpublished course
                                <button onClick={CourseStatus} className=' bg-green-500 rounded-lg p-1 px-2' type='button'>Published</button> */}

                            </div>


                            {/* features */}
                            <div>
                                {/* popup */}
                                {options === index && (<div className={`px-2 py-1.5 shadow-lg rounded-xl bg-gray-300 flex flex-col gap-1.5 absolute bottom-1 right-3 z-50`}>

                                    {/* toprated button */}
                                    <button onClick={() => addtoTopRated(courses._id)} className={`rounded-xl flex items-center justify-center w-[120px] px-2 py-1 ${courses.topCourses ? "bg-green-400" : "bg-red-500"}`}>{isloading === courses._id ? (<div className='border-2 text-center border-gray-600 border-t-transparent animate-spin h-5 w-5 rounded-full'></div>) : (courses.topCourses ? '-Toprated' : '+Toprated')}</button>

                                    {/* course remove button */}
                                    <button onClick={() => handleRemove(courses._id)} className='bg-red-500 px-2 py-1 rounded-xl'>Remove</button>

                                    {/* View course button */}
                                    <button onClick={() => handleViewCourse(courses)} className='bg-green-500 px-2 py-1 rounded-xl'>View</button>
                                </div>)}

                            </div>

                        </div>
                    })}


                </div>

            </div>
            <Footer />

        </div>
    )
}

export default AllCourses
