import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { CoursesContext } from '../context/CoursesContext'
import { ToastContainer, toast } from 'react-toastify';
import { Cross, FilterIcon, FolderSync, Menu, X } from 'lucide-react'
import axios, { all } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Courses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const BASE_URL2 = import.meta.env.VITE_API_URL2;
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


    const [menu, setMenu] = useState(false)

    function handleHamburger() {
        setMenu((prev) => !prev)
    }
    console.log('menu', menu)


    function handleCancel() {
        setMenu(false)
    }

    return (
        <div>
            <Navbar />

            <div className='flex flex-col bg-gray-50 '>


                <div className='px-10 pt-2'>
                    <button onClick={() => handleHamburger()} className='md:hidden bg-gray-100 hover:bg-gray-200 p-2 flex gap-2 items-center justify-center border-2 rounded-lg '>
                        <span>Filter</span>
                        <FilterIcon size={18} color='black' />
                    </button>
                </div>

                <div className='flex justify-between gap-4 px-5 lg:px-28 py-2 h-[91vh] bg-gray-50  '>

                    {/* left  */}
                    <div className={`fixed md:static top-16 transition-all duration-300 left-0 h-full w-[240px] bg-gray-50 shadow-lg md:shadow-none z-[50] md:z-auto md:flex flex-col gap-2 ${menu ? 'flex' : 'hidden'}`}>

                        {/* filter */}
                        <div className='px-2'>
                            <div className='flex justify-between items-center'>
                                <h1 className="text-2xl font-bold pb-2 border-black border-b-2">Filter Options</h1>
                                <button onClick={() => handleCancel()} className={`${menu ? 'flex' : 'hidden'} rounded-full bg-gray-100 hover:bg-gray-200 p-1`}><X size={24} color='black' /></button>
                            </div>
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
                    <div className='flex items-center flex-wrap justify-center sm:gap-3  gap-y-2 w-full min-h-[80vh] overflow-y-auto scrollbar-hide'>
                        {filtering.length === 0 ? (
                            <p className="text-gray-800 font-bold text-2xl text-center mt-20">No courses found for selected filters</p>
                        ) : (filtering.filter((courses) => courses.status === true)
                            .map((courses, index) => {
                                const instructor = instuctorDetails[courses.instructor]
                                return <div onClick={() => handleClick(courses)} key={index} className="w-[80vw]  sm:w-[300px] flex items-center flex-col gap-1 md:flex-row md:gap-4 cursor-pointer border border-gray-300 rounded-xl shadow-lg py-4 px-2 sm:p-4 md:w-full md:h-[160px]">
                                    {/* Image (Left) */}
                                    <img src={courses?.thumbnail?.url ? `${BASE_URL2}${courses.thumbnail.url}`
                                        : ''
                                    }
                                        alt="course thumbnail" className="w-[76vw] sm:w-[250px] sm:h-[120px] md:w-48 md:h-32 object-cover rounded-lg shadow-md" />

                                    {/* Content (Right) */}
                                    <div className="flex flex-col">
                                        {/* Title */}
                                        <h2 className="font-bold text-xl text-gray-800">{courses.title}</h2>

                                        {/* Description */}
                                        <p className="text-sm text-gray-600 h-11 line-clamp-2 ">{courses.description}</p>

                                        {/* Instructor */}
                                        <p className="text-gray-700">Instructor: <span className="font-semibold text-sm  md:text-base ">{instructor ? instructor.name : 'Loading...'}</span></p>

                                        {/* Level */}
                                        <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">{courses.level}</span>
                                    </div>
                                </div>
                            }))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Courses
