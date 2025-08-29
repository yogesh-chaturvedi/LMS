import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PlayCircle } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'

const CourseProgress = () => {

    const { id } = useParams()
    console.log(id)

    const [videos, setVideos] = useState()

    const location = useLocation();
    const course = location.state || '';



    return (
        <div>
            <Navbar />
            <div className='flex py-12 justify-between px-28 '>
                {/* left */}
                <div className="left p-6 w-[55%] ">

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4 ">My Awesome Video</h1>
                    {/* Video */}
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe width="100%" height="400" src={course?.lecture?.[0]?.lectureVideo}
                            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    {/* video title  */}
                    <div className='title text-lg font-medium mt-1'>Introduction to MERN Stack</div>
                </div>

                {/* right */}
                <div className='w-[40%]'>

                    <div className='text-end'>
                        <button className='m-1 px-2 py-1 bg-black text-white rounded-lg'>Mark as read</button>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                            <p className="text-sm text-gray-500">{`${course.lecture.length} Lectures`}</p>
                        </div>

                        {/* Topics List */}
                        <ul className="space-y-3">
                            {course.lecture.map((lectures, index) => (
                                <li key={index} className="flex border-2 border-gray-300 py-2.5 px-1.5 rounded-lg items-center gap-3 text-gray-700 hover:bg-gray-400 cursor-pointer transition"><PlayCircle className="w-5 h-5 text-blue-500" /><span>{lectures.lectureTitle}</span></li>
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
