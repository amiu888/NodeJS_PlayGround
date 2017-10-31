var express = require('express');
var router1 = require('./routes/router1');

var app = express();var app = express();

var port = 5000; //test

//All the request all go through static first before routing
app.use(express.static('public'));

app.set('views','./src/views');
app.set('view engine','jade');

app.use('/Books', router1);

// app.get('/', (req,res) => {
//     res.render('index', {list:['a','b','c']});
// });

// app.get('/tests',(req,res) => {
//     res.send('Hello world');
// });

app.listen(port, (err) => {
    console.log('running on port ' + port);
});