import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const InstructorSidebar = () => {

    const loaction = useLocation();


    return (
        <div className='borde-2 border-red-500 bg-blue-700 w-56 h-[90vh]'>

            <h2 className='font-bold text-center text-2xl py-2 border-b-2 border-gray-800'>Instructor Sidebar</h2>

            <div className='flex flex-col gap-3 text-center mt-4'>
                <Link to='/instructor/add-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/add-courses' || location.pathname === '/instructor/add-lectures' ? 'bg-gray-600' : ''}`}>Add Courses</Link>
                < Link to='/instructor/my-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/my-courses' ? 'bg-gray-600' : ''} `}>My Courses</Link>
            </div>

        </div>
    )
}

export default InstructorSidebar
