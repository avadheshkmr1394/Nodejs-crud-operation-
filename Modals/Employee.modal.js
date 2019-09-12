const mongoose = require('mongoose');
var employeeschema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required'
    },
    email: {
        type: String,
        required: 'this field is required'
    },
    mobile: {
        type: String,
        required: 'this field is required'

    },
    city: {
        type: String,
        required: 'this field is required'
    }
});
employeeschema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(val));
}, 'Invalid e-mail')
employeeschema.path('mobile').validate((val) => {
    mobilenumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return mobilenumber.test(val);
}, 'Invalid Mobile Number')
mongoose.model('Employee', employeeschema)