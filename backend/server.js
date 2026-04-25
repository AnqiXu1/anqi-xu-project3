const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {

            connectTimeoutMS: 10000, 
            socketTimeoutMS: 45000,
        });
        console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        if (err.message.includes('Authentication failed')) {
            console.error('👉 检查提示：请确认 Render 的 Environment Variables 中 MONGODB_URI 的密码是否正确。');
        }
        
    }
};


connectDB();


app.get('/api/hello', (req, res) => {
    res.send({ message: "Hello from the Sudoku Backend!" });
});


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 Health Check: https://anqi-xu-project3-backend.onrender.com/api/hello`);
});