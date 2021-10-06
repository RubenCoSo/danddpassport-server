const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model")

router.get('/user/:id',(req,res)=>{

    console.log(`user`,req.params)
    User.findById(req.params.id)
    .populate('characters')
    .populate('adventures')
    .then((user)=>res.json(user))
    .catch((error) => res.json(error));
})


router.put('/user/:rol',(req,res) => {
   const {_id} = req.body
   const {rol} = req.params
    User.findByIdAndUpdate({_id}, {rol}, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
} )

module.exports = router;
