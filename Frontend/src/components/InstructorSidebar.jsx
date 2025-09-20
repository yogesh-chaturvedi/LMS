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
        <div className='relative bg-blue-700 min-h-screen'>

            <div onClick={() => handleClick()} className='md:hidden block mt-4 px-1.5'><Menu size={24} color='white' /></div>

            <div className={`bg-blue-700 text-white absolute md:static left-0 top-[0px] pt-4 min-h-screen w-56 md:block ${sidebarStatus ? 'block' : 'hidden'}`}>

                <div className='flex justify-between text-center border-b-2 border-gray-800 items-center mb-5 pb-2'>
                    <h1 className="text-2xl font-bold w-full">Instructor Panel</h1>
                    <span onClick={() => handleCancel()} className={`p-1 rounded-full hover:bg-blue-600 cursor-pointer block lg:hidden`}><X size={24} color='white' /></span>
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
