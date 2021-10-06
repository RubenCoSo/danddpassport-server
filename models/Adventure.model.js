const { Schema, model } = require("mongoose");

const adventureSchema = new Schema({
  created_by: String,

  title: { type: String, unique: true },

  description: String,

  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],


  monsters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Monster",
    },
  ],
});

const Adventure = model("Adventure", adventureSchema);


module.exports = Adventure;