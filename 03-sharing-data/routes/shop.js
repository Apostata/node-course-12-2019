import express from 'express';
import { products } from './admin';

const router = express.Router();

router.get('/', (req, res, next) => {
 res.render('shop', 
 {
      hasProducts: products.length > 0,
      products, 
      pageTitle: 'My Shop List',
      path: '/',
    }
  );
});

export default router;
