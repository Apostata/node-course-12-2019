import express from 'express';
import { 
        getIndex, getProduct, getProducts,
        getCart, postCart, postCartDelItem,
        getOrders, postOrder,
        getCheckout,
    } from '../controllers/shop';

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:id', getProduct); // rotas dinamicas ficam por ultimo
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDelItem);
router.get('/checkout', getCheckout);
router.post('/orders', postOrder);
router.get('/orders', getOrders);


export default router;
