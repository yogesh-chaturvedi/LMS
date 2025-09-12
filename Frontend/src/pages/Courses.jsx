import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { CoursesContext } from '../context/CoursesContext'
import { ToastContainer, toast } from 'react-toastify';
import { FolderSync } from 'lucide-react'
import axios, { all } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Courses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, search, setSearch, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext)
    const navigate = useNavigate();

    const [SortBy, setSortBy] = useState('')

    const Categories = ['Web Development', 'Data Science', 'Mobile Development', 'Cloud Computing', 'UI/UX Design', 'Language']

    const [Filter, setFilter] = useState([]);


    // to run getInstructorInfo function 
    useEffect(() => {
        allCourses.forEach((course) => {
            getInstructorInfo(course.instructor)
        })
    }, [allCourses])



    // filtering
    function handleChange(category) {
        setFilter((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        )
    }
    console.log(Filter);

    const filtering = allCourses
        .filter((course) => Filter.length === 0 || Filter.includes(course.category))
        .filter((course) => !SortBy || course.level.toLowerCase() === SortBy.toLowerCase());

    // it let users to view course details
    function handleClick(course) {
        navigate(`/course-details/${course._id}`, { state: course });
    }


    function handleSort(e) {
        setSortBy(e.target.value)
    }
    // console.log(SortBy)

    return (
        <div>
            <Navbar />

            <div className='flex gap-4 px-28 py-12 h-[91vh] bg-gray-50  '>
                {/* left  */}
                <div className='w-[20%] flex flex-col gap-2'>

                    {/* filter */}
                    <div className=''>
                        <h1 className="text-2xl font-bold pb-2 border-black border-b-2">Filter Options</h1>
                        <div className="rounded-lg max-w-xs">
                            <h2 className="text-lg font-bold mt-2 mb-1">Categories</h2>
                            <div className="space-y-2">
                                {Categories.map((category, index) => (
                                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                                        <input onChange={() => handleChange(category)} checked={Filter.includes(category)} type="checkbox" className="w-4 h-4" />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* sorting */}
                    <div>
                        <select onChange={handleSort} name="level" id="level" className="border rounded-md px-2 py-1">
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                </div>


                {/* right */}
                <div className='flex flex-col gap-6 w-full min-h-[80vh] overflow-y-auto scrollbar-hide'>
                    {filtering.length === 0 ? (
                        <p className="text-gray-800 font-bold text-2xl text-center mt-20">No courses found for selected filters</p>
                    ) : (filtering.filter((courses) => courses.status === true)
                        .map((courses, index) => {
                            const instructor = instuctorDetails[courses.instructor]
                            return <div onClick={() => handleClick(courses)} key={index} className="flex gap-4 cursor-pointer border border-gray-300 rounded-xl shadow-lg p-4 w-full h-[160p]">
                                {/* Image (Left) */}
                                <img src={`${courses.thumbnail}`} alt="course thumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                                {/* Content (Right) */}
                                <div className="flex flex-col ">
                                    {/* Title */}
                                    <h2 className="font-bold text-xl text-gray-800">{courses.title}</h2>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 h-11 line-clamp-2">{courses.description}</p>

                                    {/* Instructor */}
                                    <p className="text-gray-700">Instructor: <span className="font-semibold">{instructor ? instructor.name : 'Loading...'}</span></p>

                                    {/* Level */}
                                    <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">{courses.level}</span>
                                </div>
                            </div>
                        }))
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Courses
