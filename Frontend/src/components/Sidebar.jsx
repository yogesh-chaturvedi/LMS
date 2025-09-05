import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const loaction = useLocation();

    return (
        <div className="w-56 bg-blue-500 text-white text-center flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

            <nav className="flex flex-col gap-4">

                <Link to="/admin/dashboard" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition ${loaction.pathname === "/admin/dashboard" ? 'bg-gray-600' : ''}`}>Dashboard</Link>

                <Link to="/admin/courses" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/courses" ? 'bg-gray-600' : ''}`}>Courses</Link>

                <Link to="/admin/users" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/users" ? 'bg-gray-600' : ''}`}>Users</Link>

                <Link to="/admin/add-instructor" className={`px-4 py-2 rounded-lg hover:bg-gray-700 transition  ${loaction.pathname === "/admin/add-instructor" ? 'bg-gray-600' : ''}`}>Add Instructor</Link>

            </nav>
        </div>
    )
}

export default Sidebar
