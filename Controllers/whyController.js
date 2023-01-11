const Why = require('../Models/Why');



exports.updateWhy = async (req, res) => {
  try {    
    const why = await Why.findById({_id:req.params._id});
    why.h1 = req.body.h1;
    why.p1 = req.body.p1;
    why.h2 = req.body.h2;
    why.p2 = req.body.p2;
    why.h3 = req.body.h3;
    why.p3 = req.body.p3;
    why.save();

    res.status(200).redirect('/neden-duzenle');

  }  catch (error) {
    console.log(error);
      res.status(400).redirect('/hata-police-update');
    }
  };








