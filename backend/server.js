const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

const app = express();

// --- 中间件配置 ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// --- 数据库连接逻辑 (优化版) ---
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // 显式设置超时，防止在网络波动时无限挂起
            connectTimeoutMS: 10000, 
            socketTimeoutMS: 45000,
        });
        console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // 如果是密码错误，会在日志中给出明确提示
        if (err.message.includes('Authentication failed')) {
            console.error('👉 检查提示：请确认 Render 的 Environment Variables 中 MONGODB_URI 的密码是否正确。');
        }
        // 在生产环境下，如果数据库连不上，通常会让进程退出以便服务重启
        // process.exit(1); 
    }
};

// 执行连接
connectDB();

// --- API 路由 ---

// 基础健康检查接口
app.get('/api/hello', (req, res) => {
    res.send({ message: "Hello from the Sudoku Backend!" });
});

// 用户与游戏逻辑路由
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));

// --- 静态文件托管 (用于部署前端) ---

// 设置前端编译后的 build 文件夹路径
app.use(express.static(path.join(__dirname, '../frontend/build')));

// 捕获所有非 API 请求，返回 React 的 index.html
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// --- 启动服务 ---
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 Health Check: https://anqi-xu-project3-backend.onrender.com/api/hello`);
});