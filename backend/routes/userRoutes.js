const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- 1
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// --- 2
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`--- 登录尝试: ${username} ---`);

        const user = await User.findOne({ username });
        if (!user) {
            console.log("❌ 结果: 数据库中找不到该用户名");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔑 密码匹配结果:", isMatch);

        if (!isMatch) {
            console.log("❌ 结果: 密码错误");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3
        const secret = process.env.JWT_SECRET || 'secret_key';
        const token = jwt.sign(
            { userId: user._id },
            secret,
            { expiresIn: '1d' }
        );

        console.log("✅ 结果: 登录成功，Token 已发放");

        res.json({
            message: "Login successful!",
            token,
            username: user.username
        });
    } catch (err) {
        console.error("🔥 服务器错误:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;