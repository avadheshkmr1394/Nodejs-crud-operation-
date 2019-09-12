require('./Modals/db')


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser=require('body-parser');
const employeecontroller = require('./Controllers/employeeController');
const loginuser=require('./Controllers/LoginController');
const userdashboard=require('./Controllers/DashbordController');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views', __dirname + '/views');
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engin', 'hbs');

app.listen(3000, () => {
    console.log("express server started at port:3000");
}) 

app.use('/login',loginuser)
app.use('/employee', employeecontroller)
app.use('/dashbord/student',userdashboard)