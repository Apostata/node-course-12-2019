import path from 'path';
import rootPath from '../helpers/rootPath';
import express from 'express';

const PATH = path.join(rootPath ,'views', 'add-product.html');
const router = express.Router();

router.get(
    '/add-product',
    (req, res, next)=>{
        res.sendFile(PATH);
    }
);

router.post(
    '/add-product',
    (req, res, next)=>{
        console.log(req.body)
        res.redirect('/')
    }
);

export default router;