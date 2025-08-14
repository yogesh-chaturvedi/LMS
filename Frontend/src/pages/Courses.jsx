import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Courses = () => {

    const categories = ["Web Development", "Data Science", "Design", "Marketing"];

    const [Filter, setFilter] = useState([]);

    

    return (
        <div>
            <Navbar />
            <div className='border-2 border-black'>
                <h1 className="text-2xl font-bold pb-2">Filter Options</h1>
                <div className="bg-white border-2 border-black rounded-lg max-w-xs">
                    <h2 className="text-lg font-bold mb-3">Categories</h2>
                    <div className="space-y-2">
                        {categories.map((category, index) => (
                            <label key={index} className="flex items-center gap-2 cursor-pointer">
                                <input onChange={()=>{}} type="checkbox" className="w-4 h-4" />
                                <span>{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Courses
