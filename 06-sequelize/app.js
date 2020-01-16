import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import shopRoutes  from './routes/shop';
import { notFound } from './controllers/notFound';

//models
import Product from './models/product';
import User from './models/user';

import db from './util/database';

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views/pug') // por padrão já é a pasta views, só precisa especificar caso seja outr pasta

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/*
    Adicionando user a todas as requisições - para não ter que autenticar por enquanto
    este código só roda após a inicialização do servidor ou seja, só não proxima requisição
    após o -> app.listen(3000);
*/
app.use((req, res, next) =>{
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFound);

// Tables associations
Product.belongsTo(User, { // User own many products (USER CAN CREATE PRODUCTS)
    constraints: true,
    onDelete: 'CASCADE'
}); 

User.hasMany(Product)

// Sync tables
const force = false // para forçar a criação da tabela e resetar setar como true
const syncOptions = { force: force } ;
db.sync(syncOptions)
    .then( result => {
        return User.findByPk(1)
    })
    .then(user =>{
        if(!user){
            return User.create({
                name:'Teste',
                email: 'teste@teste.teste'
            })
        }
        return Promise.resolve(user);
    })
    .then(user=>{
        // console.log(user);
        app.listen(3000);
    })
    .catch( err => console.log(err) );


