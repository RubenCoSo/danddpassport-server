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
       User.findByIdAndUpdate(userId, {
        $push:{characters: newCharacter._id }
      },{new:true})
      .then((modUser)=>console.log(modUser))
      

    })
    
    .catch((err) => res.json(err));
});



router.put("/character", (req, res, next) => {
  const {strength, constitution, dexterity, wisdom, intelligence, charisma, characterId, speed, traits, image, languages} = req.body;
  Character.findByIdAndUpdate(characterId, {stats:{str:strength,con:constitution,dex:dexterity,int:intelligence,wis:wisdom,cha:charisma}, speed, traits, image, languages}, {new:true})
  .then((response) =>  res.json(response)) 
  .catch((err) => res.json(err))

})

router.put("/character/skills", (req, res, next) => {
  const {diceHits, skillsPerClass,choosedSkills, choosedBasicSkills, characterId} = req.body;
  console.log(req.body);
  let skills = [...skillsPerClass,...choosedSkills]
  Character.findByIdAndUpdate(characterId, 
    {skills: skills, basicSkills: choosedBasicSkills, hitDice:diceHits },{new:true})
  .then((response) =>{console.log(response); res.json(response)}) 
  .catch((err) => console.log(err))

})

router.put("/character/Equipment", (req, res, next) => {
  const {selectedEquipment, characterId} = req.body;
  Character.findByIdAndUpdate(characterId, {equipment:[...equipment,selectedEquipment]}, {new:true})
  .then((response) => {console.log(response); res.json(response)}) 
  .catch((err) => console.log(err))

})

router.put("/character/equipmentParameters", (req, res, next) => {
  const {equipmentPerClass, hitDiceThrow, characterId} = req.body;
  Character.findByIdAndUpdate(characterId, {equipment:[...equipment,equipmentPerClass], hitDiceThrow}, {new:true})
  .then((response) =>  res.json(response)) 
  .catch((err) => res.json(err))

})


router.get("/character/:id",(req,res)=>{
  const id = req.params.id

  Character.findById(id)
  .then((character)=> res.json(character))
  

})




module.exports = router;
