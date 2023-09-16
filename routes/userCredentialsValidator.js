var express = require("express");
var router = express.Router();
const { MongoClient} = require("mongodb");
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
var bcrypt = require("bcrypt");


async function getDbConnection(inputData) {
    await mongoClient.connect();
    var db = mongoClient.db("onlineshoppingApp");
    var collection = db.collection('userActDetails');
    var results = collection.find({accountId: inputData.accountId}).toArray();
    return results;
}

router.post('/', (req, res) => {
    console.log(req.body)
    var responseData = {};
    getDbConnection(req.body).then((results) => {
       console.log(results);
        if (results.length) {
            bcrypt.compare(req.body.actPwd, results[0].actPwd, function(err, result) {
                if (result) { // true
                    responseData.msg = 'Valid';
                    req.session.isUserLoggedIn = true;
                    if (results[0].isAdmin) {
                        responseData.isAdmin = true;
                    }
                }
                res.send(JSON.stringify(responseData));
            });
            
        } else {
            responseData.msg = 'InValid';
            req.session.isUserLoggedIn = false;
            responseData.msg = 'Invalid Crdentials';
            res.send(JSON.stringify(responseData));
        }
        
    }).catch((error) => {
        console.log(error);
        console.log("error while connecting");
        
    })
    // if (req.body.accountId == 'ISRO' && req.body.accountPassword == 'Chandrayan3') {
    //     responseData.msg = 'Valid';
    // } else {
    //     responseData.msg = 'Invalid Cridential';
    // }
    

}); 

module.exports = router;