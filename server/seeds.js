const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose
  .connect('mongodb://localhost:27017/mevn_full_stack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN');
  })
  .catch((error) => {
    console.log('MONGO ERROR FOUND!');
    console.log(error);
  });


  const seedProducts = [
      {
          image: 'image_1633505631862_product_fruits.png',
          name: 'PRODUCT1',
          category: 'CATEGORY1',
          brand: 'BRAND1',
          unit: 100,
          price: 50,
          qty: 1,
          status: 'ACTIVE',
          discountPerc: 0,
          discountPrice: 0,
          total: 50,
          netTotal: 50,
          timestamps: true
      },
      {
        image: 'image_1633505233862_product_fruits.png',
        name: 'PRODUCT2',
        category: 'CATEGORY2',
        brand: 'BRAND2',
        unit: 100,
        price: 50,
        qty: 1,
        status: 'ACTIVE',
        discountPerc: 0,
        discountPrice: 0,
        total: 50,
        netTotal: 50,
        timestamps: true
      }
  ];

  Product.insertMany(seedProducts)
  .then((res) =>{
    console.log(res);
  })
  .catch((error) => {
      console.log('OPPS! ERROR FOUND!');
      console.log(error);
  })
