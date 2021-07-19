const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Currency = require('../models/currency');


router.get('/', (req, res, next) => {
    Currency.find().exec().then(docs => {
        console.log(docs);
        if(docs.length >= 0 ) {
            res.status(200).json(docs);
        } else {
            res.status(200).json({
                message: 'No entries found'
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const currency = new Currency({
        abbreviation: req.body.abbreviation,
        name: req.body.name
    });
    currency
        .save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST requests to /currencylist",
            createdCurrency: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });    
});

router.get('/:abbreviation', (req, res, next) => {
    const id = req.params.abbreviation;
    Currency.findById(id).exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.patch('/:abbreviation', (req, res, next) => {
    const id = req.params.abbreviation;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Currency.updateOne({ _id: id }, { $set:updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:currencyId', (req, res, next) => {
    const id = req.params.currencyId;
    Currency.remove({ _id: id }).exec()
    .then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;