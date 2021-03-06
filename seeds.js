const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION SUCCESSFUL!!!");
})
.catch((err) => {
    console.log("OHH, NO!!!, MONGO CONNECTION FAILS");
    console.log(err);
});

// Insert one entry

// const p = new Product({
//     name: 'Ruby Graperuit',
//     price: 1.99,
//     category: 'fruit'
// });
// p.save()
//     .then(data => {
//         console.log(data);
//     })
//     .catch(e =>{
//         console.log(e);
//     });


// Insert multiple entries at once..Also, no need to call save as for insertMany save inclusively called

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
];

Product.insertMany(seedProducts)
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        console.log("OHH NO ERROR!!")
        console.log(e);
    });