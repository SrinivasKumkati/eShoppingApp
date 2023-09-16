var express = require('express');
var router = express.Router();
const { MongoClient} = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

async function getDbConnection(productData) {
    await mongoClient.connect();
    var db = mongoClient.db("onlineshoppingApp");
    var collection = db.collection('productDetails');
    return collection.insertOne(productData);
}

/* GET home page. */
router.post('/', function(req, res, next) {
     console.log(req.body)
     var responseData = {};
     
     

     getDbConnection(req.body).then((response) => {
           if (response.insertedId) {
            responseData.msg = 'added';
           } else {
            responseData.msg = 'Error';
           }
           res.send(JSON.stringify(responseData));
     })
});

module.exports = router;
