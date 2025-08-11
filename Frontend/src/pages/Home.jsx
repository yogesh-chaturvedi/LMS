import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import TopCourses from '../components/TopCourses'


const Home = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <TopCourses />
            <Footer />
        </div>
    )
}

export default Home
