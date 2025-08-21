import React, { useState } from 'react'
import InstructorSidebar from '../../components/InstructorSidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const EditLecture = () => {


    const [isFree, setIsFree] = useState(false)

    // to set free video or not
    function handleChange(e) {
        if (e.target.checked === true) {
            setIsFree(true)
        }
        else {
            setIsFree(false)
        }
    }
    console.log(isFree)

    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className=' bg-gray-950 px-28 flex-1 py-10'>
                    <div className='text-white bg-black rounded-xl p-4 border border-gray-700 shadow-xl'>

                        {/* heading */}
                        <h3 className='font-bold text-2xl text-white'>Edit Lectures</h3>
                        <p className='text-gray-500'>Make changes and click save when done</p>

                        <div className='mt-5 border-2 border-black flex flex-col gap-4'>

                            <Link to='/instructor/add-lectures' className='w-[140px] text-center bg-red-600 hover:bg-red-700 text-black font-semibold rounded-lg px-2 py-2'>Remove Lecture</Link>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>

                            {/* video url */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Video</label>
                                <input className='w-72 outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="url" placeholder='Enter Video url' />
                            </div>

                            <div className="flex items-center gap-2">
                                <input onChange={handleChange} className="w-4 h-4 accent-blue-600 cursor-pointer" type="checkbox" name="checkbox" />
                                <span>is this video free</span>
                            </div>


                            {/* buttons */}
                            <div className='flex gap-2'>

                                <Link to='/instructor/my-courses' className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Update Lecture</Link>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default EditLecture
