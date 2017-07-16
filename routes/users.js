var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: "register new user"
    })
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: "login exist user"
    })
});

router.post('/register', function (req, res, next) {
    /* Get form values */
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    /* Check for image filed */
    if (req.files[0].originalname.length > 0) {
        console.log("uploading files ...");
        /* file info */
        var ProfileImgOriginalName = req.files[0].originalname,
            ProfileImgName = req.files[0].filename,
            ProfileImgMime = req.files[0].mimetype,
            ProfileImgPath = req.files[0].path,
            // ProfileImgExt = req.files[0].extension,
            ProfileImgize = req.files[0].size
    }
    else {
        // set a default image.
        ProfileImgName = 'noImage.png';
    }
    /* form validation */
    // req.checkBody('name', 'name field is required').notEmpty();
    // req.checkBody('email', 'Email field is required').notEmpty();
    // req.checkBody('email', 'Email is not valid').isEmail();
    // req.checkBody('username', 'username field is required').notEmpty();
    // req.checkBody('password', 'password field is required').notEmpty();
    // req.checkBody('password2', 'password dose not match').equals(req.body.password);

    /* check for errors */
    // var errors = req.validationErrors;
    // if (errors) {
    //     res.render("register", {
    //         errors: errors,
    //         name: name,
    //         email: email,
    //         username: username,
    //         password: password,
    //         password2: password2
    //     })
    // } else {
    var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password,
        ProfileImg: ProfileImgName
    });
    /* Create user */
    User.createUser(newUser, function (err, user) {
        if (err) throw err;
        console.log(user);
    });
    /* success message */
    req.flash('success', 'you are now registered and may login');
    res.redirect("/");
    // }
});

module.exports = router;
