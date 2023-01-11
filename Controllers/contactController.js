const Contact = require('../Models/Contact');



exports.updateContact = async (req, res) => {
  try {    
    const contact = await Contact.findById({_id:req.params._id});
    contact.phone = req.body.phone;
    contact.phone2 = req.body.phone2;
    contact.whatsapp = req.body.whatsapp;
    contact.email = req.body.email;
    contact.help_text = req.body.help_text;
    contact.save();

    res.status(200).redirect('/iletisim-duzenle');

  }  catch (error) {
    console.log(error);
      res.status(400).redirect('/hata-police-update');
    }
  };

  exports.updateSozlesme = async (req, res) => {
    try {    
      const sozlesme = await Contact.findById({_id:req.params._id});
      sozlesme.uyelik = req.body.uyelik;
      sozlesme.aydinlatma = req.body.aydinlatma;
      sozlesme.save();
  
      res.status(200).redirect('/sozlesme-duzenle');
  
    }  catch (error) {
      console.log(error);
        res.status(400).redirect('/hata-police-update');
      }
    };






