const express = require('express')
const varifyUser = require('../middleware/varifyUser')
const router = express.Router()


router.post('/outline', varifyUser, async (req, res) => {
    try {
        const { category, level, title, subTitle } = req.body;

        if (req.user.role === 'instructor') {

            const prompt = ` Generate a professional course description of 3-4 lines , 5 key takeaways, and 3 prerequisites for an online course.
     Title: ${title}
     Subtitle: ${subTitle}"
     Level:${level}
     Category: ${category}`

            const { GoogleGenAI } = await import('@google/genai');

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const result = await ai.models.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: prompt,
            });

            const text = result.text.trim();
            // console.log(text)

            res.status(200).json({ message: 'Ai generated outline', success: true, answer: text })
        }
        else {
            return res.status(400).json({ message: 'You are not authorized', success: false });
        }
    }
    catch (error) {
        console.error("error", error)
        res.status(400).json({ message: 'something went wrong', success: false, error })
    }
})

module.exports = router