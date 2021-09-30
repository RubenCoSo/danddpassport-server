const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Character = require("../models/Character.model");
const User = require("../models/User.model");

router.post("/newCharacter" , (req, res, next) => {
  const { name, race, characterClass, userId } = req.body;

  Character.create({ characterName: name, race, class: characterClass })
    .then((newCharacter) => {
      res.json(newCharacter) 
      console.log()
       User.findByIdAndUpdate(userId, {
        $push:{characters: newCharacter._id }
      },{new:true})

    
      
      .then((response) =>  res.json(response)) 
    })
    
    .catch((err) => res.json(err));
});
module.exports = router;
