import fs from 'fs';
import path from 'path';

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

export default class Cart {

    static addProduct(id, price){
       
        fs.readFile(filePath, (err, content) => {
            let cart = { products: [], totalPrice: 0 };
    
            if(!err){
               cart = JSON.parse(content);
            }
            
            const existingIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingIndex];
            let updateProduct;
    
            if(existingProduct){
                updateProduct = { ...existingProduct };
                updateProduct.qty = existingProduct.qty + 1;
                cart.products = [ ...cart.products ];
                cart.products[existingIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1 };
                cart.products = [ ...cart.products, updateProduct ];
            }
            
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(filePath, JSON.stringify(cart), err =>{
                console.log(err);
            });
        });
    }

    static deleteProduct(id, price, callback=null){
        fs.readFile(filePath, (err, content) => {
            if(err){
                return console.log(err);
            }
            const cart = JSON.parse(content);
            const updatedCart = {...cart };
            const product = cart.products.find(product => product.id === id);
            if(!product) return; //se não tem produto no carrinho não há como remove-lo
            const prodQty = product.qty;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * prodQty

            fs.writeFile(filePath, JSON.stringify(updatedCart), err =>{
                console.log(err);
            });

            callback && callback();
        });
    }

    static getCart(callback){
        fs.readFile(filePath, (err, content) => {
            let cart = { products: [], totalPrice: 0 };
    
            if(err){
             console.log(err)
            }

            callback(JSON.parse(content));
        });
    }
}