"use strict";
var express = require('express');
var router = express.Router();

var Money = require('../models/Money');

router.route('/create').post((req, res) => {
  var money = new Money(req.body);
   money.save().then( money => {
   res.status(200).json({'message': 'Money successfully added '});
   })
   .catch(err => {
    res.status(400).send("Error when saving to database");
   });
});

router.route('/').get((req, res) => {
  Money.find((err, money) =>{
    if(err){
      console.log(err);
    }
    else {
      res.json(money);
    }
  });
});

router.route('/:id').get((req, res) => {
  var id = req.params.id;
  Money.findById(id, (err, money) =>{
      res.json(money);
  });
});

router.route('/:id').put((req, res) => {
  Money.findById(req.params.id, (err, money) => {
    if (!money)
      return next(new Error('Error getting the money!'));
    else {
      money.user = req.body.user;
      money.amount = req.body.amount;
      money.description = req.body.description;
      money.save().then( money => {
          res.json('Money updated successfully');
      })
      .catch(err => {
            res.status(400).send("Error when updating the money");
      });
    }
  });
});

router.route('/:id').get((req, res) => {
  Money.findByIdAndRemove({_id: req.params.id}, (err,money) =>{
        if(err) res.json(err);
        else res.json('Money successfully removed');
    });
});

module.exports = router;