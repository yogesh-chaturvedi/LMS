import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'

const DashboardHome = () => {

    const sideMenue = ['Dashboard', 'Add Instructor']

    return (
        <div>
            <Navbar />
            <div className='flex border-2 border-pink-800 h-[90vh]'>

                {/* sidebar */}
                <Sidebar />

                {/* right */}
                {/* flex-1 for remaining width */}
                <div className='flex flex-1 py-12 border-2 w-full border-orange-600 '>

                    <div className='mx-auto w-[80%] flex flex-col gap-10'>
                        <div className='flex gap-10 '>
                            {/* box1 */}
                            <div className='border-2 border-red-700 rounded-xl h-28 bg-gray-700 p-4 py-5'>
                                <h3 className='font-bold text-2xl'>Total Sale</h3>
                                <p className='font-bold text-xl'>3</p>
                            </div>

                            {/* box2 */}
                            <div className='border-2 border-red-700 rounded-xl h-28 bg-gray-700 p-4 py-5'>
                                <h3 className='font-bold text-2xl'>Total Revenue</h3>
                                <p className='font-bold text-xl'>Rs.1300</p>
                            </div>
                        </div>


                        <div className=' border-2 border-red-600 rounded-xl bg-gray-700 h-72'></div>
                    </div>


                </div>

            </div>
            <Footer />
        </div>
    )
}

export default DashboardHome
