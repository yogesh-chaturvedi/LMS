import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const loaction = useLocation();

    const [sidebar, setsidebar] = useState(false)

    function handleClick() {
        setsidebar((prev) => !prev)
    }
    console.log('sidebar', sidebar)

    function handleCnacel() {
        setsidebar(false)
    }


    return (
        <div className='relative'>

            <div onClick={() => handleClick()} className=' lg:hidden block px-1 pt-4'><Menu size={24} color='black' /></div>

            <div className={`w-56 bg-blue-500 fixed z-50 lg:static left-0 top-[64px] text-white text-center lg:flex flex-col p-4 min-h-screen ${sidebar ? 'block' : 'hidden'} `}>

                <div className='flex justify-between border-b-2 border-gray-800 items-center mb-5 pb-2'>
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <span onClick={() => handleCnacel()} className='p-1 rounded-full hover:bg-blue-600 cursor-pointer'><X size={24} color='black' /></span>
                </div>

                <nav className="flex flex-col gap-4">

                    <Link to="/admin/dashboard" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition ${loaction.pathname === "/admin/dashboard" ? 'bg-gray-600' : ''}`}>Dashboard</Link>

                    <Link to="/admin/courses" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/courses" ? 'bg-gray-600' : ''}`}>Courses</Link>

                    <Link to="/admin/users" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/users" ? 'bg-gray-600' : ''}`}>Users</Link>

                    <Link to="/admin/add-instructor" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/add-instructor" ? 'bg-gray-600' : ''}`}>Add Instructor</Link>

                </nav>
            </div>
        </div>
    )
}

export default Sidebar
