const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema({
  created_by: [{ type: Schema.Types.ObjectId, ref: "User" }],

  characterName: { type: String, unique: true },

  level: Number,

  race: String,

  class: String,

  hp: Number,

  stats: {
    str: Number,
    con: Number,
    dex: Number,
    int: Number,
    wis: Number,
    cha: Number,
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

  laguages: Array

});

const Character = model("Character", characterSchema);

module.exports = Character;
