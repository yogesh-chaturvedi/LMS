import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'

const Courses = () => {

    const categories = ["Web Development", "Data Science", "Design", "Marketing"];

    const [Filter, setFilter] = useState([]);


    function handleChange(category) {
        setFilter((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        )
    }
    console.log(Filter);


    return (
        <div>
            <Navbar />

            <div className='flex gap-4 px-28 py-12'>
                {/* left  */}
                <div className='w-[20%]'>
                    <h1 className="text-2xl font-bold pb-2 border-black border-b-2">Filter Options</h1>
                    <div className="bg-white rounded-lg max-w-xs">
                        <h2 className="text-lg font-bold mt-2 mb-1">Categories</h2>
                        <div className="space-y-2">
                            {categories.map((category, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer">
                                    <input onChange={() => handleChange(category)} checked={Filter.includes(category)} type="checkbox" className="w-4 h-4" />
                                    <span>{category}</span> 
                                </label>
                            ))}
                        </div>
                    </div>
                </div>


                {/* right */}
                <div className='flex flex-col gap-6 w-full'>

                    <div className="flex gap-4 border border-gray-300 rounded-xl shadow-lg p-4 bg-white w-full h-[160p]">
                        {/* Image (Left) */}
                        <img src={assets.mern} alt="course thumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                        {/* Content (Right) */}
                        <div className="flex flex-col ">
                            {/* Title */}
                            <h2 className="font-bold text-xl text-gray-800">Mastering Docker – A Complete Guide</h2>

                            {/* Description */}
                            <p className="text-sm text-gray-600">Learn how to build, ship, and run applications with Docker containers.</p>

                            {/* Instructor */}
                            <p className="text-gray-700">Instructor: <span className="font-semibold">Yogesh Chaturvedi</span></p>

                            {/* Level */}
                            <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">Advanced</span>
                        </div>
                    </div>


                    <div className="flex gap-4 border border-gray-300 rounded-xl shadow-lg p-4 bg-white w-full h-[160p]">
                        {/* Image (Left) */}
                        <img src={assets.mern} alt="course thumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                        {/* Content (Right) */}
                        <div className="flex flex-col ">
                            {/* Title */}
                            <h2 className="font-bold text-xl text-gray-800">Mastering Docker – A Complete Guide</h2>

                            {/* Description */}
                            <p className="text-sm text-gray-600">Learn how to build, ship, and run applications with Docker containers.</p>

                            {/* Instructor */}
                            <p className="text-gray-700">Instructor: <span className="font-semibold">Yogesh Chaturvedi</span></p>

                            {/* Level */}
                            <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">Advanced</span>
                        </div>
                    </div>


                    <div className="flex gap-4 border border-gray-300 rounded-xl shadow-lg p-4 bg-white w-full h-[160p]">
                        {/* Image (Left) */}
                        <img src={assets.mern} alt="course thumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                        {/* Content (Right) */}
                        <div className="flex flex-col ">
                            {/* Title */}
                            <h2 className="font-bold text-xl text-gray-800">Mastering Docker – A Complete Guide</h2>

                            {/* Description */}
                            <p className="text-sm text-gray-600">Learn how to build, ship, and run applications with Docker containers.</p>

                            {/* Instructor */}
                            <p className="text-gray-700">Instructor: <span className="font-semibold">Yogesh Chaturvedi</span></p>

                            {/* Level */}
                            <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">Advanced</span>
                        </div>
                    </div>


                    <div className="flex gap-4 border border-gray-300 rounded-xl shadow-lg p-4 bg-white w-full h-[160p]">
                        {/* Image (Left) */}
                        <img src={assets.mern} alt="course thumbnail" className="w-48 h-32 object-cover rounded-lg shadow-md" />

                        {/* Content (Right) */}
                        <div className="flex flex-col ">
                            {/* Title */}
                            <h2 className="font-bold text-xl text-gray-800">Mastering Docker – A Complete Guide</h2>

                            {/* Description */}
                            <p className="text-sm text-gray-600">Learn how to build, ship, and run applications with Docker containers.</p>

                            {/* Instructor */}
                            <p className="text-gray-700">Instructor: <span className="font-semibold">Yogesh Chaturvedi</span></p>

                            {/* Level */}
                            <span className="inline-block px-2 text-sm rounded-md bg-red-500 text-white w-fit">Advanced</span>
                        </div>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Courses
