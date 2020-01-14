import Product from '../models/product';

export const getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/list-product', 
            { 
                products: products, 
                pageTitle: 'Admin Product List',
                path: '/admin/products'
            }
        );
    });
};

export const getAddProduct = (req, res, next) => {
    res.render('admin/add-edit-product', 
        { 
            pageTitle: 'My Shop - add Product',
            path:'/admin/product'
        }
    );
}

export const getEditProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findById(id, product => {
        res.render('admin/add-edit-product', 
            { 
                product,
                pageTitle: 'My Shop - edit Product',
                path:'/admin/product'
            }
        );
    });
}

export const postEditProduct = (req, res, next) => {
    const { id, title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price, id);
    product.save();
    res.redirect('/admin/products');
}

export const postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/products');
};

export const postDeleteProduct = (req, res, next) => {
    const { id } = req.body;
    Product.delete(id, ()=>{
        res.redirect('/admin/products');
    });
}
