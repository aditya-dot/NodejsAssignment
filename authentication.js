const jwt = require('jsonwebtoken');
const config = require('./config')
var secretKey = config.secretKey
module.exports = authentication

function authentication() { }

authentication.prototype.login = function (req, callback) {
    var Token
    new Promise(function (resolve, reject) {
        var today = new Date().toJSON().split('T');
        try {
            Token = jwt.sign({
                email: req.body.email,
                date: today[0] // only date
            }, secretKey, {
                expiresIn: 1//86400 // expires in 24 hours
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


authentication.prototype.authuser = function (req) {
    new Promise(function (resolve, reject) { })
    var token = req.headers.authorization
    jwt.verify(token, secretKey, function (err, decoded) {
        console.log("decoded", decoded);

    })
}


