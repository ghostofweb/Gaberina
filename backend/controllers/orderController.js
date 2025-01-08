import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method
const placeOrder = async(req,res)=>{
try {
    const {userId,items,amount,address} = req.body;
    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }
    const newOrder = new orderModel(orderData)
    const result = await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Ordered Placed Successfully"})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

// placing order using Gpay method
const placeOrderGpay = async(req,res)=>{

}

const placeOrderPaytm = async(req,res)=>{

}

// All order data for admin panel
const allOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,message:"All Orders",orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//User Order Data for the Frontend
const userOrders = async (req,res)=>{
try {
    const {userId} = req.body
    const orders = await orderModel.find({userId})
    res.json({success:true,orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}

//Update Order status from Admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId,status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Order Status Updated Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export{
    placeOrder,
    placeOrderGpay,
    placeOrderPaytm,
    allOrders,
    userOrders,
    updateStatus,
}