import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InstructorSidebar from '../../components/InstructorSidebar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'

const AddCourses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const { courseDetails, setCourseDetails, isEdit, setIsEdit } = useContext(CoursesContext)

    console.log(isEdit)
    // console.log(courseDetails)

    function handleChange(e) {
        setCourseDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleClick() {
        try {
            // edit mode
            if (courseDetails._id) {
                const response = await axios({
                    method: "put",
                    url: `${BASE_URL}course/update/${courseDetails._id}`,
                    data: courseDetails,
                    withCredentials: true
                })

                const { message, success, course } = response.data;

                if (success) {
                    console.log(message);
                    toast(message, {
                        position: "bottom-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setIsEdit(false);
                    setTimeout(() => {
                        navigate(`/instructor/add-lectures/${course._id}`);
                    }, 1500);
                }

            }
            else {
                // call to create new
                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}course/info`,
                    data: courseDetails,
                    withCredentials: true
                })
                const { message, success, course } = response.data;
                if (success) {
                    // console.log(message);
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
                    setTimeout(() => {
                        navigate(`/instructor/add-lectures/${course._id}`);
                    }, 1500);
                }
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    // to clear fields
    function handleClear() {
        setCourseDetails({
            title: '',
            subTitle: '',
            category: '',
            level: '',
            price: '',
            description: '',
            thumbnail: '',
        })
        //later i will add tost also
    }


    // function goToLecture(courseId) {
    //     navigate(`instructor/add-lectures/${courseId}`)
    // }


    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className=' bg-gray-950 px-28 flex-1 py-10 flex gap-4 flex-col'>

                    <div className='flex justify-between'>
                        <h2 className='text-2xl font-bold text-white'>Add details information regarding course</h2>
                        <button className='text-white font-semibold hover:underline bg-gray-800 hover:bg-gray-700  px-2 rounded-lg'>Go to lecture page</button>
                    </div>

                    <div className='text-white bg-black rounded-xl p-4 border border-gray-700 shadow-xl'>

                        {/* heading */}
                        <h3 className='font-bold text-2xl text-white'>
                            Lets Add some basic details of your course
                        </h3>

                        <div className='mt-5 border-2 border-black flex flex-col gap-4'>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input value={courseDetails.title} onChange={handleChange} name='title' className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>

                            {/*sub-title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Subtitle</label>
                                <input value={courseDetails.subTitle} onChange={handleChange} name='subTitle' className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Subtitle of your course' />
                            </div>

                            {/* category and level */}
                            <div className='flex gap-5'>

                                {/* category */}
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-xl'>Category</label>
                                    <select value={courseDetails.category} onChange={handleChange} name="category" className='w-40 border-2 border-gray-500 outline-none bg-black text-white rounded-md' id="category">
                                        <option value="">Select a Category</option>
                                        <option value="webdev">Web Development</option>
                                        <option value="datascience">Data Science</option>
                                        <option value="Docker">Docker</option>
                                        <option value="devops">DevOps</option>
                                    </select>
                                </div>

                                {/* level */}
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-xl'>Level</label>
                                    <select value={courseDetails.level} onChange={handleChange} className='w-32 border-2 border-gray-500 outline-none bg-black text-white rounded-md ' name="level" id="level">
                                        <option value="">Select a Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="medium">Medium</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* price */}
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-lg'>Price</label>
                                    <input value={courseDetails.price} onChange={handleChange} name='price' className='w-40 border-2 border-gray-500 rounded-lg px-2 outline-none bg-black text-white' type="number" placeholder='Enter Price' />
                                </div>

                            </div>

                            {/* Instructor name
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Name</label>
                                <input value={courseDetails.instructorName} onChange={handleChange} name='instructorName' className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Instructor Name' />
                            </div> */}

                            {/* description */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Course Description</label>
                                <input value={courseDetails.description} onChange={handleChange} name='description' className='outline-none border-2 border-gray-500 rounded-md px-2 bg-black text-white' type="text" placeholder='Enter description of your course' />
                            </div>

                            {/*thumbnail url*/}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Course Thumbnail</label>
                                <input value={courseDetails.thumbnail} onChange={handleChange} name='thumbnail' className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="url" placeholder='Enter Thumbnail of your course' />
                            </div>

                            {/* buttons */}
                            <div className='flex gap-2'>
                                <button onClick={handleClear} className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Clear</button>

                                {/* to='/instructor/add-lectures' */}
                                <button onClick={handleClick} className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>{isEdit ? 'Updated' : 'Create'}</button>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default AddCourses
