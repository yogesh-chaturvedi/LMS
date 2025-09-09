import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { CoursesContext } from '../context/CoursesContext';
import axios from 'axios';

const HeroSection = () => {

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName } = useContext(CoursesContext);

  const navigate = useNavigate();

  // it naviagte to all courses page
  function openCourses() {
    navigate('/course')
  }

  const [searchedText, setSearchedText] = useState("");
  console.log(searchedText);

  function handleChange(e) {
    setSearchedText(e.target.value)
  }


  async function handleSearch(searchedText) {
    if (searchedText === '') {
      toast('Search Soemthing', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}course/search/?q=${searchedText}`,
      })

      const { message, success, searchedCourses } = response.data;
      if (success) {
        console.log(message);
        navigate('/course');
        setAllCourses(searchedCourses)
      }

    }
    catch (error) {
      console.log("there is an error", error)
    }
  }

  // search by pressing enter key
  function funcSearch(e) {
    console.log(e)
    if (e.key === "Enter") {
      handleSearch(searchedText)
    }
  }


  return (
    <section className="bg-gray-100 text-center px-28 py-16">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-gray-800">Learn Without Limits</h1>

      {/* Mini Title */}
      <p className="text-lg text-gray-600 mt-2">
        Expand your knowledge with our expert-led courses.
      </p>

      {/* Search Bar */}
      <div className="mt-6 flex justify-center">
        <input
          value={searchedText}
          onChange={handleChange}
          onKeyDown={funcSearch}
          type="text"
          placeholder="Search for courses..."
          className="px-4 py-2 w-72 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 text-gray-700"
        />
        <button
          onClick={() => handleSearch(searchedText)}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Explore Button */}
      <button
        onClick={openCourses}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Explore Courses
      </button>
    </section>

  )
}

export default HeroSection
