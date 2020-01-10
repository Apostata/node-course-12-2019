import express from 'express';
import { getIndex, getProduct, getProducts, getCart, postCart, getCheckout, getOrders, postCartDelItem } from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:id', getProduct); // rotas dinamicas ficam por ultimo
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDelItem);
router.get('/checkout', getCheckout);
router.get('/orders', getOrders);


export default router;
