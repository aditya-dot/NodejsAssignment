const jwt = require('jsonwebtoken');
const config = require('../config/config')
var secretKey = config.secretKey
module.exports = authentication

function authentication() { }
/*Get token function*/
authentication.prototype.login = function (req, callback) {
    var Token
    new Promise(function (resolve, reject) {
        var today = new Date().toJSON().split('T');
        try {
            Token = jwt.sign({
                email: req.body.email,
                date: today[0] // only date
            }, secretKey, {
                expiresIn: 86400 // expires in 24 hours
            });
            //console.log("Token========>", Token);
            resolve(Token)
        } catch (e) { }
        //console.log(today);
    }).then(token => {
        // console.log("Token========>1", token);
        callback(token)
    })

}

/*Function forAuthentication*/
authentication.prototype.authuser = function (req) {
    new Promise(function (resolve, reject) { })
    // var token = req.headers.authorization
    // console.log("token", token, secretKey);

    if (!req.headers.authorization || req.headers.authorization == undefined) {
        //console.log("false======>1");
        return false;
    } else {
        const decoded = jwt.verify(req.headers.authorization, secretKey);
        if (decoded === undefined) {
            //console.log("false======>1");
            return false;
        } else {
            var today = new Date().toJSON().split('T');
            //console.log(decoded);
            if (decoded.email === req.body.email && decoded.date === today[0]) {
                return true
            } else {
                //console.log("false======>2");
                return false
            }
        }

    }

}



