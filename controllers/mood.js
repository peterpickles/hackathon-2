var express = require("express");
var passport = require('../config/passportConfig.js');
var router = express.Router();
var db = require("../models");

router.get("/moodData",function(req,res){
    res.send("working");
})

module.exports = router;