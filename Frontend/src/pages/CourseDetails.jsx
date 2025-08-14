import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Camera, PlayCircle } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'

const CourseDetails = () => {

    // const course = {
    //     name: "MERN Full Stack Development",
    //     description: "Learn to build modern web applications using MongoDB, Express, React, and Node.js.",
    //     instructor: "John Doe",
    //     students: 1250
    // };

    const topics = [
        "Introduction to MERN Stack",
        "Setting up Development Environment",
        "React Basics & Components",
        "Node.js & Express Fundamentals",
        "MongoDB CRUD Operations",
        "Deploying MERN Application"
    ];

    const { id } = useParams();
    console.log(id);


    const location = useLocation()
    // console.log(location.state)

    // stores the data
    const course = location.state || null;
    console.log(course)


    return (
        <div>
            <Navbar />

            {/* course details hero section */}
            <div className="bg-gray-700 shadow-md p-6 w-full px-28 border border-red-200">

                {course && (
                    <div>
                        {/* Course Name */}
                        <h3 className="text-xl font-bold text-white">{course.title}</h3>

                        {/* One-line Description */}
                        <p className="text-white mt-1">This is one of the best course it will help u to become great mern developer</p>

                        {/* Instructor */}
                        <p className="mt-3 text-sm text-white">
                            <span className="font-semibold">Instructor:</span> {course.instructor}
                        </p>

                        {/* Students Enrolled */}
                        <p className="text-sm text-white">
                            <span className="font-semibold">Enrolled:</span>40</p>
                    </div>
                )}
            </div>

            {/* course details */}
            <div className='px-28 py-10 flex justify-between'>

                {/*left*/}
                <div className='left flex flex-col gap-3'>

                    {/* discription */}
                    <section>
                        <div className="max-w-3xl mx-auto bg-white rounded-lg">
                            <h2 className="text-2xl font-bold text-gray-800">Course Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet
                                vehicula leo, et laoreet nisl. Cras eu sapien non eros scelerisque
                                ullamcorper sed non erat. Integer vel ante a erat interdum tempus. Fusce
                                pretium, augue vel pellentesque fermentum, nulla ipsum varius neque, non
                                facilisis odio purus sit amet quam. Suspendisse potenti. Maecenas sed
                                efficitur libero, at sagittis sapien. In non urna eros. Phasellus
                                ullamcorper orci sed neque vehicula, id efficitur mauris dictum.
                            </p>

                            {/* key takaways */}
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">key takaways</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet
                                vehicula leo, et laoreet nisl. Cras eu sapien non eros scelerisque
                                ullamcorper sed non erat. Integer vel ante a erat interdum tempus. Fusce
                                pretium, augue vel pellentesque fermentum, nulla ipsum varius neque, non
                                facilisis odio purus sit amet quam. Suspendisse potenti. Maecenas sed
                                efficitur libero, at sagittis sapien. In non urna eros. Phasellus
                                ullamcorper orci sed neque vehicula, id efficitur mauris dictum.
                            </p>

                            {/* prerequisites */}
                            <h2 className="text-2xl font-bold text-gray-800 mt-2">prerequisites</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet
                                vehicula leo, et laoreet nisl. Cras eu sapien non eros scelerisque
                                ullamcorper sed non erat. Integer vel ante a erat interdum tempus. Fusce
                                pretium, augue vel pellentesque fermentum, nulla ipsum varius neque, non
                                facilisis odio purus sit amet quam. Suspendisse potenti.
                            </p>
                        </div>
                    </section>

                    {/* course content */}
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl border border-gray-200">
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                            <p className="text-sm text-gray-500">12 Lectures</p>
                        </div>

                        {/* Topics List */}
                        <ul className="space-y-3">
                            {topics.map((topic, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition"><PlayCircle className="w-5 h-5 text-blue-500" /><span>{topic}</span></li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* right */}
                <div className='right'>
                    <div className="bg-white pb-3 shadow-md rounded-lg overflow-hidden border border-gray-200 max-w-md">
                        {/* Video Section */}
                        <video controls className="w-full h-64 object-cover">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Price Section */}
                        <div className="p-4">
                            <h3 className="text-2xl font-bold text-gray-800">₹499</h3>
                            <p className="text-sm text-gray-500">One-time payment for lifetime access</p>
                        </div>

                        <div className='text-center'>
                            <Link to={`/course-progress/${id}`} state={topics} className='bg-green-500 hover:bg-green-600 px-2 rounded-lg text-lg font-medium'>Continue Course</Link>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default CourseDetails
