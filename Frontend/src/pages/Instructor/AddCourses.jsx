import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InstructorSidebar from '../../components/InstructorSidebar'
import { Link, useNavigate } from 'react-router-dom'

const AddCourses = () => {


    const [selected, setSelected] = useState('');
    const navigate = useNavigate();


    function handleChange(e) {
        setSelected(e.target.value);
    }
    // console.log(selected)


    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className=' bg-gray-950 px-28 flex-1 py-10'>
                    <div className='text-white bg-black rounded-xl p-4 border border-gray-700 shadow-xl'>
                        {/* heading */}
                        <h3 className='font-bold text-2xl text-white'>
                            Lets Add some basic details of your course
                        </h3>

                        <div className='mt-5 border-2 border-black flex flex-col gap-4'>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>

                            {/*sub-title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Subtitle</label>
                                <input className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Subtitle of your course' />
                            </div>

                            {/* category and level */}
                            <div className='flex gap-5'>
                                {/* category */}
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-xl'>Category</label>
                                    <select value={selected} onChange={handleChange} className='w-40 border-2 border-gray-500 outline-none bg-black text-white rounded-md ' name="category" id="category">
                                        <option value="">Select a Category</option>
                                        <option value="webdev">Web Development</option>
                                        <option value="datascience">Data Science</option>
                                        <option value="Docker">Docker</option>
                                        <option value="devops">DevOps</option>
                                    </select>
                                </div>

                                {/* level */}
                                <div className='flex flex-col gap-1'>
                                    <label className='font-semibold text-xl'>Level</label>
                                    <select className='w-32 border-2 border-gray-500 outline-none bg-black text-white rounded-md ' name="level" id="level">
                                        <option value="">Select a Level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="medium">Medium</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            {/* price */}
                            <div className='flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>Price</label>
                                <input className='w-40 border-2 border-gray-500 rounded-lg px-2 outline-none bg-black text-white' type="number" placeholder='Enter Price' />
                            </div>

                            {/* description */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Course Description</label>
                                <input className='outline-none border-2 border-gray-500 rounded-md px-2 bg-black text-white' type="text" placeholder='Enter description of your course' />
                            </div>

                            {/*thumbnail url*/}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Course Thumbnail</label>
                                <input className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="url" placeholder='Enter Thumbnail of your course' />
                            </div>

                            {/* buttons */}
                            <div className='flex gap-2'>
                                <button className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Clear</button>

                                <Link to='/instructor/add-lectures' className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Create</Link>
                                
                            </div>

                        </div>

                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}

export default AddCourses
