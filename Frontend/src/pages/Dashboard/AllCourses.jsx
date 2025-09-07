import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'
import axios from 'axios'

const AllCourses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext);


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



    return (
        <div>
            <Navbar />
            <div className='flex h-[90vh]'>
                {/* left */}

                <Sidebar />

                {/* right */}
                {/* flex-1 for remaining width */}
                <div className='bg-gray-50 flex flex-1 flex-col gap-4 pr-28 p-5 h-[90vh] overflow-auto'>

                    {allCourses.map((courses, index) => {
                        const instructor = instuctorDetails[courses.instructor]
                        return <div key={index} className="flex items-center gap-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-4 bg-white w-full h-[160p]">
                            {/* Image (Left) */}
                            <img src={`${courses.thumbnail}`} alt="courseThumbnail" className=" w-48 h-32 object-cover rounded-lg shadow-md" />

                            {/* Content (Right) */}
                            <div className='flex justify-between items-center w-full '>

                                {/* course Info */}
                                <div className="flex flex-col">
                                    {/* Title */}
                                    <h2 className="font-bold text-xl text-gray-800">{courses.title}</h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600">{courses.description}</p>

                                    {/* Instructor */}
                                    <p className="text-gray-700">Instructor: <span className="font-semibold">{instructor ? instructor.name : 'Loading...'}</span></p>

                                    {/* Level */}
                                    <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">{courses.level}</span>
                                </div>


                                {/* to publish and unpublished course
                                <button onClick={CourseStatus} className=' bg-green-500 rounded-lg p-1 px-2' type='button'>Published</button> */}

                            </div>

                            <button onClick={() => addtoTopRated(courses._id)} className={`rounded-xl flex items-center justify-center w-[120px] px-2 py-1 ${courses.topCourses ? "bg-green-400" : "bg-red-500"}`}>{isloading === courses._id ? (<div className='border-2 text-center border-gray-600 border-t-transparent animate-spin h-5 w-5 rounded-full'></div>) : (courses.topCourses ? '-Toprated' : '+Toprated')}</button>

                        </div>
                    })}


                </div>

            </div>
            <Footer />

        </div>
    )
}

export default AllCourses
