const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    size: {
        type: Number,
        required: true,
        enum: [6, 9], 
        default: 9
    },
    initialBoard: {
        type: [[Number]], 
        required: true
    },
    currentBoard: {
        type: [[Number]],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Hard'],
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    timer: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Game', GameSchema);