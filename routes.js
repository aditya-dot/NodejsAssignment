var express = require('express')
var router = express.Router();
var postgres = require('./PostgresHelper')


router.get('/:name', function (req, res) {
    var name = "Thanks for login " + req.params.name
    res.send(name)
})

// router.get('*', function (req, res) {
//     res.send('Sorry, this is an invalid URL.');
// })


router.get('/user/getall', function (req, res) {
    var SQLQuery = 'SELECT * from test;'
    new postgres().ExecuteQuery(SQLQuery, function (msg, value) {
        console.log(msg, value);
        res.send(value)
    })

})

module.exports = router
