const Police = require('../Models/Police');

 
exports.createPolice = async (req, res) => {
  try {
  const police = await Police.create(req.body);
 
    res.status(201).redirect("/policelerim");
  } catch (error) {
   res.status(400).redirect("/hata-police-add");
    console.log(error);
  } 
};

exports.updatePolice = async (req, res) => {
  try {    
    const police = await Police.findById({_id:req.params._id});
    police.saseNo = req.body.saseNo;
    police.model = req.body.model;
    police.quantity = req.body.quantity;
    police.date = req.body.date;
    police.save();

    res.status(200).redirect('/policelerim');

  }  catch (error) {
    console.log(error);
      res.status(400).redirect('/hata-police-update');
    }
  };



  exports.deletePolice = async (req, res) => {
    try {    
  
      const police = await Police.findOneAndRemove({_id:req.params._id})
  
  
      res.status(200).redirect('/policelerim');
  
    } catch (error) {
      res.status(400).json({
        status: 'delete police fail',
        error,
      });
    }
  };






