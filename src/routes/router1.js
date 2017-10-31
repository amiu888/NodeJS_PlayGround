import express from 'express';

let app = express();

let router1 = express.Router();

var nlist = {list:['a','b','c']};

router1.route('/').get(function (req, res) {
    res.render('index',nlist);
});

router1.route('/single').get(function (req, res) {
    res.send('hello single book');
});

module.exports = router1;