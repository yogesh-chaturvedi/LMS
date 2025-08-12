const express = require('express')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log("DB connected Successfully")
    })
    .catch((error) => {
        console.log("DB connection fails", error)
    })