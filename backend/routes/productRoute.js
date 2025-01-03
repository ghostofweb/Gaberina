import express from 'express';
import {addProduct,listProduct,removeProduct,singleProduct,updateProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add',upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1},
]),addProduct);
productRouter.get('/list',listProduct);
productRouter.delete('/remove',removeProduct);
productRouter.get('/single',singleProduct);
productRouter.put('/update',updateProduct);

export default productRouter;