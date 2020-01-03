import express from 'express';
import { getIndex, getProducts, getCart, getCheckout, getOrders } from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/cart', getCart);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);


export default router;
