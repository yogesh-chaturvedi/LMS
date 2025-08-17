import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const DashboardHome = () => {

    const sideMenue = ['Dashboard', 'Add Instructor']

    return (
        <div>
            <Navbar />
            <div className='flex justify-between border-2 border-x-pink-800'>

                {/* sidebar */}
                <div className="h-screen w-56 bg-gray-900 text-white flex flex-col p-4">
                    <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

                    <nav className="flex flex-col gap-4">

                        <Link to="/admin/dashboard" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">Dashboard</Link>

                        <Link to="/admin/add-instructor" className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">Add Instructor</Link>
                    </nav>
                </div>


                <div>
                    <p>dashboard</p>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default DashboardHome
