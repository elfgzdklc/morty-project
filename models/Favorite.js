const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const favoriteSchema = new mongoose.Schema({
    favoriteId: { type: String, unique: true, default: uuidv4 },
    userId: { type: Number, required: true },
    characterId: { type: Number, required: true },
    detail: { type: Object }, 
    created: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
