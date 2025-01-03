//Route for User Login
import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js";
import validator from 'validator';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "30d"});
};

const loginUser = async (req, res) => {
    
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                error: "Email and password are required."})
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Email Format",
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return res.status(400).json({
            success: false,
            error: "Invalid Credentials",
        });
    }

    const token = createToken(user._id);
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
}

// Routes for User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email Format'
            });
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: 'Password should be atleast 8 characters'
            });
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Create a token
        const token = createToken(user._id);

        // Success response
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


//Route for Admin Login
const adminLogin = async (req, res) => {
try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success:true,token})
    }else{
        res.status(400).json({success:false,error:"Invalid Credentials"})
    }
} catch (error) {
    console.error('Error in Registering User:', error);
    res.status(500).json({
        success: false,
        message: error.message || 'Internal Server Error'
    });
}
}

export {loginUser,registerUser,adminLogin}