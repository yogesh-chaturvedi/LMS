import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'

const AllCourses = () => {


    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName } = useContext(CoursesContext);



    function CourseStatus() {
        console.log("published Clicked")
    }


    return (
        <div>
            <Navbar />
            <div className='border-2 border-red-600 flex h-[90vh]'>
                {/* left */}

                <Sidebar />

                {/* right */}
                {/* flex-1 for remaining width */}
                <div className='flex flex-1 flex-col gap-4 border-2 border-blue-600 pr-28 p-5 h-[90vh] overflow-auto'>

                    {allCourses.map((courses, index) => {
                        return <div key={index} className="flex gap-4 border border-gray-300 rounded-xl shadow-lg p-4 bg-white w-full h-[160p]">
                            {/* Image (Left) */}
                            <img src={`${courses.thumbnail}`} alt="courseThumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                            {/* Content (Right) */}
                            <div className='flex justify-between items-center w-full '>

                                {/* course Info */}
                                <div className="flex flex-col">
                                    {/* Title */}
                                    <h2 className="font-bold text-xl text-gray-800">{courses.title}</h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600">{courses.description}</p>

                                    {/* Instructor */}
                                    <p className="text-gray-700">Instructor: <span className="font-semibold">Yogesh Chaturvedi</span></p>

                                    {/* Level */}
                                    <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">{courses.level}</span>
                                </div>


                                {/* to publish and unpublished course
                                <button onClick={CourseStatus} className=' bg-green-500 rounded-lg p-1 px-2' type='button'>Published</button> */}

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
