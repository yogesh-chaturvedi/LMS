import React from 'react'
import InstructorSidebar from '../../components/InstructorSidebar'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'

const AddLectures = () => {
    const navigate = useNavigate()

    let lectures = [
        {
            id: 1,
            topic: "lecture 1 - introduction to redux"
        },
        {
            id: 2,
            topic: "lecture 2 - introduction to redux"
        },
        {
            id: 3,
            topic: "lecture 3 - introduction to redux"
        },
        {
            id: 4,
            topic: "lecture 4 - introduction to redux"
        },
        {
            id: 5,
            topic: "lecture 5 - introduction to redux"
        },
        {
            id: 6,
            topic: "lecture 6 - introduction to redux"
        },
    ]


    function handleClick(id) {
        navigate(`/instructor/edit-lectures/${id}`)
        console.log(id)
    }


    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                <div className=' bg-gray-950 px-28 flex-1 py-10'>
                    <div className='text-white bg-black rounded-xl p-4 border border-gray-700 shadow-xl'>
                        {/* heading */}
                        
                        <h3 className='font-bold text-2xl text-white'>Add some lectures for your course</h3>

                        <div className='mt-5 border-2 border-black flex flex-col gap-4'>

                            {/* title */}
                            <div className='flex flex-col'>
                                <label className='font-semibold text-lg'>Title</label>
                                <input className='outline-none text-white bg-black border-2 border-gray-500 rounded-md px-2' type="text" placeholder='Enter Title of your course' />
                            </div>


                            {/* buttons */}
                            <div className='flex gap-2'>

                                <Link to='/instructor/add-lectures' className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Back to course</Link>

                                <Link to='/instructor/my-courses' className='bg-white hover:bg-slate-300 text-black font-semibold rounded-lg px-2 py-1'>Create lecture</Link>

                            </div>

                            {/* lectures */}
                            <div className='flex flex-col gap-3'>
                                {lectures.map((lecture, index) => {
                                    return <div key={index}>
                                        <p onClick={() => handleClick(lecture.id)} className='font-semibold rounded-lg px-2 py-1 bg-gray-700'>{lecture.topic}</p>
                                    </div>

                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AddLectures
