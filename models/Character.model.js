const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema({
  created_by: { type: Schema.Types.ObjectId, ref: "User" },

  characterName: { type: String, unique: true },

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

  adventures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adventure",
    },
  ],
});

const Character = model("Character", characterSchema);

module.exports = User;
