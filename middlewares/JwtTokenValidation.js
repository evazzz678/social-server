const jwt = require('jsonwebtoken');


function JwtTokenValidation(req, res ,next) {

    console.log(req.header);
    
    const token = req.header('Authorization')?.split(' ')[1];



    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify token
        const verified = jwt.verify(token, "123");
        req.user = verified;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}

module.exports = JwtTokenValidation;