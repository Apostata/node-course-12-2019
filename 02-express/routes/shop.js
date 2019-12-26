import path from 'path';
import rootPath from '../helpers/rootPath';
import express from 'express';

const PATH = path.join(rootPath ,'views', 'shop.html');
const router = express.Router();

router.get(
    '/',
    (req, res, next)=>{
        res.sendFile(PATH);
    }
);

export default router;