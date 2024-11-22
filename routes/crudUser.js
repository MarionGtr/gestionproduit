const express = require('express');
const router = express.Router();
const db = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/addUser' , async (req, res) => {
    const {prenom, email, password} = req.body;

    const securedPassword = await bcrypt.hash(password, 10);

    const insertUser = "insert into user (prenom, email, password) values (?,?,?);";
    db.query(insertUser, [prenom, email, securedPassword], (error, result) => {
        if(error) throw error;
        res.redirect('/product/allProduct');
    });
});

router.get('/signInForm', (req,res) => {
    res.render('signInPage');
});
router.get('/logInForm', (req,res) => {
    res.render('logInPage');
});

router.post('/logInUser', (req,res) => {
    const {email, password} = req.body;
const logInUser = "select email, password from user where email like ?;";
db.query(logInUser, [email], async (error, result) => {
    if(error) throw error;
    const decrypt = await bcrypt.compare(password, result[0].password);

    if(decrypt === true) {
        res.redirect('/product/allProduct');
    } else {
        res.redirect('/user/logInForm');
    }
});
});

module.exports = router;