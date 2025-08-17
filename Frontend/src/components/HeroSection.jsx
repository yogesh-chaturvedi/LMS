import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {


  const navigate = useNavigate();

  // it naviagte to all courses page
  function openCourses() {
    navigate('/course')
  }



  return (
    <section className="text-center border-2 border-red-500 px-28 py-16 bg-gray-50">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-gray-800">Learn Without Limits</h1>

      {/* Mini Title */}
      <p className="text-lg text-gray-500 mt-2">
        Expand your knowledge with our expert-led courses.
      </p>

      {/* Search Bar */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for courses..."
          className="px-4 py-2 w-72 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* Explore Button */}
      <button onClick={openCourses} className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Explore Courses
      </button>
    </section>
  )
}

export default HeroSection
