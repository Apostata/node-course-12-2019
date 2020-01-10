import fs from 'fs';
import path from 'path';
import Cart from './cart';

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = callback => {
    fs.readFile(filePath, (err, content) => {
        if(err){
           return callback([]);
        }
        callback(JSON.parse(content));
    });
}

export default class Product { 
    
    constructor(title, imageUrl, description, price, id= null){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }

    save(){
        getProductsFromFile(products =>{
            let newProducts;
            if(this.id){
                const existingIndex = products.findIndex(product => product.id === this.id);
                newProducts = [...products];
                newProducts[existingIndex] = this;

            } else {
                this.id = this.uuidv4();
                products.push(this);
                newProducts = products;
            }

            fs.writeFile(filePath, JSON.stringify(newProducts), err =>{
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products =>{
            const product = products.find( prod => prod.id === id);
            callback(product);
        });
    }

    static delete(id, callback) {
        getProductsFromFile(products =>{
            const deletedProd = products.find(prod => prod.id === id);
            const newProducts = products.filter (product => product.id !== id);

            fs.writeFile(filePath, JSON.stringify(newProducts), err =>{
                if(err){
                    return console.log(err);
                } else {
                    Cart.deleteProduct(id, deletedProd.price, callback);
                }
            });
            
        });
    }
}