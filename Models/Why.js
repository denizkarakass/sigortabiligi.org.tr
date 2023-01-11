const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WhySchema = new Schema({
  h1: {
    type: String, 
    required: true,
  },
  p1: {
    type: String,
    required: true,
  },
  h2: {
    type: String, 
    required: true,
  },
  p2: {
    type: String,
    required: true,
  },
  h3: {
    type: String, 
    required: true,
  },
  p3: {
    type: String,
    required: true,
  },
  
});



const Why = mongoose.model("Why",WhySchema);
module.exports = Why;