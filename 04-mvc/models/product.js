import fs from 'fs';
import path from 'path';

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
    
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        getProductsFromFile(products =>{
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err =>{
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}