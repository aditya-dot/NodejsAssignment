var express = require('express')
var router = express.Router();
var postgres = require('./PostgresHelper')
var controller = require('./controller')
var auth = require('./authentication')

router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
})

/*
	Register new User
	@Method: POST
*/
router.post('/user/signup', function (req, res) {
    console.log("req", req.headers);

    var parameters = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        address: req.body.address
    }
    new controller().signup(req, parameters, function (response) {
        //console.log("returnvalue", response);
        var statuscode = response.status
        res.status(statuscode).json({
            "returnmsg": response.returnmsg,
            "returnvalue": response.returnvalue,
            "status": response.status
        })
        //res.json(returnvalue)
    })
})
/*
	Login Api for User
	@Method: POST
*/
router.post('/user/login', function (req, res) {
    var parameters = {
        email: req.body.email,
        password: req.body.password
    }
    new controller().login(req, parameters, function (response) {
        new auth().login(req, function (token) {
            console.log("returnvalue==============>", token);
            Object.assign(response, { "token": token })
        })
        var statuscode = response.status
        res.status(statuscode).json(response)
    })
})


router.put('/user/adddetails', function (req, res) {
    console.log(req.headers);
    res.json('true')
    //var authentication = req.headers.x - access - token
    new auth().authuser(req)

})

















// router.get('/user/getall/:user', function (req, res) {
//     console.log("req", req.params.user);
//     //console.log("res", res);
//     new controller().getall(req, function (returnvalue) {
//         res.json(returnvalue)
//     })
//     //  res.send('Hello ' + name)

// })

module.exports = router
