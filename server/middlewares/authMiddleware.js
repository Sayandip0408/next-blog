const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return new Response({ message: 'Access token is missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
            return new Response({ message: 'Invalid or expired access token' }, { status: 403 });
        }
        req.user = user;
        next();
    });
};

module.exports = { authMiddleware }