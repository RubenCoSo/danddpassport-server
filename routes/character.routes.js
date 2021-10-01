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

router.put("/character", (req, res, next) => {
  const {strength, constitution, dexterity, wisdom, inteligence, charisma, characterId, speed, traits, image, languages} = req.body;
  Character.findByIdAndUpdate(characterId, {stats:{str:strength,con:constitution,dex:dexterity,int:inteligence,wis:wisdom,cha:charisma}, speed, traits, image, languages}, {new:true})
  .then((response) =>  res.json(response)) 

})


router.get("/character/:id",(req,res)=>{
  const id = req.params.id

  Character.findById(id)
  .then((character)=> res.json(character))


})


module.exports = router;
