import React, { useContext, useEffect, useState } from 'react'
import InstructorSidebar from '../../components/InstructorSidebar'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { CoursesContext } from '../../context/CoursesContext'

const EditLecture = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName } = useContext(CoursesContext)

    // to get lecture id from URL.
    const { courseId, lectureId } = useParams();
    // console.log("edit lecture ", courseId)

    const [videoUrl, setVideoUrl] = useState('')

    const navigate = useNavigate();

    const location = useLocation();

    // to set lecture name in lecture-edit page
    useEffect(() => {
        setLectureName(location.state.lectureTitle)
    }, [])


    const [isFree, setIsFree] = useState(false)

    // to set free video or not
    function handleCheckBox(e) {
        setIsFree(e.target.checked)
    }
    console.log('isFree', isFree)


    // to remove lecture
    async function handleRemove(courseId, lectureId) {
        try {
            const response = await axios({
                method: 'delete',
                url: `${BASE_URL}course/removeLecture/${courseId}/${lectureId}`,
                withCredentials: true
            })
            const { message, success, course } = response.data;
            if (success) {
                console.log(message);
                setCourseDetails(course);
                navigate(`/instructor/add-lectures/${courseId}`)
            }
        }
        catch (error) {
            console.log('there is an error', error)
        }
    }

    // to set video url
    function handleChange(e) {
        setVideoUrl(e.target.value)
    }

    console.log(videoUrl)

    async function addVideo(videoUrl, isFree) {

        if (videoUrl === '') {
            toast('Add Video', {
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
                method: 'put',
                url: `${BASE_URL}course/addVideo/${courseId}/${lectureId}`,
                data: { videoUrl, isFree },
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
                setTimeout(() => {
                    navigate(`/instructor/add-lectures/${courseId}`)
                }, 1500);
                // setCourseDetails(course)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }

    return (
        <div>
            <Navbar />

            <div className='flex bg-gray-50'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className='px-5 lg:px-28 flex-1 py-3 min-h-screen'>
                    <div className='text-black bg-gray-100 rounded-xl p-4 shadow-xl'>

                        {/* heading */}
                        <h3 className='font-bold text-2xl text-black'>Edit Lectures</h3>
                        <p className='text-gray-800'>Make changes and click save when done</p>

                        <div className='mt-5 flex flex-col gap-4'>

                            <button onClick={() => handleRemove(courseId, lectureId)} className='w-[140px] text-center bg-red-600 hover:bg-red-700 text-black font-semibold rounded-lg px-2 py-2'>Remove Lecture</button>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input value={lectureName} className='w-full sm:w-72 outline-none text-black bg-white border-2 border-gray-200 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>

                            {/* video url */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Video</label>
                                <input value={videoUrl} onChange={handleChange} className='w-full sm:w-72 outline-none text-balck bg-white border-2 border-gray-200 rounded-md px-2' type="url" placeholder='Enter Video url' />
                            </div>

                            <div className="flex items-center gap-2">
                                <input onChange={handleCheckBox} checked={isFree} className="w-4 h-4 accent-blue-600 cursor-pointer" type="checkbox" name="checkbox" />
                                <span>is this video free</span>
                            </div>


                            {/* buttons */}
                            {/* to='/instructor/my-courses' */}
                            <div className='flex gap-2'>
                                <button onClick={() => addVideo(videoUrl, isFree)} className='bg-black text-white font-semibold rounded-lg px-2 py-1'>Update Lecture</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default EditLecture
