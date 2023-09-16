var express = require('express');
var router = express.Router();
const { MongoClient} = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
const bcrypt = require('bcrypt');
const saltRounds = 10;


async function getDbConnection(inputData) {
    await mongoClient.connect();
    var db = mongoClient.db("onlineshoppingApp");
    var collection = db.collection('userActDetails');
    return collection.insertOne(inputData);
}

/* GET home page. */
router.post('/', function(req, res, next) {
    var userDetails = req.body;
    var responseData = {};
    bcrypt.hash(userDetails.actPwd, saltRounds, function(err, hash) { // using bcrypt algo to encrypt user acount pwd
        userDetails.actPwd = hash;
        getDbConnection(userDetails).then((response) => {
            if (response.insertedId) {
                responseData.msg = 'Inserted';
            } else {
                responseData.msg = 'Error';
            }
            res.send(JSON.stringify(responseData)); 
    
        }).catch((error) => {
    
        })
    });
    
    
});

module.exports = router;
