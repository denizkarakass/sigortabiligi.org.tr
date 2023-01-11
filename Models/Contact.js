const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {
    type: String, 
  },
  phone2: {
    type: String, 
  },
  whatsapp: {
    type: String, 
  },
  email: {
    type: String, 
  },
  help_text: {
    type: String, 
  },
  customer1: {
    type: String, 
  },
  customer2: {
    type: String, 
  },
  customer3: {
    type: String, 
  },
  customer4: {
    type: String, 
  },
  uyelik: {
    type: String, 
  },
  aydinlatma: {
    type: String, 
  },
  
});



const Contact = mongoose.model("Contact",ContactSchema);
module.exports = Contact;