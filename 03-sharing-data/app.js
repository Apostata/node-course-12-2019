import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes, { products } from './routes/admin';
import shopRoutes  from './routes/shop';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs') // por padrão já é a pasta views, só precisa especificar caso seja outr pasta

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404',
        { 
        pageTitle: '404 - Not Found',
        path: ''
    })
});

app.listen(3000);
