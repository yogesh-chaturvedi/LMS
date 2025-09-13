import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle, PlayCircle } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const CourseProgress = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const { courseId, lectureId } = useParams()
    console.log(courseId, lectureId)

    const [flag, setflag] = useState(true)
    const navigate = useNavigate()

    const [videos, setVideos] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [isCompleted, setIsCompleted] = useState([])


    const [CurrentLecture, setCurrentLecture] = useState()

    const location = useLocation();
    const course = location.state || '';


    function currentLecture(courseId, currentLectureId, index) {
        navigate(`/course-progress/${courseId}/${currentLectureId}`, { state: course })

        if (!isCompleted.includes(index)) {
            setIsCompleted((prev) => ([...prev, index]))
        }
    }

    console.log('isCompleted', isCompleted)


    // to get current lecture info
    useEffect(() => {
        async function getCurrentLecture(courseId, lectureId) {
            try {
                const response = await axios({
                    method: 'get',
                    url: `${BASE_URL}course/currentLecture/${courseId}/${lectureId}`,
                    withCredentials: true
                })
                const { message, success, currentLecture } = response.data;
                if (success) {
                    console.log(message);
                    setCurrentLecture(currentLecture)
                    setVideoTitle(currentLecture.lectureTitle)
                    setVideos(currentLecture.lectureVideo)
                }
            }
            catch (error) {
                console.log("there ia na error", error)
            }
        }
        getCurrentLecture(courseId, lectureId)
    }, [courseId, lectureId])

    // it only run one time 
    useEffect(() => {
        if (flag) {
            setIsCompleted([0])
        }
        setflag(false)
    }, [course]);


    // to reset completed video
    function handleReset(lectureId) {
        setIsCompleted([0])
        navigate(`/course-progress/${courseId}/${lectureId}`, { state: course })
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gray-50 flex py-12 justify-between px-28 h-[90vh]'>
                {/* left */}
                <div className="left p-6 w-[55%] rounded-md border-2 border-gray-200 shadow-xl hover:bg-gray-100 ">

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4 ">{videoTitle}</h1>
                    {/* Video */}
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe width="100%" height="400" src={videos}
                            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                </div>

                {/* right */}
                <div className='w-[40%]'>

                    <div className='text-end'>
                        <button onClick={() => handleReset(course.lecture[0]._id)} className='m-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>Reset</button>
                    </div>

                    <div className="rounded-lg p-6 hover:bg-gray-100 shadow-xl border border-gray-200">
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                            <p className="text-sm text-gray-500">{`${course.lecture.length} Lectures`}</p>
                        </div>
                        {/* lectures.lectureVideo, lectures.lectureTitle, index */}
                        {/* Topics List */}
                        <ul className="space-y-3">
                            {course.lecture.map((lectures, index) => (
                                <li onClick={() => currentLecture(courseId, lectures._id, index)} key={index} className={`flex justify-between border-2 border-gray-300 py-2.5 px-1.5 rounded-lg items-center gap-3 text-gray-700 hover:bg-gray-400 cursor-pointer transition ${lectures._id === lectureId ? "bg-gray-500" : ""}`}><div className='flex items-center gap-1.5'><PlayCircle className="w-5 h-5 text-blue-500" /><span className='w-[390px] truncate'>{lectures.lectureTitle}</span></div><span>{isCompleted.includes(index) && (
                                    <CheckCircle className="w-5 h-5 text-green-500" />)}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default CourseProgress
