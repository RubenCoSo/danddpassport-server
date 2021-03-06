const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Character = require("../models/Character.model");
const User = require("../models/User.model");
const Adventure = require("../models/Adventure.model")
const Monster = require("../models/Monster.model")



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

router.post('/adventureMonsters', (req,res)=>{
  const { adventureId, addedMonsters} =req.body

  addedMonsters.forEach((monster)=>{
    Monster.create({name:monster})
    .then((addedMonster)=>{
      Adventure.findByIdAndUpdate(adventureId,{$push:{monsters:addedMonster._id}})
      .then((modAdv)=>{
        return res.json(modAdv)
      })
      .catch((err) => res.json(err));
    })
  })
})

router.post('/deleteMonster', (req,res)=>{

  const {monster} = req.body
  Monster.findByIdAndDelete(monster)
  .then((monster)=> res.json(monster))
  .catch((err) => res.json(err));
})

router.post('/deleteAdventure', (req,res)=>{

  const {adventure} = req.body
  Adventure.findByIdAndDelete(adventure)
  .then((adventure)=> res.json(adventure))
  .catch((err) => res.json(err));
})




router.get('/charactersInAdventure/:id',(req,res)=>{

  const adventureId = req.params.id

  Adventure.findById(adventureId)
    .populate('characters')
    .then((adventure)=>res.json(adventure))
    .catch((err) => res.json(err));
})

router.get('/monstersInAdventure/:id',(req,res)=>{

  const adventureId = req.params.id

  Adventure.findById(adventureId)
    .populate('monsters')
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
