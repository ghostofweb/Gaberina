import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
        
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Not Authorized, no token provided',
            });
        }

        // Verify the token using JWT
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Validate the email and password from the token payload
        if (
            token_decode.email !== process.env.ADMIN_EMAIL ||
            token_decode.password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Token',
            });
        }

        // If token is valid, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error in Admin Auth:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};

export default adminAuth;
