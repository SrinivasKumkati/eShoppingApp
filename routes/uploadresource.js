var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/images/productImages');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, callback) { 
        file_path = "userImage" + '-' + Date.now() + path.extname(file.originalname);
        callback(null, file_path);
    }
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var responseData = {};
    var upload = multer({ storage: storage}).single('prodImage');

    upload(req, res, function(err) {
        if (err) {
            responseData.msg = "ERROR"
            console.log(err);
        } else {
            responseData.file_path = '/images/productImages/' + file_path;
            responseData.msg = 'success';
        }
        res.send(JSON.stringify(responseData));
    });
});

module.exports = router;
