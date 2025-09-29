import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InstructorSidebar from '../../components/InstructorSidebar'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'

const AddCourses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const { courseDetails, setCourseDetails, isEdit, setIsEdit } = useContext(CoursesContext)

    console.log(isEdit)
    // console.log(courseDetails)


    //   navigate(`/instructor/add-lectures/${course._id}`);

    function handleChange(e) {
        setCourseDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const [file, setfile] = useState(null)

    function handleFileChange(e) {
        setfile(e.target.files[0])
    }

    const formData = new FormData();
    formData.append('title', courseDetails.title)
    formData.append('subTitle', courseDetails.subTitle)
    formData.append('category', courseDetails.category)
    formData.append('price', courseDetails.price)
    formData.append('level', courseDetails.level)
    if (file) formData.append('thumbnail', file)


    async function handleClick() {
        try {
            // edit mode
            if (courseDetails._id) {
                const response = await axios({
                    method: "put",
                    url: `${BASE_URL}course/update/${courseDetails._id}`,
                    data: formData,
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
                        // navigate(`/instructor/course-outline/${course._id}`, { state: course });
                        navigate('/instructor/my-courses')
                    }, 1000);
                }

            }
            else {
                // call to create new
                const response = await axios({
                    method: 'post',
                    url: `${BASE_URL}course/info`,
                    data: formData,
                    withCredentials: true
                })
                const { message, success, course } = response.data;
                if (success) {
                    console.log(message);
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
                        navigate(`/instructor/course-outline/${course._id}`, { state: course });
                    }, 1000);
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

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />

            <div className='flex bg-gray-50 '>

                {/* sidebar */}
                <InstructorSidebar />

                {/* right  */}
                <div className='px-5 lg:px-28  w-full md:w-[70vw] flex-1 py-3 flex gap-4 flex-col'>

                    {/* <div className='flex justify-between'>
                        <h2 className='text-2xl font-bold text- pl-1'>Add details information regarding course</h2>
                        <button className='text-white font-semibold hover:underline bg-gray-800 hover:bg-gray-700  px-2 rounded-lg'>Go to lecture page</button>
                    </div> */}

                    <div className='text-black bg-gray-200 rounded-xl p-4 border border-gray-200 shadow-xl'>

                        {/* heading */}
                        <h3 className='font-bold text-2xl text-black'>
                            Lets Add some basic details of your course
                        </h3>

                        <div className='mt-5  flex flex-col gap-4'>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input value={courseDetails.title} onChange={handleChange} name='title' className='outline-none text-black bg-white border-2 border-gray-200 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>

                            {/*sub-title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Subtitle</label>
                                <input value={courseDetails.subTitle} onChange={handleChange} name='subTitle' className='outline-none text-black bg-white border-2 border-gray-200 rounded-md px-2' type="text" placeholder='Enter Subtitle of your course' />
                            </div>

                            {/* category and level */}
                            <div className='flex flex-col sm:flex-row gap-5 w-full'>

                                {/* category */}
                                <div className='flex flex-col gap-1 w-[160px] sm:w-[200px]'>
                                    <label className='font-semibold text-xl'>Category</label>
                                    <select value={courseDetails.category} onChange={handleChange} name="category" className='w-full border-2 border-gray-200 outline-none bg-white text-black rounded-md' id="category">
                                        <option value="">Select a Category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="Cloud Computing">Cloud Computing</option>
                                        <option value="UI/UX Design">UI/UX Design</option>
                                        <option value="Language">Language</option>
                                    </select>
                                </div>

                                {/* level */}
                                <div className='flex flex-col gap-1 w-[160px] sm:w-[200px]'>
                                    <label className='font-semibold text-xl'>Level</label>
                                    <select value={courseDetails.level} onChange={handleChange} className='w-full border-2 border-gray-200 outline-none bg-white text-black rounded-md ' name="level" id="level">
                                        <option value="">Select a Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                            </div>

                            {/* price */}
                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>Price</label>
                                <input value={courseDetails.price} onChange={handleChange} name='price' className='w-40 border-2 border-gray-200 rounded-lg px-2 outline-none bg-white text-black' type="number" placeholder='Enter Price' />
                            </div>

                            {/*thumbnail url*/}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Course Thumbnail</label>
                                <input onChange={handleFileChange} name='thumbnail' accept='image/*' type="file" />
                            </div>

                            {/* buttons */}
                            <div className='flex gap-2'>
                                <button onClick={() => handleClear()} className='text-white font-semibold rounded-lg px-2 py-1 bg-black'>Clear</button>

                                {/* to='/instructor/add-lectures' */}
                                <button onClick={() => handleClick()} className='bg-black text-white font-semibold rounded-lg px-2 py-1'>{isEdit ? 'Updated' : 'Next'}</button>
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
