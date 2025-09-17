import { Menu, X } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom'

const InstructorSidebar = () => {

    const loaction = useLocation();

    const { courseId, lectureId } = useParams();
    // console.log('courseId', courseId);

    const [sidebarStatus, setsidebarStatus] = useState(false)


    function handleClick() {
        setsidebarStatus((prev) => !prev)
    }

    console.log('sidebarStatus', sidebarStatus)

    function handleCancel() {
        setsidebarStatus(false)
    }

    return (
        <div className='relative'>

            <div onClick={() => handleClick()} className='md:hidden block mt-4 px-1'><Menu size={24} color='black' /></div>

            <div className={`bg-blue-400 fixed md:static left-0 top-[64px] w-56 min-h-screen md:block ${sidebarStatus ? 'block' : 'hidden'}`}>

                <div className='flex justify-between items-center px-1 border-b-2 border-gray-800'>
                    <h2 className='font-bold text-center text-xl py-2 '>Instructor Sidebar</h2>
                    <span className={`p-1 hover:bg-blue-600 rounded-full cursor-pointer ${sidebarStatus ? 'block' : 'hidden'}`} onClick={() => handleCancel()}><X size={24} color='black' /></span>
                </div>

                <div className='flex flex-col gap-3 text-center mt-4'>

                    <Link to='/instructor/my-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/my-courses' ? 'bg-gray-600' : ''} `}>My Courses</Link>

                    <Link to='/instructor/add-courses' className={`hover:bg-gray-500 text-xl w-[80%] mx-auto rounded-lg py-1 font-semibold ${location.pathname === '/instructor/add-courses' || location.pathname === `/instructor/add-lectures/${courseId}` ? 'bg-gray-600' : ''}`}>Add Courses</Link>

                </div>

            </div>
        </div>
    )
}

export default InstructorSidebar
