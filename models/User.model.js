const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  rol: {
    type: String,
    enum: ["master", "player"],
  },

  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],

  adventures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adventure",
    },
  ],
});

module.exports = model("User", userSchema);
