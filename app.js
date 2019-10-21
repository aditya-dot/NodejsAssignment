var express = require('express')
bodyParser = require('body-parser')
var app = express()

app.listen(3000)

var routes = require('./api/routes')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    console.log("A new request receive" + new Date());
    next();
})

app.use('/', routes)

