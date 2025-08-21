import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InstructorSidebar from '../../components/InstructorSidebar'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPen } from 'lucide-react';

const MyCourses = () => {
    const courses = [
        { title: "Redux Advanced Course", price: "Rs.1000", status: "Published" },
        { title: "Next.js Complete Guide", price: "Rs.1500", status: "Unpublished" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics", price: "Rs.800", status: "Published" },
        { title: "React Basics kjcndknckdsncdjcodscoidscdslcmdslcmdslcmdslocmdslkcmdsklcmknckjnc", price: "Rs.800", status: "Published" },
    ];

    return (
        <div>
            <Navbar />

            <div className='flex border-2 border-black'>

                {/* sidebar */}
                <InstructorSidebar />

                {/* right */}
                <div className="flex-1 pl-2 pr-28 overflow-auto h-[90vh] py-8">

                    <div className="border rounded-lg overflow-hidden">
                        {/* Heading Row */}
                        <div className="flex justify-between bg-gray-100 px-4 py-3 font-bold text-lg">
                            <p className="w-1/3">Title</p>
                            <p className="w-1/6 text-center">Price</p>
                            <p className="w-1/6 text-center">Status</p>
                            <p className="w-1/6 text-center">Action</p>
                        </div>

                        {/* Data Rows */}
                        <div className="divide-y">
                            {courses.map((course, index) => (
                                <div key={index} className="flex justify-between items-center px-4 py-3">
                                    {/* Title */}
                                    <p className="w-1/3 font-medium truncate">{course.title}</p>

                                    {/* Price */}
                                    <p className="w-1/6 text-center font-semibold">{course.price}</p>

                                    {/* Status */}
                                    <p
                                        className={`w-1/6 text-center font-semibold ${course.status === "Published"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {course.status}
                                    </p>

                                    {/* Action */}
                                    <div className="w-1/6 text-center flex items-center justify-center gap-2 text-blue-600 cursor-pointer hover:underline">
                                        <UserPen size={18} />
                                        <span>Edit</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default MyCourses
