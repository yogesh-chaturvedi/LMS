import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../context/CoursesContext';

const TopCourses = () => {

    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext);


    // to get instructor details
    useEffect(() => {
        allCourses.forEach((courses) => {
            getInstructorInfo(courses.instructor)
        })
    }, [allCourses])



    return (
        <section className="bg-gray-950 py-20  px-28">
            {/* Heading */}
            <h2 className="text-3xl text-white font-bold text-center mb-8">Top Courses</h2>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allCourses.filter((courses) => courses.topCourses === true && courses.status === true)
                    .map((course, index) => {
                        const instructor = instuctorDetails[course.instructor]
                        return <div key={index} className="bg-white rounded-lg shadow-lg border-2 border-gray-700 overflow-hidden hover:shadow-lg transition" >
                            <img src={course.thumbnail} alt='courseThumbnail' className="w-full h-40 object-cover" />

                            <div className="px-4 py-3">
                                <h3 className="text-lg font-semibold">{course.title}</h3>

                                <div className='mb-2 flex justify-between items-center'>
                                    <span className='instructor-name font-bold'>{instructor ? instructor.name : 'Loading...'}</span>
                                    <span className='course-level bg-blue-500 px-2 rounded-lg font-bold'>Advance</span>
                                </div>

                                <div className=' flex justify-between items-center'>
                                    <span className='price font-bold'>Rs.{course.price}</span>
                                    <Link to={`/course-details/${course._id}`} state={course} className='bg-green-500 px-2 rounded-lg font-bold'>View Course</Link>
                                </div>
                            </div>
                        </div>
                    })}
            </div>

        </section>
    )
}

export default TopCourses
