import express from 'express';
import { 
    getProducts, 
    getAddProduct, 
    postAddProduct, 
    getEditProduct, 
    postEditProduct, 
    postDeleteProduct } from '../controllers/admin';

const router = express.Router();

router.get('/products', getProducts);
router.get('/product', getAddProduct);
router.post('/add-product', postAddProduct);
router.get('/product/:id', getEditProduct)
router.post('/edit-product', postEditProduct);
router.post('/delete-product', postDeleteProduct);

export default router;
