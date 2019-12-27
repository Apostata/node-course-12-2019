import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes, { products } from './routes/admin';
import shopRoutes  from './routes/shop';
import expressHbs from 'express-handlebars';

const app = express();

app.engine('hbs', expressHbs(
    {
        extname: '.hbs', //só para o layout
        defaultLayout: 'main-layout',
        layoutsDir: path.join(__dirname, 'views/hbs/layouts/'),
        //partialsDir: path.join(__dirname, 'views/hbs/')
    }
));
app.set('view engine', 'hbs');
app.set('views', 'views/hbs') // por padrão já é a pasta views, só precisa especificar caso seja outr pasta

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404',{ docTitle: '404 - Not Found'})
});

app.listen(3000);
