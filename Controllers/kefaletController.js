const Kefalet = require('../Models/Kefalet');

 
exports.createKefalet = async (req, res) => {
  try {
  const kefalet = await Kefalet.create(req.body);
 
    res.status(201).redirect("/kefaletlerim");
  } catch (error) {
   res.status(400).redirect("/hata-police-add");
    console.log(error);
  } 
};

exports.updateKefalet = async (req, res) => {
  try {    
    const kefalet = await Kefalet.findById({_id:req.params._id});
    kefalet.status = req.body.status;
    kefalet.policeNo = req.body.policeNo;
    kefalet.verilis_date = req.body.verilis_date;
    kefalet.veren_sigorta = req.body.veren_sigorta;
    kefalet.firma_unvan = req.body.firma_unvan;
    kefalet.belge_pdf = req.body.belge_pdf;
    kefalet.save();

    res.status(200).redirect('/kefaletlerim');

  }  catch (error) {
    console.log(error);
      res.status(400).redirect('/hata-police-update');
    }
  };



  exports.deleteKefalet = async (req, res) => {
    try {    
  
      const kefalet = await Kefalet.findOneAndRemove({_id:req.params._id})
  
  
      res.status(200).redirect('/kefaletlerim');
  
    } catch (error) {
      res.status(400).json({
        status: 'delete kefalet fail',
        error,
      });
    }
  };






