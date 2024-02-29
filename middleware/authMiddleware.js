
const jwt = require('jsonwebtoken');

const secretKey = 'RickAndMortyProject';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme hatası: Token bulunamadı.' });
    }

    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Yetkilendirme hatası: Geçersiz token.' });
        }
        req.user = decodedToken;
        next();
    });
};

module.exports = authMiddleware;
