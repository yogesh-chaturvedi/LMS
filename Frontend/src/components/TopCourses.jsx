import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../context/CoursesContext';

const TopCourses = () => {

    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData } = useContext(CoursesContext);

    return (
        <section className="py-20 border-2 border-red-500 px-28 bg-gray-50">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-8">Top Courses</h2>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allCourses.filter((courses, index) => courses.topCourses === true)
                    .map((course, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-lg transition" >
                            <img src={course.thumbnail} alt='courseThumbnail' className="w-full h-40 object-cover" />

                            <div className="px-4 py-3">
                                <h3 className="text-lg font-semibold">{course.title}</h3>

                                <div className='mb-2 flex justify-between items-center'>
                                    <span className='instructor-name font-bold'>{course.instructor}</span>
                                    <span className='course-level bg-blue-500 px-2 rounded-lg font-bold'>Advance</span>
                                </div>

                                <div className=' flex justify-between items-center'>
                                    <span className='price font-bold'>Rs.{course.price}</span>
                                    <Link to={`/course-details/${course._id}`} state={course} className='bg-green-500 px-2 rounded-lg font-bold'>View Course</Link>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

        </section>
    )
}

export default TopCourses
