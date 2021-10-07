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

router.put('/adventureCharacters',(req,res)=>{
  const { adventureId, addedCharactersId} =req.body
  Adventure.findById(adventureId)
  .then((adventure)=>{
   const filtChar = addedCharactersId.filter((character)=> !adventure.characters.includes(character))
   console.log(filtChar);
    Adventure.findByIdAndUpdate(adventureId,{$push:{characters: {$each:filtChar}}},{new:true})
      .then((adventure)=>{
        console.log(adventure);
        //  res.json(adventure)
        
      })
  
    
  })
})


router.get('/charactersInAdventure/:id',(req,res)=>{

  const adventureId = req.params.id

  Adventure.findById(adventureId)
    .populate('characters')
    .then((adventure)=>res.json(adventure))
    .catch((err) => res.json(err));
})

router.get('/adventure/allCharacters',(req,res)=>{
  Character.find({})
  .then((characters)=>{
    res.json(characters)
  })
})




module.exports = router;
