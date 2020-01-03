import Product from '../models/product';

export const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/list-product', 
            { 
                products: products, 
                pageTitle: 'Admin Product List',
                path: 'admin/products'
            }
        );
    });
};

export const getAddProduct = (req, res, next) => {
    res.render('admin/add-product', 
        { 
            pageTitle: 'My Shop - add Product',
            path:'admin/add-product'
        }
    );
}

export const postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};
