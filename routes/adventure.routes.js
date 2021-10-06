const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Character = require("../models/Character.model");
const User = require("../models/User.model");
const Adventure = require("../models/Adventure.model")



router.post("/newAdventure" , (req, res, next) => {
  const { created_by, userId, description, title} = req.body;

  console.log(req.body);

  Adventure.create({created_by,description, title})
    .then((newAdventure) => {
      res.json(newAdventure)
       User.findByIdAndUpdate(userId, {
        $push:{adventures: newAdventure._id }
      },{new:true})
      .then((modUser)=>console.log(modUser))
      

    })
    
    .catch((err) => res.json(err));
});




module.exports = router;
