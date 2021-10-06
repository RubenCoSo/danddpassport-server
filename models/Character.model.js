const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema({
  created_by: String,

  characterName: { type: String, unique: true },

  level: Number,

  race: String,

  class: String,

  hp: Number,

  stats: {
    str: {type:Number, default: 0} ,
    con: {type:Number, default: 0} ,
    dex: {type:Number, default: 0} ,
    int: {type:Number, default: 0} ,
    wis: {type:Number, default: 0} ,
    cha: {type:Number, default: 0} ,
  },

  savingThrows:Array,

  skills:Array,
  
  basicSkills:Array,

  equipment:Array,

  attacks: Array,
  
  spellcasting: Array,

  armor: Number,

  initiative: Number,

  speed: Number,

  hitDice: Number,

  hitDiceThrow:Number,

  image: String,

  traits: Array,

  languages: Array

});

const Character = model("Character", characterSchema);

module.exports = Character;
