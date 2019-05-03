const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const TemplateSchema = new Schema({
  preview: [{
    // REF:
    // You cant use type in mongoose
    // https://stackoverflow.com/a/40593684

    questiontype: String,
  	label: String,
  	placeholder: String,
    helper: String,
    optionName: String,
    optionValue: String,
    question: String,
  	uuid: String,
  	options: [
      {
        optionValue: String,
        optionName: String
      }
    ]
  }]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Template", TemplateSchema);