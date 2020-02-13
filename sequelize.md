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
A ordem dos que são definidos os relacionamentos são importantes

### Relacionamentos 1:1 (um para um)
Os métodos belongsTo() e hasOne() são usados em conjunto

#### belongsTo 
Significa que existe um relacionamento entre entre A e B, onde Product tem uma referência (foreign key) de User

#### hasOne
Significa que User possuí uma referência de Product 

````
...
Product.belongsTo(User);
User.hasOne(Product)  
...
````


Ou seja Tabela User Possui uma Chave estrangeira de Product.
Um usuário pode possuir apenas 1 produto.

### Relacionamentos 1:N (um para muitos)
Os métodos belongsTo() e hasMany() são usados em conjunto

#### hasMany
Significa que User possuí muitas referências de Product 

````
...
Product.belongsTo(User, {   // User own many products (USER CAN CREATE PRODUCTS)
    constraints: true,      // diz que a tabela User precisa ser criada antes da Product
    onDelete: 'CASCADE'     //ao remover um usuário, removerá todos os produtos relacionados à ele.
});
User.hasMany(Product)  
...
````

Ou seja Tabela User Possui varias referências de Product.
Um usuário pode possuir vários produtos.

### Relacionamentos N:N (muitos para muitos)
O método belongsToMany() de ser usado duas vezes

#### belongsToMany
Significa que existe um relacionamento entre entre Product e Cart de 1:1, CartItem, imtermedia e possui as (foreign key)de Product e Cart

````
...
Product.belongsToMany(Cart, { through: 'CartItem' });
Cart.belongsToMany(Product, { through: 'CartItem' });
...
````

Product pertence a vários CartItem.
Cart pertence a vários CartItem.

CartItem possuir vários Product e Cart, vários relacionamentos e 1:1 entre
Cart e Product
cd 
### Magic Associations

Na criação da associação abaixo, o Sequelize já cria um método `createProduct()`(neste exemplo) para User, este método já associa e insere em produto, automaticamente a chave de usuário.

Criação das associações:
````
...
Product.belongsTo(User, {   
    constraints: true, 
    onDelete: 'CASCADE'
});
User.hasMany(Product) ;
...
````
#### Magic Associations - Pega todos produtos do usuário ativo
````
req.user.getProducts();
````

#### Magic Associations - Pega um produto específo do usuário ativo
````
req.user.getProducts({where:{id: prodId}});

````

#### Magic Associations - Cria produto para o usuário ativo
````
req.user.createProduct({
    title: prod.title,
    price: prod.price,
    imageUrl: prod.imageUrl,
    description: prod.description
});
````

#### Magic Associations - Deleta Produto

````
 Product.findByPk(id)
.then(product =>{
    return product.destroy();
});
````