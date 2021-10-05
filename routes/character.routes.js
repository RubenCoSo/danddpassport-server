const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Character = require("../models/Character.model");
const User = require("../models/User.model");

router.post("/newCharacter" , (req, res, next) => {
  const { name, race, characterClass, created_by, userId } = req.body;

  Character.create({ characterName: name, race, class: characterClass, created_by })
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

router.put("/character/equipment", (req, res, next) => {
  const {equipmentPerClass, hitDiceThrow, choosedEquipment, savingThrows, characterId} = req.body;
  const equipment = [...equipmentPerClass,...choosedEquipment]
  Character.findByIdAndUpdate(characterId, {equipment:equipment,savingThrows:savingThrows,hitDiceThrow: hitDiceThrow}, {new:true})
  .then((response) =>  {
    console.log(response); 
    res.json(response)
  })  
  .catch((err) => res.json(err))

})

router.put("/characteredit", (req, res, next) =>{
  const {skills,equipment,basicSkills,level,strength,wisdom,charisma,intelligence,dexterity,constitution} = req.body;
  Character.findByIdAndUpdate( )
  .then((response) =>  {
    console.log(response); 
    res.json(response)
  })  
  .catch((err) => res.json(err))
})


router.get("/character/:id",(req,res)=>{
  const id = req.params.id

  Character.findById(id)
  .then((character)=> res.json(character))
  

})

router.post("/delete", (req,res)=>{
   const {character} =req.body;
   Character.findByIdAndDelete(character)
   .then((reponse)=> res.json(response))
   .catch((err) => res.json(err))

} )





module.exports = router;
