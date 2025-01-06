import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1]; // Get token from "Bearer <token>"

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Not Authorized, no token provided'
            });
        }

        // Verify the token using JWT
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token matches the expected admin email and password combination
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Token'
            });
        }

        // If everything is fine, proceed to the next middleware or route handler
        next();
    
    } catch (error) {
        console.log('Error in Admin Auth:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

export default adminAuth;
