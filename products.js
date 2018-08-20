var express = require('express');
var exp = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonfile = fs.readFileSync('product.json');
var data = JSON.parse(jsonfile);
exp.use(bodyParser.json());
// to get all products

exp.get('/getAllProducts', function (req, res) {
    console.log("dispaly all products");
    res.send(data);
    console.log(data);
});

//update product list

exp.post('/updateProduct', urlencodedParser, function (req, res) {
    updateData = req.body;
    for (var product of data) {
        if (product.productId == updateData.id) {
            product.productId = updateData.id;
            product.productName = updateData.name;
            product.productPrice = updateData.price;
            product.productDetails = updateData.details;
            fs.writeFileSync('product.json', JSON.stringify(data));
        }
    }
    console.log("Document updated");
});

//ADD PRODUCT

exp.post('/addProduct', function (req, res) {
    addData = req.body;
    let newdata = {
        productId: addData.id,
        productName: addData.name,
        productPrice: addData.price,
        productDetails: addData.details,
    }
    data.push(newdata);
    fs.writeFileSync('product.json', JSON.stringify(data));
    res.status(201).send(req.body);
    console.log("Document Added");
});

//delete product list

exp.post('/deleteProduct', urlencodedParser, function (req, res) {
    updateData = req.body;
            var index = data.indexOf(updateData.indexno);
            data.splice(index, 1);
            fs.writeFileSync('product.json', JSON.stringify(data));
    console.log("Document deleted");
});
exp.listen(3002, () => console.log('RUNNING..'))

