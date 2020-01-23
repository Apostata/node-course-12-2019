import Product from '../models/product';

export const getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/list-product', 
                { 
                    products, 
                    pageTitle: 'Admin Product List',
                    path: '/admin/products'
                }
            );
        })
        .catch( err => {
            console.log(err);
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
    Product.findByPk(id)
        .then(product => {
            if(!product) return res.redirect('/amdmin/products');

             res.render('admin/add-edit-product', 
                { 
                    product,
                    pageTitle: 'My Shop - edit Product',
                    path:'/admin/product'
                }
            );
        })
        .catch( err => {
            console.log(err);
        });
}

export const postEditProduct = (req, res, next) => {
    const { id, title, imageUrl, description, price } = req.body;
    // const product = new Product(title, imageUrl, description, price, id);
    Product.findByPk(id)
        .then(product =>{
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;
            return product.save();
            
        })
        .then(result =>{
            console.log(`Product ${title} updated!`);
            res.redirect('/admin/products');
        })
        .catch( err => {
            console.log(err);
        });

    
}

export const postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    // const { user } = req;
    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
        // userId: user.id
    })
        .then( result => {
            console.log(`Produto ${title}, criado com sucesso!`);
            res.redirect('/admin/products');
        })
        .catch( err => {
            console.log(err);
        });    
};

export const postDeleteProduct = (req, res, next) => {
    const { id } = req.body;
    Product.findByPk(id)
    .then(product =>{
        return product.destroy();
    })
    .then(result =>{
        console.log(`Product ${id} deleted!`)
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
    
}
