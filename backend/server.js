const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Default route to serve home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'home.html'));
});

// Destination data for the backend
const destinations = [
    { name: "Paris", country: "France", description: "Paris is renowned for its iconic and picturesque streets, each offering a unique glimpse into the city's rich history.", image: "paris.jpg" },
    { name: "Huayna Potosi", country: "Bolivia", description: "Huayna Potosí is one of Bolivia's most accessible and popular mountains, known for its stunning views.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRqys0LzcIiIZqNQEFRZ5rHSM1fGbr7F2TAg&s" },
    { name: "New York", country: "USA", description: "New York City is a dynamic hub of culture, art, and diversity. From iconic landmarks like the Statue of Liberty.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCHAfKvij7MF2X7KyBwaGkwNCtUZK85dElA&s" },
    { name: "Tokyo", country: "Japan", description: "Tokyo offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80" },
    { name: "Rome", country: "Italy", description: "Rome is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome.", image: "Rome.jpg" },
    { name: "Sydney", country: "Australia", description: "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harbourfront Sydney Opera House.", image: "sydney.jpg" },
    { name: "Bali", country: "Indonesia", description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.", image: "bali.jpg" },
    { name: "Machu Picchu", country: "Peru", description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.", image: "manchupicchu.jpg" },
    { name: "Dubai", country: "UAE", description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80" },
    { name: "Cape Town", country: "South Africa", description: "Cape Town is a port city on South Africa’s southwest coast, on a peninsula beneath the imposing Table Mountain.", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80" },
    { name: "London", country: "UK", description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times.", image: "https://images.unsplash.com/photo-1513635269975-59693e2d8ce2?w=500&q=80" },
    { name: "Taj Mahal", country: "India", description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra.", image: "tajmahal.jpg" },
    { name: "Cairo", country: "Egypt", description: "Cairo, Egypt’s sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum.", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=500&q=80" },
    { name: "Maldives", country: "Maldives", description: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands.", image: "beach(dest).jpg" },
    { name: "Santorini", country: "Greece", description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, shaping its rugged landscape.", image: "europe.jpg" }
];

// Backend API endpoint for searching destinations
app.get('/api/destinations', (req, res) => {
    const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';
    
    if (!searchQuery) {
        return res.json(destinations.slice(0, 3)); // Return top 3 by default
    }

    const filtered = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery) || 
        dest.country.toLowerCase().includes(searchQuery)
    );

    res.json(filtered);
});

// Backend API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    try {
        // Create a transporter using your Gmail account
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'nagaroopasri3@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: 'nagaroopasri3@gmail.com', // Destination email (the user's email)
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

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
