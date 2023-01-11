const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const res = require('express/lib/response');


exports.createUser = async (req, res) => {

  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/giris-yap");
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};




exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({email},(err,user)=>{if(user.password == password){
      req.session.userID = user._id;
      res.status(200).redirect("/yonetim-paneli");
    }})

   /*
    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect("/yonetim-paneli");
          }
        });
      }
    });
    */
  } catch (error) {
    res.status(400).res.redirect("/uye-ol");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
};




exports.updateUser = async (req, res) => {
  try {
    const users = await User.findById({ _id: req.params._id });
    users.name = req.body.name;
    users.email = req.body.email;
    users.save();

    res.status(200).redirect('/success');

  } catch (error) {
    console.log(error);
    res.status(400).redirect('/hata-police-update');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params._id);

    res.status(200).redirect('/users/logout');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};



exports.yetkiVer = async (req, res) => {
  try {
    const users = await User.findById({ _id: req.params._id });
    users.role = req.body.role;
    users.save();

    res.status(200).redirect('/user-manage');

  } catch (error) {
    console.log(error);
    res.status(400).redirect('/hata-police-update');
  }
};


