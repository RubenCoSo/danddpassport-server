const { Schema, model } = require("mongoose");

const monsterSchema = new Schema({


  name: { type: String},


});

const Monster = model("Monster", monsterSchema);

module.exports = Monster;