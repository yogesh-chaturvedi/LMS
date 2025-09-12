import React from 'react'
import Navbar from '../../components/Navbar'
import InstructorSidebar from '../../components/InstructorSidebar'
import Footer from '../../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';

const CourseOutline = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { courseId } = useParams()
    const location = useLocation()
    const course = location.state || null

    const [Loading, setLoading] = useState(false)

    console.log('course', course)

    const [courseOutlines, setCourseOutlines] = useState({
        description: '',
        takeaways: '',
        prerequisites: ''
    })
    console.log(courseOutlines)


    function handleOnchange(e) {
        setCourseOutlines((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    // function to saperate things 
    function parseAIAnswer(answer) {
        const descriptionMatch = answer.match(/\*\*Course Description:\*\*([\s\S]*?)(?=\*\*Key Takeaways:|\*\*Prerequisites:|$)/i);
        const takeawaysMatch = answer.match(/\*\*Key Takeaways:\*\*([\s\S]*?)(?=\*\*Prerequisites:|$)/i);
        const prerequisitesMatch = answer.match(/\*\*Prerequisites:\*\*([\s\S]*)/i);

        // clean function for textareas
        const cleanText = (text) => {
            if (!text) return "";
            return text
                .replace(/\*\*/g, "")         // remove bold markers
                .replace(/^\s*[-*•]\s?/gm, "• ") // normalize list markers
                .replace(/\n{2,}/g, "\n")     // collapse multiple newlines
                .trim();
        };

        return {
            description: descriptionMatch ? descriptionMatch[1].trim() : "",
            takeaways: cleanText(takeawaysMatch ? takeawaysMatch[1].trim() : ""),
            prerequisites: cleanText(prerequisitesMatch ? prerequisitesMatch[1].trim() : "")
        };
    }


    async function callingGemini(category, level, title, subTitle) {
        try {
            setLoading(true)
            const response = await axios({
                method: 'post',
                url: `${BASE_URL}courseCreation/outline`,
                data: { category, level, title, subTitle },
                withCredentials: true
            })

            const { message, success, answer } = response.data;

            if (success) {
                console.log(message)
                const parsed = parseAIAnswer(answer)
                console.log(answer)
                setCourseOutlines(parsed)
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
        finally {
            setLoading(false)
        }
    }


    async function handleNext(courseId) {
        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}course/outline/${courseId}`,
                data: courseOutlines,
                withCredentials: true
            })

            const { message, success } = response.data;
            if (success) {
                console.log(message);

                toast(message, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

                setTimeout(() => {
                    navigate(`/instructor/add-lectures/${courseId}`)
                }, 1000);
            }
        }
        catch (error) {
            console.log("there is an error", error)
        }
    }




    return (
        <div>

            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <Navbar />

            <div className='flex'>

                {/* left sidebar */}
                <InstructorSidebar />

                {/* right */}
                <div className="border-2 border-red-500 flex-1 px-28 py-6 flex flex-col space-y-6 bg-gray-50">

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            ✨ AI Co-Pilot Suggestions
                        </h1>
                        <p className="text-gray-600 text-sm mt-2">
                            We’ve generated a draft using <span className="font-semibold">Gemini AI</span>.
                            You can edit or rewrite any part before continuing.
                        </p>
                    </div>


                    {/* use ai btn  */}
                    <button onClick={() => callingGemini(course.category, course.level, course.title, course.subTitle)} className="w-[195px] text-center flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">{Loading !== true ? (<span>⚡ Generate with AI</span>) : (<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>)}</button>


                    {/* Editable fields */}
                    <div className="flex flex-col space-y-4">
                        {/* Description */}
                        <div className="flex flex-col space-y-2">

                            <label htmlFor="description" className="font-medium text-gray-700">📖 Course Description</label>

                            <textarea value={courseOutlines.description} onChange={handleOnchange} id="description" name="description" rows={3} className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" placeholder="Edit the AI-generated course description..." />
                        </div>

                        {/* Key Takeaways */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="takeaways" className="font-medium text-gray-700">🎯 Key Takeaways</label>
                            <textarea value={courseOutlines.takeaways} onChange={handleOnchange} id="takeaways" name="takeaways" rows={3} className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" placeholder="Edit the AI-generated key takeaways..." />
                        </div>

                        {/* Prerequisites */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="prerequisites" className="font-medium text-gray-700">📌 Prerequisites </label>
                            <textarea value={courseOutlines.prerequisites} onChange={handleOnchange} id="prerequisites" name="prerequisites" rows={3} className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none" placeholder="Edit the AI-generated prerequisites..." />
                        </div>
                    </div>

                    {/* next button */}
                    <div className="flex justify-end mt-6">
                        <button onClick={() => handleNext(courseId)} type="button" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">NEXT →</button>
                    </div>
                </div>


            </div>

            <Footer />
        </div>
    )
}

export default CourseOutline
