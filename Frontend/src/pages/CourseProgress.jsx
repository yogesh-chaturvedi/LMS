import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircle, Fullscreen, PlayCircle } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const CourseProgress = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const BASE_URL2 = import.meta.env.VITE_API_URL2;
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

    const [videoIndex, setvideoIndex] = useState(0)

    function currentLecture(courseId, currentLectureId, index) {
        navigate(`/course-progress/${courseId}/${currentLectureId}`, { state: course })

        setvideoIndex(index)

        if (!isCompleted.includes(index)) {
            setIsCompleted((prev) => ([...prev, index]))
        }
    }
    console.log('videoIndex', videoIndex)
    console.log('isCompleted', isCompleted)

    // to sync lecture id and index
    useEffect(() => {
        if (course?.lecture && lectureId) {
            const idx = course.lecture.findIndex((lec) => lec._id === lectureId)
            if (idx !== -1) {
                setvideoIndex(idx)
            }
            else {
                setvideoIndex(0)
            }
        }
    }, [course, lectureId])


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
                    setVideos(currentLecture.lectureVideo.url)
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

    console.log(videos)


    // to reset completed video
    function handleReset(lectureId) {
        setIsCompleted([0])
        setvideoIndex(0)
        navigate(`/course-progress/${courseId}/${lectureId}`, { state: course })
    }

    return (
        <div>
            <Navbar />
            <div className='bg-gray-50 flex gap-4 xl:flex-row flex-col items-center xl:items-start py-8 justify-between px-5 lg:px-28 h-auto xl:h-[90vh]'>

                {/* left */}
                <div className="left p-6 w-full xl:w-[55%] rounded-md border-2 border-gray-200 shadow-xl hover:bg-gray-100 ">

                    {/* Title */}
                    <h1 title={videoTitle} className="md:text-3xl text-xl font-bold mb-4 truncate ">{videoTitle}</h1>
                    {/* Video */}
                    <div className="w-full">

                        <video key={videoIndex} width='700' height='500' controls >
                            <source src={`${BASE_URL2}${course?.lecture?.[videoIndex]?.lectureVideo?.url}`} type={course?.lecture?.[videoIndex]?.lectureVideo?.contentType} />
                        </video>

                        {/* <video width='700' height='500' controls >
                            <source src={`${BASE_URL2}${videos}`} type={currentLecture?.lectureVideo?.contentType} />
                        </video> */}

                    </div>

                </div>

                {/* right */}
                <div className='w-full xl:w-[40%]'>

                    <div className="rounded-lg p-6 hover:bg-gray-100 shadow-xl border border-gray-200">
                        {/* Header */}

                        <div className='flex justify-between'>

                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                                <p className="text-sm text-gray-500">{`${course.lecture.length} Lectures`}</p>
                            </div>

                            <div className='text-end'>
                                <button onClick={() => handleReset(course.lecture[0]._id)} className='m-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>Reset</button>
                            </div>

                        </div>


                        {/* lectures.lectureVideo, lectures.lectureTitle, index */}
                        {/* Topics List */}
                        <ul className="space-y-3">
                            {course.lecture.map((lectures, index) => (
                                <li onClick={() => currentLecture(courseId, lectures._id, index)} key={index} className={`flex relative justify-between border-2 border-gray-300 py-2.5 px-1.5 rounded-lg items-center gap-3 text-gray-700 hover:bg-gray-400 cursor-pointer transition ${lectures._id === lectureId ? "bg-gray-500" : ""}`}>
                                    <div className='flex flex-1 pr-8 w-5 items-center gap-1.5'>
                                        <PlayCircle className="w-5 h-5 shrink-0 text-blue-500" />
                                        <span className='truncate overflow-hidden whitespace-nowrap'>{lectures.lectureTitle}</span>
                                    </div>
                                    <span className='absolute right-2'>{isCompleted.includes(index) && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />)}</span>
                                </li>
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
