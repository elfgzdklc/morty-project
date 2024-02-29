const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/favorites/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const favorites = await Favorite.find({ userId });

        if (!favorites) {
            return res.status(404).json({ success: false, message: 'Kullanıcının favori karakterleri bulunamadı' });
        }
        res.status(200).json({ success: true, favorites });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/favorites', authMiddleware, async (req, res) => {
    try {
        const favorites = await Favorite.find();
        res.status(200).json({ status: 'success', favorites: favorites });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/check-favorite/:userId/:characterId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const characterId = req.params.characterId;
        const favorite = await Favorite.findOne({ userId: userId, characterId: characterId });

        const isFavorite = !!favorite;

        res.json({ isFavorite });
    } catch (error) {
        res.status(500).json({ message: 'Favori durumu kontrol edilirken bir hata oluştu.', error: error.message });
    }
});

router.post('/:userId/favorite-characters/:characterId', authMiddleware, async (req, res) => {
    try {
        const favoriteCharacter = new Favorite({
            userId: req.params.userId,
            characterId: req.params.characterId,
            detail: req.body.details,
        });
        await favoriteCharacter.save();
        res.status(201).json({ message: 'Karakter favorilere eklndi.', status: 'success', data: favoriteCharacter });
    } catch (err) {
        res.status(500).json({ message: 'Karakter favorilere eklenemedi', status: 'error', error: error.message });
    }
});

router.delete('/:userId/favorite-characters/:characterId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const characterId = req.params.characterId;

        const favorite = await Favorite.findOne({ userId: userId, characterId: characterId });

        if (!favorite) {
            return res.status(404).json({ message: 'Karakter favorilerde bulunamadı.', status: 'error' });
        }

        await favorite.deleteOne();

        res.status(200).json({ message: 'Karakter favorilerden çıkarıldı.', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Listden çıkarma işlemi başarısız.', status: 'error', error: error.message });
    }
});

router.delete('/favorites', authMiddleware, async (req, res) => {
    try {
        await Favorite.deleteMany({});
        res.status(200).json({ message: 'Tüm favori dataları başarıyla silindi', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Tüm favori datalarını silme işlemi başarısız oldu', status: 'error', error: error.message });
    }
});
module.exports = router;
