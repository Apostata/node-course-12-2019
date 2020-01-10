import Product from '../models/product';
import Cart from '../models/cart';

export const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/list-product', 
            { 
                products: products, 
                pageTitle: 'Product List',
                path: '/products'
            }
        );
    });
};

export const getProduct = (req, res, next) => {
   const { id } = req.params; 
   Product.findById(id, product => {
        res.render('shop/product-detail', 
            { 
                pageTitle: product.title,
                product,
                path: '/products'
            }
        );
   });
};

export const getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', 
            { 
                products: products, 
                pageTitle: 'My Shop',
                path: '/'
            }
        );
    });
};

export const getCart = (req, res, next) => {

    Cart.getCart( carrinho =>{
        const cartProducts = [];

        Product.fetchAll(products =>{
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
        });
    });
    
};

export const postCart = (req, res, next) => {
    const { id } = req.body; 
    Product.findById(id,product =>{
        Cart.addProduct(id, product.price);
    });
    res.redirect('/cart');
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