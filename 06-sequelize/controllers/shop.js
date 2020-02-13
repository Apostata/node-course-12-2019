import Product from '../models/product';

export const getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
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
};

export const getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
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
    req.user.getCart()
        .then( cart => {
            return cart.getProducts();
        })
        .then(products => {
            const cart = { products }
            res.render('shop/cart', 
                {
                    cart,
                    path: '/cart',
                    pageTitle: 'Your Cart',
                }
            );
        })
        .catch()
};

export const postCart = (req, res, next) => { 
    const { id } = req.body; 
    let resultCart;
    let quantity = 1;

    req.user.getCart()
        .then( cart => {
            resultCart = cart;
            
            return cart.getProducts({where:{id}})
        })
        .then(products => {
            let product;

            if(products.length > 0){
                product = products[0];

                if(product){
                    quantity = product.cartItem.quantity + 1;
                }
            } 
            return Product.findByPk(id) //add new cartItem with quantity to cart
        })
        .then(product => {
            return resultCart.addProduct(product, {through: {quantity}});
        })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch( err => console.log(err));
};

export const postOrder =(req, res, next) =>{
    let productsList;
    let fetchedCart;

    req.user.getCart()
        .then(cart =>{
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products =>{
            productsList = products;
            return req.user.createOrder();
            
        })
        .then(order =>{
            return order.addProducts(
                productsList.map(product=>{
                    product.oderItem = { quantity: product.cartItem.quantity };
                    console.log(product.oderItem)
                    return product;
                })
            );
        })
        .then(()=>{
            return fetchedCart.setProducts(null);           
        })
        .then(()=>{
            res.redirect('/orders');
        })
        .catch(err=>console.log(err));
}

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
    const { id } = req.body;
    req.user.getCart()
        .then(cart =>{
            return cart.getProducts({where:{id}});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};