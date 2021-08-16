const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require('../models/User');

// Register Page
router.get('/regadmin', (req, res) => res.render('regadmin'));

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Dashboard after login
router.get('/dashboard', (req, res) => res.render('dashboard'));


// Profile Page
// router.get('/profile', (req, res) => 
// res.render('profile', {
//   id:req.user._id,
//     ic:req.user.ic,
//     name:req.user.name,
//     address:req.user.address,
//     phone:req.user.phone,
//     account:req.user.account,
//     email:req.user.email
// }));



// Usage Page
// router.get('/usage', (req, res) => res.render('usage'));

//Register Handle
router.post('/regadmin', (req, res) => {
    const { name, phone, email, password, password2 } = req.body;
    let errors = [];

  if (!name || !phone || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('regadmin', {
      errors,
      name,
      phone,
      email,
      password,
      password2
    });
  } else {
    //Validation Passed
    User.findOne({email:email})
    .then(user => {
        if(user){
        //User exists
        errors.push({msg: 'Email is already registered'});
        res.render('regadmin', {
            errors,
            name,
            phone,
            email,
            password,
            password2
          });
    } else{
        const newUser = new User({
          name,
          phone,
          email,
          password
        });

        //Hash Password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              //Set password to hashed
              newUser.password = hash;
              //Save user
              newUser
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });

  //Login Handle
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });


//Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

// Edit password Page
router.get('/editpassword', (req, res) => 
res.render('editpassword', {
  id:req.user._id,
    name:req.user.name,
    phone:req.user.phone,
    email:req.user.email,
    password:req.user.password
}));

/*
router.put('/', (req, res) => {
    updateRecord(req,res);
    res.redirect('/profile');
 
 });
 
 function updateRecord(req, res) {
 User.findOne({_id:req.user.id},(err,doc)=>{
  //this will give you the document what you want to update.. then 
 doc.ic = req.body.ic;
 doc.name = req.body.name;
 doc.address = req.body.address;
 doc.phone = req.body.phone;
 doc.account = req.body.account;
 doc.email = req.body.email;
 doc.save(function(err,doc){
 
 });
 
  });
 }
*/

router.put('/:id', async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
 await user.save()
 res.redirect('/users/logout2')
  }catch {
    if (user == null) {
      res.redirect('/')
    } else {
      res.render('/users/logout2', {
        user: user,
        errorMessage: 'Error updating user'
      })
    }
  }
})

router.get('/logout2', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Successfully changed password! You can now login with your new password.');
  res.redirect('/users/login');
});

module.exports = router;