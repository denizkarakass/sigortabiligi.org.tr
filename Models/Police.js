const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoliceSchema = new Schema({
  saseNo: {
    type: String, 
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  quantity:{
      type:String,
      },
  date:{
    type:String,
  }
});



const Police = mongoose.model("Police",PoliceSchema);
module.exports = Police;