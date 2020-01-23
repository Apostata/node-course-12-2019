import Product from '../models/product';
import Cart from '../models/cart';

export const getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            const products = rows;
            res.render('shop/list-product', 
                { 
                    products, 
                    pageTitle: 'Product List',
                    path: '/products'
                }
            );
        })
        .catch( err => console.log(err) );
};

export const getProduct = (req, res, next) => {
   const { id } = req.params; 
   Product.findById(id)
    .then(([product])=>{
        res.render('shop/product-detail', 
            { 
                pageTitle: product[0].title,
                product: product[0],
                path: '/products'
            }
        );
    })
    .catch( err => console.log(err));
};

export const getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            const products = rows;
            res.render('shop/index', 
                { 
                    products, 
                    pageTitle: 'My Shop',
                    path: '/'
                }
            );
        })
        .catch( err => console.log(err) );
};

export const getCart = (req, res, next) => {
    Cart.getCart( carrinho =>{
        const cartProducts = [];

        Product.fetchAll()
            .then(([rows, fieldData]) => {
                const products = rows;
                
                for (let product of products){
                    const productFound = carrinho.products.findIndex(prod => product.id === prod.id);
                    if(productFound > -1){
                        product.qty = carrinho.products[productFound].qty;
                        cartProducts.push(product);
                    }
                
                }
                const cart = { totalPrice: carrinho.totalPrice, products: [...cartProducts] };
                res.render('shop/cart', 
                    {
                        cart,
                        path: '/cart',
                        pageTitle: 'Your Cart',
                    }
                );
            })
            .catch( err => console.log(err) );
    });
    
};

export const postCart = (req, res, next) => {
    const { id } = req.body; 
    Product.findById(id)
        .then(([product])=>{
            Cart.addProduct(id, product[0].price);
            res.redirect('/cart');
        })
        .catch( err => console.log(err));
   
};

export const getOrders = (req, res, next) => {
    res.render('shop/orders', 
        {
            path: '/orders',
            pageTitle: 'Your Orders'
        }
    );
};

export const getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
        {
            path: '/checkout',
            pageTitle: 'Checkout'
        }
    );
};

export const postCartDelItem  = (req, res, next) => {
    const { id, price } = req.body;
    Cart.deleteProduct(id, price, ()=>{
        res.redirect('/cart');
    });
};