import Product from '../models/product';

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
    res.render('shop/cart', 
        {
            path: '/cart',
            pageTitle: 'Your Cart'
        }
    );
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