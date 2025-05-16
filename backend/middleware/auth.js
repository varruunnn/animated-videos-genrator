const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const tokenn = req.headers['authorization'];
    console.log('Token:', tokenn);
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('TokenEdited:', token);
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
}