const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const auth = require('../middleware/auth');

// --- 1.
router.post('/save', auth, async (req, res) => {
    try {
        const { size, initialBoard, currentBoard, difficulty, timer, isCompleted } = req.body;

        let game = await Game.findOneAndUpdate(
            { userId: req.user, difficulty: difficulty, isCompleted: false },
            {
                size,
                initialBoard,
                currentBoard,
                difficulty,
                timer,
                isCompleted
            },
            { new: true, upsert: true } 
        );

        res.json({ message: "Game saved successfully", game });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// --- 2.
router.get('/current', auth, async (req, res) => {
    try {
        const game = await Game.findOne({ userId: req.user, isCompleted: false })
                               .sort({ updatedAt: -1 });
        
        if (!game) {
            return res.status(404).json({ message: "No active game found" });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// --- 3.
router.get('/leaderboard/:difficulty', async (req, res) => {
    try {
        const { difficulty } = req.params;

        const winners = await Game.find({ 
            difficulty: difficulty, 
            isCompleted: true
        })
        .populate('userId', 'username')
        .sort({ timer: 1 })
        .limit(10);

        const leaderboard = winners.map(game => ({
            username: game.userId.username,
            timer: game.timer,
            date: game.updatedAt
        }));

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;