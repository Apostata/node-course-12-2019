import path from 'path';
import express from 'express';
import rootDir from '../util/path';

export const products = [];

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', 
  { 
    docTitle: 'My Shop - add Product',
    path:'/admin/add-product'
  }
  );
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

export default router;
