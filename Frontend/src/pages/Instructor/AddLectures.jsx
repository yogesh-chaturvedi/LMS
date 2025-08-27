import React, { useState } from 'react'
import InstructorSidebar from '../../components/InstructorSidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { CoursesContext } from '../../context/CoursesContext'
import { useEffect } from 'react'

const AddLectures = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const { courseId } = useParams()
    console.log(courseId)

    const [lectureTitle, setLectureTitle] = useState('');

    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName } = useContext(CoursesContext)


    // to set the title value in usestate
    function handleChange(e) {
        setLectureTitle(e.target.value);
    }
    console.log(lectureTitle)


    // fetch course details on mount 
    useEffect(() => {
        async function fetchCourseDetails(courseId) {
            try {
                const response = await axios({
                    method: 'get',
                    url: `${BASE_URL}course/courseDetails/${courseId}`,
                    withCredentials: true
                })
                const { message, success, course } = response.data;
                if (success) {
                    console.log(message)
                    setCourseDetails(course)
                }
            }
            catch (error) {
                console.log("there is an error ", error)
            }
        }
        fetchCourseDetails(courseId)
    }, [])


    // to create Lecture
    async function createLecture(objectId) {
        console.log("create lecture")
        try {
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}course/lecture/${objectId}`,
                data: { lectureTitle },
                withCredentials: true
            })

            const { message, success, course } = response.data;
            if (success) {
                console.log(message);
                setLectureTitle('');
                setCourseDetails(course);
            }

        }
        catch (error) {
            console.log("there is an error", error)
        }
    }


    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className=' bg-gray-950 px-28 flex-1 py-10'>
                    <div className='text-white bg-black rounded-xl p-4 border border-gray-700 shadow-xl'>
                        {/* heading */}

                        <h3 className='font-bold text-2xl text-white'>Add some lectures for your course</h3>

                        <div className='mt-5 border-2 border-black flex flex-col gap-4'>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Lecture Title</label>
                                <input value={lectureTitle} onChange={handleChange} name='lecTitle' className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>


                            {/* buttons */}
                            <div className='flex gap-2'>

                                <Link to='/instructor/my-courses' className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Back to course</Link>

                                <button onClick={() => createLecture(courseId)} className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Create lecture</button>

                            </div>

                            {/* lectures */}
                            <div className='flex flex-col gap-3'>
                                {courseDetails?.lecture?.length === 0 ? (
                                    <div>No lecture available</div>
                                ) : (courseDetails?.lecture?.map((lecture) => {
                                    return <div key={lecture._id} >
                                        <Link to={`/instructor/edit-lectures/${courseId}/${lecture._id}`} state={lecture} className=' w-full block font-semibold rounded-lg px-2 py-1 bg-gray-700 hover:bg-gray-800 cursor-pointer'>{lecture.lectureTitle}</Link>
                                    </div>
                                }))}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AddLectures
