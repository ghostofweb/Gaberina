//Route for User Login

import userModel from "../models/userModel.js";


const loginUser = async (req, res) => {

    res.json({
        message: 'User Login Route'
    })
}

// Routes for User Registration
const registerUser = async (req, res) => {
    try {
        const {name,email,password} = req.body;
         //Check if user already exists
        const userExists = await userModel.findOne({email});
        if(userExists){
            res.status(400).json({
                success: false,
                message: 'User Already Exists'
            })
        }
        // Validating the email format and strong password
    } catch (error) {
        
    }
}

//Route for Admin Login
const adminLogin = async (req, res) => {

}

export {loginUser,registerUser,adminLogin}