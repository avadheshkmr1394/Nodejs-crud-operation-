const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;

router.get('/', (req, res) => {
    res.render("Login/UserLogin.hbs", {
        viewTitle: "Loin User"
    });
})
router.post('/', (req, res) => {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("demo");
        dbo.collection("employees").find({ email: req.body.userName, mobile: req.body.password }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            else {
                if (authenticat(result) == true) {
                    res.redirect('dashbord/student')
                }
                else {
                    res.render("Login/UserLogin.hbs", {
                        viewTitle: "Loin User",
                        error: 'User name and Password is invalid'
                    });
                    console.log("User name and Password is invalid");
                }

            }
            db.close();
        });
    })
    // login(req,res)
})
// function login (req,res){
// }
function authenticat(result) {

    if (result[0]) {
        return true;
    }
    else {
        return false;
    }
}



module.exports = router;