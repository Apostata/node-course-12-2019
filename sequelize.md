# Sequelize

npm i --save sequelize

**Sequelize precisa de uma lib do SQL, no caso do curso estamos usando o mysql2**

## Criando o pool
arquivo util/database.js:

````
import Sequelize from 'sequelize';

const sequelize = new Sequelize('nodesql', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'   
}); //cria o pool de conexões do SQL

export default sequelize;
````

## Criando um Modelo
Criando o modelo produto:
````
import Sequelize from 'sequelize';
import db from '../util/database';

const Product = db.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default Product;
````

## Criando a Tabela dinamicamente pela aplicação
Utilizando sync(), diz ao sequelize para criar as tabelas de cada modelo definido com o metodo define(), ou usa-las caso já as tenha criado

no app ou index.js

````
...
import db from './util/database';
...

db.sync() 
    .then( result => {
        console.log(result);
        app.listen(3000);
    })
    .catch( err => console.log(err) );
...
````

## Pegando o dados do banco
**No Sequelize v5 findById() é substituido por findByPk()**

````
Product.findByPk(id)
    .then(product => {
        res.render('shop/product-detail', 
            { 
                pageTitle: product.title,
                product: product,
                path: '/products'
            }
        );
    })
    .catch( err => console.log(err));
````
ou 

````
Product.findAll({ where: {id: prod.id} })
    .then(products => {
        res.render('shop/product-detail', 
            { 
                pageTitle: products[0].title,
                product: products[0],
                path: '/products'
            }
        );
    })
    .catch( err => console.log(err));
````

## Atualizando (update) um item no banco

Usar um ID para localizar o item no banco e depois usar o método `save()` na resposta do 
findById, findByPk ou findAll com a opção de where.

````
...
Product.findByPk(id)
        .then(product =>{
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;

            return product.save(); //update

        })
        .then(result =>{
            console.log(`Product ${title} updated`);
            res.redirect('/admin/products');
        })
        .catch( err => {
            console.log(err);
            res.redirect('/admin/products');
        });
...

````
## Adicionando Associações entre tabelas