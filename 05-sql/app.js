import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import shopRoutes  from './routes/shop';
import { notFound } from './controllers/notFound';

import db from './util/database';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views/pug') // por padrão já é a pasta views, só precisa especificar caso seja outr pasta

// db.execute('SELECT * FROM products')
//     .then( result => console.log(result[0], result[1]) )
//     .catch( err => console.log(err) );

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFound);

app.listen(3000);
