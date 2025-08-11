import React from 'react'
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';

const TopCourses = () => {

    const courses = [
        {
            id: 1,
            title: "Web Development",
            image: assets.mern,
            price: 300,
            instructor: 'Yash Chaturvedi'
        },
        {
            id: 2,
            title: "Data Science",
            image: assets.mern2,
            price: 500,
            instructor: 'Yogesh Chaturvedi'
        },
        {
            id: 3,
            title: "UI/UX Design",
            image: assets.node,
            price: 900,
            instructor: 'Allen Mamgain'
        },
        {
            id: 4,
            title: "Machine Learning",
            image: assets.mern2,
            price: 700,
            instructor: 'Allen Chaturvedi'
        },
    ];


    return (
        <section className="py-20 border-2 border-red-500 px-28 bg-gray-50">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-8">Our Courses</h2>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition" >
                        <img src={course.image} alt={course.title} className="w-full border-2 border-red-500 h-40 object-cover" />

                        <div className="px-4 py-3">
                            <h3 className="text-lg font-semibold">{course.title}</h3>

                            <div className='mb-2 flex justify-between items-center'>
                                <span className='instructor-name font-bold'>{course.instructor}</span>
                                <span className='course-level bg-blue-500 px-2 rounded-lg font-bold'>Advance</span>
                            </div>

                            <div className=' flex justify-between items-center'>
                                <span className='price font-bold'>Rs.{course.price}</span>
                                <Link to={`/course-details/${course.id}`} state={ course } className='bg-green-500 px-2 rounded-lg font-bold'>View Course</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default TopCourses
