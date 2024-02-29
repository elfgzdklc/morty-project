const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor.', status: 'error' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userCount = await User.countDocuments();

        const newUser = new User({ userId: (userCount + 1).toString(), username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'İşlem Başarılı', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'İşlem Başarısız', status: 'error', error: error.message });
    }
});

router.delete('/users', authMiddleware, async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: 'Tüm kullanıcılar başarıyla silindi', status: 'success' });
    } catch (error) {
        res.status(500).json({ message: 'Kullanıcıları silme işlemi başarısız oldu', status: 'error', error: error.message });
    }
});

router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 'success', users: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı', status: 'error' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Hatalı şifre', status: 'error' });
        }

        const payload = { username: user.username, userId: user.userId };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // Token süresi 1 saat
        res.json({ token: accessToken, username: user.username, userId: user.userId });
    } catch (error) {
        res.status(500).json({ message: 'İşlem Başarısız', status: 'error', error: error.message });
    }
});
module.exports = router;
