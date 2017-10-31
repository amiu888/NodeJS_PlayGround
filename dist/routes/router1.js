'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var router1 = _express2.default.Router();

var nlist = { list: ['a', 'b', 'c','d'] };

router1.route('/').get(function (req, res) {
    res.render('index', nlist);
});

router1.route('/single').get(function (req, res) {
    res.send('hello single book');
});

module.exports = router1;
//# sourceMappingURL=router1.js.map
