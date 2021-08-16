const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('Admin'); 

// Welcome Page
router.get('/', (req, res) => res.render('login'));

// Register Page
// router.get('/register', (req, res) => res.render('register'));

// Register Page
router.get('/regadmin', (req, res) => res.render('regadmin'));

// Login Page
router.get('/login', (req, res) => res.render('login'));

// welcome Page
// router.get('/welcome', (req, res) => res.render('welcome'));

// Form Page
router.get('/usage', (req, res) => res.render('usage'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
    name:req.user.name
}));

// Dashboard
router.get('/register', ensureAuthenticated, (req, res) => 
res.render('register', {
    name:req.user.name
}));

// Profile
router.get('/profile', ensureAuthenticated, (req, res) => 
res.render('profile', {
    id:req.user._id,
    ic:req.user.ic,
    name:req.user.name,
    address:req.user.address,
    phone:req.user.phone,
    account:req.user.account,
    email:req.user.email
}));


// Profile
router.get('/editpassword', ensureAuthenticated, (req, res) => 
res.render('editpassword', {
    id:req.user._id,
    ic:req.user.ic,
    name:req.user.name,
    address:req.user.address,
    phone:req.user.phone,
    account:req.user.account,
    email:req.user.email,
    password:req.user.password
}));



module.exports = router;