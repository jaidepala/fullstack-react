const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const TemplateSchema = new Schema(
  	{
	    type: String,
    	label: String,
    	placeholder: String,
    	helperText: String,
    	options: Array
  	},
  	{ 
  		timestamps: true 
  	}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Template", TemplateSchema);