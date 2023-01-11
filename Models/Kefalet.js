const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KefaletSchema = new Schema({
belgeNo:{
  type:String,
},
policeNo:{
  type:String,
},
firma_unvan:{ 
  type:String,
},
vergi_no:{
  type:String,
},
verilis_date:{
  type:String,
},
veren_sigorta:{
  type:String,
},
belge_pdf:{
  type:String,
},
status:{
  type: String,
  enum:["aktif", "pasif"],
  default: "pasif"
},
kefalet_senedi_no:{
  type:String,
  //required:true,
},
});



const Kefalet = mongoose.model("Kefalet",KefaletSchema);
module.exports = Kefalet;