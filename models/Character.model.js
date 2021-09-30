const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema({
  created_by: { type: Schema.Types.ObjectId, ref: "User" },

  characterName: { type: String, unique: true },

  level: Number,

  race: String,

  class: String,

  stats: {
    str: Number,
    con: Number,
    dex: Number,
    int: Number,
    wis: Number,
    cha: Number,
  },

  savingThrows:{
    str: Number,
    con: Number,
    dex: Number,
    int: Number,
    wis: Number,
    cha: Number,
  },

  skills:[Object],   //character.findbyid(idpersonaje)+> response.data.skills.indexof(ac

  weapons:Array,

  Attacks: Array,
  
  spellcasting: Array,

  armor: Number,

  initiative: Number,

  speed: Number,

  hitdice: String,

});

const Character = model("Character", characterSchema);

module.exports = Character;
