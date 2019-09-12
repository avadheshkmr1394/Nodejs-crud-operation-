const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee')

router.get('/', (req, res) => {
    res.render("employee/addorEdit.hbs", {
        viewTitle: "Insert Employee"
    });
})
router.post('/', (req, res) => {
    debugger
    if (req.body._id == '') {
        // console.log(req.body);
        InsertRecord(req, res);
    }
    else {
        UpdateRecords(req, res)
    }
})
function InsertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        }
        else {
            if (err.name == 'ValidationError') {
                for (var field in err.errors) {
                    console.log(err.errors[field].path)
                    console.log(err.errors[field].message)
                    switch (err.errors[field].path) {
                        case 'fullName':
                            req.body['fullNameError'] = err.errors[field].message;
                            break;
                        case 'email':
                            req.body['emailError'] = err.errors[field].message;
                            break;
                        case 'mobile':
                            req.body['mobileError'] = err.errors[field].message;
                            break;
                        case 'city':
                            req.body['cityError'] = err.errors[field].message;
                            break;
                        default:
                            break;
                    }
                }
                res.render("employee/addorEdit.hbs", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            console.log("error during records insertion:" + err);
        }
    });
}
function UpdateRecords(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { mew: true }, (err, doc) => {
        if (!err) {
            res.redirect("employee/list")
        }
        else {
            if (err.name == 'ValidationError') {
                for (var field in err.errors) {
                    console.log(err.errors[field].path)
                    console.log(err.errors[field].message)
                    switch (err.errors[field].path) {
                        case 'fullName':
                            req.body['fullNameError'] = err.errors[field].message;
                            break;
                        case 'email':
                            req.body['emailError'] = err.errors[field].message;
                            break;
                        case 'mobile':
                            req.body['mobileError'] = err.errors[field].message;
                            break;
                        case 'city':
                            req.body['cityError'] = err.errors[field].message;
                            break;
                        default:
                            break;
                    }
                }
                res.render("employee/addorEdit.hbs", {
                    viewTitle: "Update Employee",
                    employee: req.body
                });
            }
            console.log("error during records update:" + err);
        }
    })
}
router.get('/list', (req, res) => {
    // res.json("from list")
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list.hbs", {
                list: docs
            });
        }
        else {
            console.log('error is retrieving employee list:' + err)
        }
    })
})
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addorEdit.hbs", {
                viewTitle: "Update Employee",
                employee: doc
            })
            console.log(doc)
        }
        else {
            console.log('error is edit employee:' + err)
        }
    })
})
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list')
        }
        else {
            console.log('error during delete records:' + err)
        }
    })
})
module.exports = router;