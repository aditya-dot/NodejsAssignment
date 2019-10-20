var express = require('express')
bodyParser = require('body-parser')
var app = express()

app.listen(3000)

// app.post('/hello', function (req, res) {
//     res.send("You just called the post method at '/hello'!\n");
// });
var routes = require('./api/routes')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    console.log("A new request receive" + new Date());
    next();
})

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.use('/', routes)

