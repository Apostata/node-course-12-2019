import express from 'express';
import { products } from './admin';

const router = express.Router();

router.get('/', (req, res, next) => {
 res.render('shop', 
 {
      //layout: false, 
      hasProducts: products.length > 0,
      products, 
      pageTitle: 'My Shop List',
      path: '/',
      activeShop : true,
      ProductCSS: true
    }
  );
});

export default router;
