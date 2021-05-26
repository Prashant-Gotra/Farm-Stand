const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION SUCCESSFUL!!!");
})
.catch((err) => {
    console.log("OHH, NO!!!, MONGO CONNECTION FAILS");
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

// index page i.e, page to show all products & category wise products
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if(category){
        const products = await Product.find({ category: category });
        res.render('products/index', { products, category });
    }
    else{
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
});

// add a product i.e, creating a product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
    const newProduct = Product(req.body);
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`);
});


// show page
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    // console.log(product);
    // res.send('Pagew for id is found!!!');
    res.render('products/show', {product});
});

// edit product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories});
})

// update the product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
});

// delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect(`/products`); 
    // res.send(`You deleted Me i.e., ${deletedProduct.name}`)
});

app.listen(3000, () => {
    console.log('APP IS LISTENING AT PORT 3000');
});