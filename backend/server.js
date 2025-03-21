import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import jwt from 'jsonwebtoken';
// App Config
const app = express();
connectDB();
connectCloudinary();
const port = 4000
// Middlewares
app.use(express.json());

// CORS configuration to allow credentials (cookies)
app.use(cors({
    origin: [
        'http://localhost:5173',  // User frontend
        'http://localhost:5174',
        'https://gaberina.vercel.app',
        'https://gaberina-yrai.vercel.app'

    ],
    credentials: true, // Allow credentials (cookies) to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all necessary methods
}));

// Authentication Middleware for checking the token from Authorization header
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Get token from the 'Authorization' header (format: Bearer <token>)

    if (!token) {
        return res.status(401).json({ authenticated: false, message: "Token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ authenticated: false, message: "Invalid Token" });
        }
        req.user = user;
        next();
    });
};

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.post('/api/user/logout', (req, res) => {
    res.json({ success: true, message: "Logged out successfully" });
});

// Default endpoint
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

// Auth check endpoint (requires Authorization header)
app.get('/api/user/authCheck', authenticateJWT, (req, res) => {
    res.status(200).json({
        authenticated: true,
        user: req.user,  // Send the decoded user info back to the frontend
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

// Export the app (Required for Vercel)
export default app;
