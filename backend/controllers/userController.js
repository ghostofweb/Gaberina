import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';

// Helper function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "30d" });
};

// User Login Route
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email Format",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
        }
        

        const token = createToken(user._id);

        // Send token to frontend (localStorage will handle storage on the client)
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

        console.log('User Logged In:', user.name);

    } catch (error) {
        console.error('Error in Logging User', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

// User Registration Route
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email Format'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password should be at least 8 characters'
            });
        }

        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        // Send token to frontend (localStorage will handle storage on the client)
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

        console.log('User Registered:', user.name);

    } catch (error) {
        console.error('Error in Registering User:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

// Admin Login Route
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if it's Admin Login
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }
        
        // Check if it's Guest Admin Login
        if (email === process.env.GUEST_ADMIN && password === process.env.GUEST_ADMIN_PASSWORD) {
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }

        // Invalid credentials
        return res.status(400).json({ success: false, error: "Invalid Credentials" });

    } catch (error) {
        console.error('Error in Admin Login:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};


// Auth Check Route (use Authorization header to send the token)
const authCheck = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from Authorization header

    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Create a new token for the client to use
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            authenticated: true,
            token: newToken,
            user: decoded,
        });
    } catch (err) {
        return res.status(401).json({ authenticated: false });
    }
};

export { loginUser, registerUser, adminLogin, authCheck };
