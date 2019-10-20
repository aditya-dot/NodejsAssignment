var express = require('express')
var router = express.Router();
var controller = require('./controller')
var auth = require('../helpers/authentication')

router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
})
/*
	Register new User
    @Method: POST
    @Controller-Method: signup
*/
router.post('/user/signup', function (req, res) {
    console.log("req", req.headers);

    var parameters = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile || '',
        address: req.body.address || ''
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
    @Controller-Method: login
*/
router.post('/user/login', function (req, res) {
    var parameters = {
        email: req.body.email,
        password: req.body.password
    }
    new controller().login(req, parameters, function (response) {
        console.log("response", response);
        var statuscode = response.status
        res.status(statuscode).json(response)
    })
})

/*
	Add and Update User details
	@Method: PUT
	@Controller-Method: adddetails
*/
router.put('/user/adddetails', function (req, res) {
    console.log(req.headers);
    //res.json('true')
    //var authentication = req.headers.x - access - token
    var authreturn = new auth().authuser(req)
    var parameters = {
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address
    }
    console.log("authreturn", authreturn);
    if (authreturn) {
        console.log("go ahead");
        new controller().adddetails(req, parameters, function (response) {
            var statuscode = response.status
            res.status(statuscode).json(response)
        })

    } else {
        res.status(401).send("AUTH FAIL")
    }
})

/*
	Delete User by requsted Id
	@Method: PUT
	@Controller-Method: delete
*/
router.put('/user/deleteuser', function (req, res) {
    //console.log(req.headers);
    var authreturn = new auth().authuser(req)
    var parameters = {
        //userid: req.body.userid,
        email: req.body.email
    }
    console.log("authreturn", authreturn);
    if (authreturn) {
        new controller().delete(req, parameters, function (response) {
            var statuscode = response.status
            res.status(statuscode).json(response)
        })
    } else {
        res.status(401).send("AUTH FAIL")
    }



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
