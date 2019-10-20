module.exports = controller
var postgres = require('../helpers/PostgresHelper')
var auth = require('../helpers/authentication')

function controller() { }
var SQLQuery = ''
var ORetObject = {}

/*User GetAll */
controller.prototype.getall = function (req, oparameters, callback) {

    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "select s.name, s.email,s.mobile,s.address,p.post,p.posttitle from socialuser s inner join post p on s.email = p.email where 1=1 and s.userid='" + oparameters.userid + "';"
            console.log("SQLQuery", SQLQuery);
            //return
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                if (returnmsg === 'successful') {
                    if (returnvalue.rows.length > 0) {
                        ORetObject.returnmsg = returnmsg
                        ORetObject.returnvalue = returnvalue.rows
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

/*User Signup*/
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
                            ORetObject.status = 200
                            resolve(ORetObject)
                        } else {
                            ORetObject.returnmsg = 'error'
                            ORetObject.returnvalue = returnvalue
                            ORetObject.status = 500
                            reject(ORetObject)
                        }
                    })
                } else if (returnmsg === 'successful' && returnvalue.rows.length > 0) {
                    ORetObject.returnmsg = 'User Already exist'
                    ORetObject.returnvalue = []
                    ORetObject.status = 409
                    reject(ORetObject)
                } else {
                    ORetObject.returnmsg = 'error'
                    ORetObject.returnvalue = returnvalue
                    ORetObject.status = 500
                    reject(ORetObject)
                }
            })
        } catch (e) {
            console.log("e============>", e);
            ORetObject.returnmsg = 'Exception'
            ORetObject.returnvalue = []
            ORetObject.status = 500
            callback(ORetObject)
        }
    }).then(ORetObject => {
        console.log("ORetObject", ORetObject);

        callback(ORetObject)
    }).catch(err => {
        callback(err)
    })
}
/* Login User */
controller.prototype.login = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "select email from socialuser where email='" + oparameters.email + "' limit 1 ;"
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                if (returnmsg === 'successful' && returnvalue.rows.length > 0) {
                    console.log(returnmsg, returnvalue);
                    var SQLQuery1 = "select userid,name,email,mobile,address,created from socialuser where email='" + oparameters.email + "' and password='" + oparameters.password + "' limit 1;"
                    console.log("SQLQuery1", SQLQuery1);
                    new postgres().ExecuteQuery(SQLQuery1, function (returnmsg1, returnvalue1) {
                        console.log("returnmsg1", returnmsg1);
                        console.log("returnvalue1", returnvalue1);
                        if (returnmsg1 === 'successful' && returnvalue1.rows.length > 0) {
                            ORetObject.returnmsg = returnmsg1
                            ORetObject.returnvalue = returnvalue1.rows
                            ORetObject.status = 200
                            new auth().login(req, function (token) {
                                console.log(token);
                                ORetObject.token = token
                                resolve(ORetObject)
                            })
                        } else {
                            ORetObject.returnmsg = "Wrong Password"
                            ORetObject.returnvalue = 'Auth Fail'
                            ORetObject.status = 401
                            resolve(ORetObject)
                        }
                    })
                } else {
                    ORetObject.returnmsg = 'User do not exist!'
                    ORetObject.returnvalue = []
                    ORetObject.status =
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

/* Add and Update User details*/
controller.prototype.adddetails = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "update socialuser set(name,email,mobile,address) =('" + oparameters.name + "','" + oparameters.email + "','" + oparameters.mobile + "','" + oparameters.address + "') where userid ='" + oparameters.userid + "';"
            //console.log("SQLQuery=========>", SQLQuery);
            //return
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                console.log("returnvalue", returnvalue);

                if (returnmsg === 'successful') {
                    ORetObject.returnmsg = 'Updated Succesfully'
                    ORetObject.returnvalue = []
                    ORetObject.status = 200
                    resolve(ORetObject)
                } else {
                    ORetObject.returnmsg = 'error'
                    ORetObject.returnvalue = []
                    ORetObject.status = 500
                    resolve(ORetObject)
                }
                //  console.log(returnmsg, returnvalue);
            })
        } catch (e) {
            ORetObject.returnmsg = 'Exception';
            ORetObject.returnvalue = e;
            ORetObject.status = 500
            resolve(ORetObject);
        }
    }).then(ORetObject => {
        callback(ORetObject)
    })
}

/* Delete user by user Id */
controller.prototype.delete = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "delete from socialuser where email ='" + oparameters.email + "';"
            console.log("SQLQuery=========>", SQLQuery);
            //return
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                console.log("returnvalue", returnvalue);
                if (returnmsg === 'successful') {
                    ORetObject.returnmsg = 'Deleted Succesfully'
                    ORetObject.returnvalue = []
                    ORetObject.status = 204
                    resolve(ORetObject)
                } else {
                    ORetObject.returnmsg = 'error'
                    ORetObject.returnvalue = []
                    ORetObject.status = 500
                    resolve(ORetObject)
                }
                //  console.log(returnmsg, returnvalue);
            })
        } catch (e) {
            ORetObject.returnmsg = 'Exception';
            ORetObject.returnvalue = e;
            ORetObject.status = 500
            resolve(ORetObject);
        }
    }).then(ORetObject => {
        callback(ORetObject)
    })
}


/* POST tweets*/
controller.prototype.posttweets = function (req, oparameters, callback) {
    new Promise(function (resolve, reject) {
        try {
            SQLQuery = "insert into post(userid,email,post,posttitle,created) values('" + oparameters.userid + "','" + oparameters.email + "','" + oparameters.post + "','" + oparameters.posttitle + "',NOW())"
            //console.log("SQLQuery=========>", SQLQuery);
            //return
            new postgres().ExecuteQuery(SQLQuery, function (returnmsg, returnvalue) {
                console.log("returnvalue", returnvalue);
                if (returnmsg === 'successful') {
                    ORetObject.returnmsg = 'tweet Succesfull'
                    ORetObject.returnvalue = []
                    ORetObject.status = 200
                    resolve(ORetObject)
                } else {
                    ORetObject.returnmsg = 'error'
                    ORetObject.returnvalue = []
                    ORetObject.status = 500
                    resolve(ORetObject)
                }
                //  console.log(returnmsg, returnvalue);
            })
        } catch (e) {
            ORetObject.returnmsg = 'Exception';
            ORetObject.returnvalue = e;
            ORetObject.status = 500
            resolve(ORetObject);
        }
    }).then(ORetObject => {
        callback(ORetObject)
    })
}


