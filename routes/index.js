var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/pharmacies';
var router = express.Router();

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        var collection = db.collection('pharmacies');
        collection.find({}).toArray(function(err, docs) {
            res.render('index', {
                title: 'MongoDB GeoSpatial Feature',
                locations: docs
            });
        });
    });
});

router.post('/', function(req, res, next) {
    var query = req.body.query;
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        console.log("Query: " + query);
        var collection = db.collection('pharmacies');
        collection.find(JSON.parse(query)).toArray(function(err, docs) {
            res.render('index', {
                title: 'MongoDB GeoSpatial Feature',
                locations: docs
            });
        });
    });
});

module.exports = router;
