import mongoose from 'mongoose';

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/gaberina`)
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL',error);
        process.exit(1);
    }
}

export default connectDB