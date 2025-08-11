import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-2 border-red-500 text-white px-28 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-4">

                {/* Left Side - Website Name & Motto */}
                <div>
                    <h2 className="text-2xl font-bold">eLearning</h2>
                    <p className="text-gray-400 mt-1 max-w-sm">
                        Empowering learners worldwide with knowledge and skills for a better future.
                    </p>
                </div>

                {/* Right Side - Contact Info */}
                <div className="mt-4 md:mt-0 text-gray-300">
                    <p>📞 +91 9876543210</p>
                    <p>📧 support@elearning.com</p>
                </div>
            </div>

            {/* Bottom - Copyright */}
            <div className="text-center text-gray-500 text-sm mt-4">
                © {new Date().getFullYear()} eLearning. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
