const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Destination data for the backend
const destinations = [
    { name: "Paris", country: "France", description: "Paris is renowned for its iconic and picturesque streets...", image: "paris.jpg" },
    { name: "Huayna Potosi", country: "Bolivia", description: "Huayna Potosí is one of Bolivia's most accessible...", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRqys0LzcIiIZqNQEFRZ5rHSM1fGbr7F2TAg&s" },
    { name: "New York", country: "USA", description: "New York City is a dynamic hub...", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCHAfKvij7MF2X7KyBwaGkwNCtUZK85dElA&s" }
    // Abbreviated for function brevity since frontend currently hardcodes destination logic or isn't fully using this yet.
];

router.get('/destinations', (req, res) => {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';
    if (!searchQuery) return res.json(destinations.slice(0, 3));
    const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery) || dest.country.toLowerCase().includes(searchQuery)
    );
    res.json(filtered);
});

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'nagaroopasri3@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'nagaroopasri3@gmail.com',
            subject: `New Travel Blog Contact Message from ${name}`,
            text: `You have received a new message from your Travel Blog contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please check server logs.' });
    }
});

// Mount the router on both paths to support local testing and Netlify Functions
app.use('/api', router);
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
