module.exports = controller
var postgres = require('./PostgresHelper')

function controller() { }
var SQLQuery = ''
var ORetObject = {}

controller.prototype.getall = function (req, callback) {
    // console.log("hellllllllllllllllllllllllllo", req.params.user);
    var name = req.params.user
    //callback('done')
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "select * from test where name='" + name + "';"
            console.log("SQLQuery", SQLQuery);
            //return
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                if (returnmsg === 'successful') {
                    if (returnvalue.rows.length > 0) {
                        ORetObject.returnmsg = returnmsg
                        ORetObject.returnvalue = returnvalue
                    } else {
                        ORetObject.returnmsg = 'NoRecordsFound';
                        ORetObject.returnvalue = [];
                    }
                    resolve(ORetObject)
                }
            })
        } catch (e) {
            ORetObject.returnmsg = 'Exception';
            ORetObject.returnvalue = e;
            reject(ORetObject);
        }
    }).then(ORetObject => {
        callback(ORetObject)
    }).catch(err => {
        callback(err)
    })
}

controller.prototype.signup = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "select email from socialuser where email='" + oparameters.email + "' limit 1 ;"
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                //console.log(returnmsg, returnvalue);
                if (returnmsg === 'successful' && returnvalue.rows.length == 0) {
                    var SQLQuery1 = "insert into socialuser(name, password, email,mobile,address,created) VALUES ('" + oparameters.name + "','" + oparameters.password + "','" + oparameters.email + "','" + oparameters.mobile + "','" + oparameters.address + "',NOW());"
                    new postgres().ExecuteQuery(SQLQuery1, function (returnmsg1, returnvalue1) {
                        console.log(returnmsg1, returnvalue1);
                        if (returnmsg1 === 'successful') {
                            ORetObject.returnmsg = 'Created'
                            ORetObject.returnvalue = []
                            ORetObject.status = '200'
                            resolve(ORetObject)
                        } else {
                            ORetObject.returnmsg = 'error'
                            ORetObject.returnvalue = returnvalue
                            ORetObject.status = '500'
                            reject(ORetObject)
                        }
                    })
                } else if (returnmsg === 'successful' && returnvalue.rows.length > 0) {
                    ORetObject.returnmsg = 'User Already exist'
                    ORetObject.returnvalue = []
                    ORetObject.status = '409'
                    reject(ORetObject)
                } else {
                    ORetObject.returnmsg = 'error'
                    ORetObject.returnvalue = returnvalue
                    ORetObject.status = '500'
                    reject(ORetObject)
                }
            })
        } catch (e) {
            console.log("e============>", e);
            ORetObject.returnmsg = 'Exception'
            ORetObject.returnvalue = []
            ORetObject.status = '500'
            callback(ORetObject)
        }
    }).then(ORetObject => {
        console.log("ORetObject", ORetObject);

        callback(ORetObject)
    }).catch(err => {
        callback(err)
    })
}

controller.prototype.login = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "select email from socialuser where email='" + oparameters.email + "' limit 1 ;"
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                if (returnmsg === 'successful' && returnvalue.rows.length > 0) {
                    console.log(returnmsg, returnvalue);
                    var SQLQuery1 = "select userid,name,email,mobile,address,created from socialuser where email='" + oparameters.email + "' limit 1 ;"
                    new postgres().ExecuteQuery(SQLQuery1, function (returnmsg, returnvalue) {
                        ORetObject.returnmsg = returnmsg
                        ORetObject.returnvalue = returnvalue.rows
                        ORetObject.status = '200'
                        resolve(ORetObject)
                    })
                } else {
                    ORetObject.returnmsg = 'User do not exist!'
                    ORetObject.returnvalue = []
                    ORetObject.status = '200'
                    resolve(ORetObject)
                }

            })
        } catch (e) {
            ORetObject.returnmsg = 'Exception';
            ORetObject.returnvalue = e;
            resolve(ORetObject);
        }
    }).then(ORetObject => {
        callback(ORetObject)
    })
}


