import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { CoursesContext } from '../context/CoursesContext'


const Profile = () => {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext);
    const { allCourses, setAllCourses, courseDetails, setCourseDetails, isEdit, setIsEdit, lectureName, setLectureName, getData, getInstructorInfo, instuctorDetails, setInstuctorDetails } = useContext(CoursesContext);


    // to toggle edit btn
    const [editMode, setEditMode] = useState(false)
    // console.log(editMode)

    const [purchasedCourses, setPurchasedCourses] = useState([])

    // to store new or edited data by the user
    const [newData, setnewData] = useState({
        name: '',
        email: '',
        imageUrl: '',
    })


    function handleChange(e) {
        setnewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    // console.log(newData)

    // to edit user info
    async function handleEdit(userId) {

        if (newData.name === "" || newData.email === "") {
            console.log("fields are empty")
            return;
        }

        try {
            const response = await axios({
                method: 'put',
                url: `${BASE_URL}user/edit/${userId}`,
                data: { newData },
                withCredentials: true
            })
            const { message, success, user } = response.data;
            if (success) {
                toast(message, {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setnewData({ name: '', email: '', imageUrl: '' });
                setEditMode(false);
                fetchUser()
            }
        }
        catch (error) {
            console.log("there is an erroe", error)
        }
    }


    // to get purchased courses
    useEffect(() => {
        async function getCourses() {
            try {
                const resposne = await axios({
                    method: 'get',
                    url: `${BASE_URL}course/get-purchasedCourses`,
                    withCredentials: true
                })
                const { message, success, purchasedCourse } = resposne.data;
                if (success) {
                    console.log(message)
                    setPurchasedCourses(purchasedCourse)
                }
            }
            catch (error) {
                console.log('there is an error', error)
            }
        }
        getCourses()
    }, [])



    // to get instructors details 
    useEffect(() => {
        allCourses.forEach((courses) => {
            getInstructorInfo(courses.instructor)
        })
    }, [allCourses])

    return (
        <div>

            {/* <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" /> */}

            <Navbar />

            <div className='bg-gray-50 px-28 flex flex-col gap-3 justify-center h-[91vh]'>

                {/* user info */}
                <div className="p-6">
                    {/* Heading */}
                    <h1 className="text-2xl text-black font-bold mb-3">Profile</h1>

                    {/* Profile Card */}
                    <div className="flex bg-gray-100 items-center gap-6 p-6 shadow-md rounded-2xl">
                        {/* User Image */}
                        <img src={user.profileImage} alt="profile-Image" className="w-24 h-24 rounded-full border border-gray-300 object-cover" />

                        {/* User Info */}
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-black">{user.name}</h2>
                            <p className="text-black">{user.email}</p>
                            <p className="text-sm text-black mt-1">Role: {user.role}</p>
                        </div>



                        {/* Popup Modal */}
                        {editMode && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-gray-950 rounded-2xl shadow-lg p-6 w-96 relative">
                                    <h2 className="text-xl text-white font-bold mb-4">Edit Profile</h2>

                                    {/* Example form (you can customize fields later) */}
                                    {/* name */}
                                    <input value={newData.name} onChange={handleChange} name='name' type="text" placeholder="Enter name" className="w-full rounded-md border p-2  mb-3" />
                                    {/* email */}
                                    <input value={newData.email} onChange={handleChange} name='email' type="email" placeholder="Enter email" className="w-full border p-2 rounded-md mb-3" />
                                    {/* role */}
                                    <input value={newData.imageUrl} onChange={handleChange} name='imageUrl' type="url" placeholder="Enter image url" className="w-full border p-2 rounded-md mb-3" />

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-4">

                                        <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>

                                        <button onClick={() => handleEdit(user.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >Done</button>

                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Edit Profile Button */}
                        <button onClick={() => setEditMode(true)} className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Edit Profile</button>
                    </div>
                </div>

                {/* cards */}
                {user.role !== 'admin' ? (<div className='p-6'>
                    {user.role === "user" ? (<div>
                        <h1 className="text-2xl text-black font-bold mb-3">Courses you are enrolled in</h1>
                        {purchasedCourses.length > 0 ? (<div className="flex flex-wrap gap-6 py-2">
                            {purchasedCourses.map((course, index) => {
                                const instructor = instuctorDetails[course.instructor];

                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition w-72"
                                    >
                                        <img
                                            src={course.thumbnail}
                                            alt="courseThumbnail"
                                            className="w-full h-44 object-cover"
                                        />

                                        <div className="px-4 py-3 flex flex-col gap-2">
                                            {/* Title */}
                                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                                {course.title}
                                            </h3>

                                            {/* Instructor + Level */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {instructor ? instructor.name : "Loading..."}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold">
                                                    {course.level}
                                                </span>
                                            </div>

                                            {/* Price + Button */}
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-lg font-bold text-gray-800">
                                                    ₹{course.price}
                                                </span>
                                                <Link
                                                    to={`/course-details/${course._id}`}
                                                    state={course}
                                                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        ) : (<div className='text-2xl font-bold text-gray-100'>Buy Some Courses</div>)}

                    </div>) : (<div>
                        <h1 className="text-2xl text-black font-bold mb-3">Your Courses</h1>

                        <div className="flex flex-wrap gap-6 py-2">
                            {allCourses
                                .filter((course) => course.instructor === user.id)
                                .map((course, index) => {
                                    const instructor = instuctorDetails[course.instructor];

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition w-72"
                                        >
                                            <img
                                                src={course.thumbnail}
                                                alt="courseThumbnail"
                                                className="w-full h-44 object-cover"
                                            />

                                            <div className="px-4 py-3 flex flex-col gap-2">
                                                {/* Title */}
                                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                                                    {course.title}
                                                </h3>

                                                {/* Instructor + Level */}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        {instructor ? instructor.name : "Loading..."}
                                                    </span>
                                                    <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold">
                                                        {course.level}
                                                    </span>
                                                </div>

                                                {/* Price + Button */}
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-lg font-bold text-gray-800">
                                                        ₹{course.price}
                                                    </span>
                                                    <Link
                                                        to={`/course-details/${course._id}`}
                                                        state={course}
                                                        className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    )}

                </div>) : ''}

            </div>
            <Footer />
        </div>
    )
}

export default Profile
