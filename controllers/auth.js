var express = require("express");
var passport = require('../config/passportConfig.js');
var router = express.Router();
var db = require("../models");

router.get("/signup", function(req, res) {
    res.render("auth/signup");
});

router.post("/signup", function(req, res, next) {
    console.log("REQ.BODY IS : ", req.body);
    db.user.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
    }).spread(function(user, wasCreated) {
        if (wasCreated) {
            //Good Job, you didn't try to make a duplicate
            passport.authenticate("local", {
                successRedirect: "/profile",
                sucessFlash: "Successfully logged in!"
            })(req, res, next);
        } else {
            //Bad job, you tried to sign up when you should've logged in (user account already exists);
            req.flash("error", "YOU DONE F*cked UP. Log you ass in fool");
            res.redirect("/auth/login")
        }
    }).catch(function(error) {
        req.flash("error");
        res.redirect("/auth/signup");
    });
});
router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    sucessFlash: "Login Successful!",
    failureRedirect: "/auth/login",
    failureFlash: "Invalid Credentials"
}));
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out");
    res.redirect("/");
});

module.exports = router;