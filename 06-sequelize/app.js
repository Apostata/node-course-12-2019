import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import shopRoutes  from './routes/shop';
import { notFound } from './controllers/notFound';

//models
import Product from './models/product';
import User from './models/user';
import Cart from './models/cart';
import CartItem from  './models/cart-item';
import Order from './models/order';
import OrderItem from './models/order-item';

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

// ---- Tables associations ----

// Product pentence a um User, User possuí muitos Product
Product.belongsTo(User, {   
    constraints: true, //precisa da User criada      
    onDelete: 'CASCADE' // ao deletar usuário, os produtos dele também serão deletados
}); 
User.hasMany(Product);

// User tem um Cart, Cart pertence a um User, CartItem relaciona Cart e Product
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem}); // para poder adicionar metodos magicos de produtos ao cart

// User tem vários Order, Order prertence a um User. OrderItem recaliona  Order e Product
User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, {through: OrderItem});
Order.belongsToMany(Product, {through: OrderItem});



// Sync tables
const force = true // para forçar a criação da tabela e resetar setar como true
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
        return user.createCart();
    })
    .then(()=>{
        app.listen(3000);
    })
    .catch( err => console.log(err) );


