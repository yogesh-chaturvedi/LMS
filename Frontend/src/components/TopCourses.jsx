import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CoursesContext } from '../context/CoursesContext';

const TopCourses = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const BASE_URL2 = import.meta.env.VITE_API_URL2;
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext);


    // to get instructor details
    useEffect(() => {
        allCourses.forEach((courses) => {
            getInstructorInfo(courses.instructor)
        })
    }, [allCourses])



    return (
        <section className="bg-gray-200 py-20 px-5 lg:px-28">
            {/* Heading */}
            <h2 className="text-3xl text-gray-800 font-bold text-center mb-12">
                Top Courses
            </h2>

            {/* Course Cards */}
            <div className="flex flex-wrap gap-8 justify-center">
                {allCourses
                    .filter((courses) => courses.topCourses === true && courses.status === true)
                    .map((course, index) => {
                        const instructor = instuctorDetails[course.instructor];
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition w-72"
                            >
                                <img
                                    src={
                                        course?.thumbnail?.url ? `${BASE_URL2}${course.thumbnail.url}` : ''
                                    }
                                    alt="courseThumbnail"
                                    className="w-full h-44 object-cover"
                                />


                                <div className="px-4 py-3 flex flex-col gap-2">
                                    {/* Title */}
                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                        {course.title}
                                    </h3>

                                    {/* Instructor + Level */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-600">
                                            {instructor ? instructor.name : "Loading..."}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold">
                                            {course.level}
                                        </span>
                                    </div>

                                    {/* Price + Button */}
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-lg font-bold text-gray-800">
                                            ₹{course.price}
                                        </span>
                                        <Link
                                            to={`/course-details/${course._id}`}
                                            state={course}
                                            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

        </section>

    )
}

export default TopCourses
