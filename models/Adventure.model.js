const { Schema, model } = require("mongoose");

const adventureSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],

  monsters: [
    {
      trype: Schema.Types.ObjectId,
      ref: "Monster",
    },
  ],
});

const Adventure = model("Adventure", adventureSchema);
