import express from 'express';

const router = express.Router();

router.get(
    '/',
    (req, res, next)=>{
        res.send('<h1>Hello from express root</h1>')
    }
);

export default router;