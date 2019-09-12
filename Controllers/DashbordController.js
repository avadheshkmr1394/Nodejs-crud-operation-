const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('', (req, res) => {
    res.render('Dashbord/StudentDashbord.hbs', {
        viewTitle: "Welecome Dashbord"
    })
})

module.exports = router;