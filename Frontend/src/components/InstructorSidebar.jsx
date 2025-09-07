import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const InstructorSidebar = () => {

    const loaction = useLocation();

    const { courseId, lectureId } = useParams();
    // console.log('courseId', courseId);

    return (
        <div className='bg-blue-500 w-56 h-[91vh]'>

            <h2 className='font-bold text-center text-2xl py-2 border-b-2 border-gray-800'>Instructor Sidebar</h2>

            <div className='flex flex-col gap-3 text-center mt-4'>

                <Link to='/instructor/my-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/my-courses' ? 'bg-gray-600' : ''} `}>My Courses</Link>

                <Link to='/instructor/add-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/add-courses' || location.pathname === `/instructor/add-lectures/${courseId}` ? 'bg-gray-600' : ''}`}>Add Courses</Link>

            </div>

        </div>
    )
}

export default InstructorSidebar
