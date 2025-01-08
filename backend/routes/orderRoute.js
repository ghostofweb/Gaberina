import express from "express"
import { placeOrder,placeOrderGpay,placeOrderPaytm,allOrders,userOrders,updateStatus} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router();

//ADMIN FEATURES
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)


//Payment feature
orderRouter.post("/place",authUser,placeOrder)
orderRouter.post("/gpay",authUser,placeOrderGpay)
orderRouter.post("/paytm",authUser,placeOrderPaytm)

// User Feature
orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter

