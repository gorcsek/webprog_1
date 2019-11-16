"use strict";
var express = require('express');
var router = express.Router();

let jwt = require('jsonwebtoken');
let config = require('../config');
var User = require('../models/User');

router.route('/').post((req, res) => {
  var user = new User(req.body);
   	User.find((err, money) =>{
   		 let token = jwt.sign({username: money.username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
   		//res.status(200).json({'message': 'Success'});
   	})
   	.catch(err => {
    	res.status(400).send("Error when saving to database");
   	});
});

module.exports = router;