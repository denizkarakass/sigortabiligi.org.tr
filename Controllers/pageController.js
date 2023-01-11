const express = require('express')
const User = require("../Models/User");
const Police = require("../Models/Police");
const Kefalet = require("../Models/Kefalet");
const Why = require('../Models/Why');
const Contact = require('../Models/Contact');

const app = express();
 

exports.getIndexPage =  async (req, res) => {
  const why =  await Why.findOne();
  const contact =  await Contact.findOne();
     res.status(200).render('index', {
       page_name: 'index',
       why,
       contact
     });
   };

   exports.getAboutPage =  async (req, res) => {
    const why =  await Why.findOne();
    const contact =  await Contact.findOne();    res.status(200).render('about', {
      page_name: 'about',
      why,
      contact
    });
  };

   exports.getLoginPage =  async (req, res) => {
    const contact =  await Contact.findOne();
    res.status(200).render('login', {
      page_name: 'login',
      contact,
    });
  };

  exports.getSignupPage =  async (req, res) => {
    const contact =  await Contact.findOne();
    res.status(200).render('signup', {
      page_name: 'signup',
      contact,
    });
  };

  exports.getDashboardPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const adminPage = 'welcome';
    res.status(200).render('dashboard', {
      page_name: 'Yönetim Paneli',
      user,
      adminPage,
    });
  };
 
  exports.getPoliceAddPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const adminPage = 'police-edit-page';
    res.status(200).render('dashboard', {
      page_name: 'Poliçe Ekleme',
      user,
      adminPage,
    });
  };

  exports.getKefaletAddPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const adminPage = 'kefalet-edit-page';
    res.status(200).render('dashboard', {
      page_name: 'Kefalet Sigortası Ekleme',
      user,
      adminPage,
    });
  };


  exports.getAllPolices =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const query = req.query.search;
    let filter = {};
    if(query){
      filter ={saseNo:query}
    }
    if(!query){
      filter.saseNo="";
    }
    const polices = await Police.find(
     { $or:[
      {saseNo: { $regex: '.*' + filter.saseNo + '.*', $options: 'i'}},
    ]}
    );

    const adminPage = 'all-polices';
    res.status(200).render('dashboard', {
      page_name: 'Tüm Eklenen Poliçeleriniz',
      user,
      polices,
      adminPage,
    });
  };


  exports.getAllKefalet =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const queryKefalet = req.query.searchKefalet;
    let filterKefalet = {};
    if(queryKefalet){
      filterKefalet ={policeNo:queryKefalet}
    }
    if(!queryKefalet){
      filterKefalet.policeNo="";
    }
    const kefalets = await Kefalet.find(
     { $or:[
      {policeNo: { $regex: '.*' + filterKefalet.policeNo + '.*', $options: 'i'}}
    ]}
    );

    const adminPage = 'all-kefalets';
    res.status(200).render('dashboard', {
      page_name: 'Tüm Eklenen Kefalet Sigortalarınız',
      user,
      kefalets,
      adminPage,
    });
  };


  exports.getPoliceUpdatePage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const police=  await Police.findOne({_id:req.params._id});
    const adminPage = 'police-update-page';
    res.status(200).render('dashboard', {
      page_name: 'Poliçe Güncelleme',
      user,
      police,
      adminPage,
    });
  };

  exports.getKefaletUpdatePage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const kefalet=  await Kefalet.findOne({_id:req.params._id});
    const adminPage = 'kefalet-update-page';
    res.status(200).render('dashboard', {
      page_name: 'Poliçe Güncelleme',
      user,
      kefalet,
      adminPage,
    });
  };

  exports.getUserUpdatePage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const users=  await User.findOne({_id:req.params._id});
    const adminPage = 'user-update-page';
    res.status(200).render('dashboard', {
      page_name: 'Kullanıcı Bilgilerini Güncelleme',
      user,
      users, 
      adminPage,
    });
  };


  exports.getSaseSorguPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const police=  await Police.findOne({_id:req.params._id});
    const adminPage = 'sase-no-sorgu';
    res.status(200).render('dashboard', {
      page_name: 'Şase No İle Poliçe Sorgula',
      user,
      police,
      adminPage,
    });
  };

  exports.getKefaletSorguPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const kefalet=  await Kefalet.findOne({_id:req.params._id});
    const adminPage = 'kefalet-no-sorgu';
    res.status(200).render('dashboard', {
      page_name: 'Kefalet Sigorta Sorgulama',
      user,
      kefalet,
      adminPage,
    });
  };


  exports.getWhyPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const why =  await Why.findOne();
    const adminPage = 'why-edit';
    res.status(200).render('dashboard', {
      page_name: 'Niçin Bloğu Düzenleme',
      user,
      why,
      adminPage,
    });
  };

  
  exports.getCustomersPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const customers =  await Contact.findOne();
    const adminPage = 'customers-edit-page';
    res.status(200).render('dashboard', {
      page_name: 'Müşteriler Bloğu Düzenleme',
      user,
      customers,
      adminPage,
    });
  };

  exports.getSozlesmePage =  async (req, res) => {
    const user=  await User.findOne({_id:req.params._id});
    const sozlesme =  await Contact.findOne();
    const adminPage = 'sozlesme-edit-page';
    res.status(200).render('dashboard', {
      page_name: 'Sözleşmeleri Düzenleme',
      user,
      sozlesme,
      adminPage,
    });
  };

  exports.getContactPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const contact =  await Contact.findOne();
    const adminPage = 'contact-edit';
    res.status(200).render('dashboard', {
      page_name: 'İletişim Bloğu Düzenleme',
      user,
      contact,
      adminPage,
    });
  };


  exports.getUserManagePage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const users=  await User.find();
    const contact =  await Contact.findOne();
    const adminPage = 'user-manage';
    res.status(200).render('dashboard', {
      page_name: 'Üye Yönetimi',
      user,
      users, 
      contact,
      adminPage,
    });
  };

  exports.getUserManageYetkiPage =  async (req, res) => {
    const user=  await User.findOne({_id:req.session.userID});
    const users=  await User.findOne({_id:req.params._id});
    const contact =  await Contact.findOne();
    const adminPage = 'user-manage-yetki';
    res.status(200).render('dashboard', {
      page_name: 'Yetki Verme / Yetki Alma',
      user,
      users,
      contact,
      adminPage,
    });
  }; 

  // Hata ve Başarılı Sayfaları

  exports.getSuccessPage =  async (req, res) => {
    res.status(200).render('adminPartials/success', {
      page_name: 'success',
    });
  };




  exports.getErrorPoliceAddPage =  async (req, res) => {
    res.status(200).render('adminPartials/error', {
      page_name: 'hata',
      errorMessage: 'Poliçe ekleme işleminde sorun oluştu 10 saniye içinde poliçe ekleme sayfasına geri yönlendiriyoruz.',
    });
  };

  exports.getErrorPoliceUpdatePage =  async (req, res) => {
    res.status(200).render('adminPartials/error', {
      page_name: 'hata',
      errorMessage: 'Poliçe güncelleme işleminde sorun oluştu 10 saniye içinde poliçe güncelleme sayfasına geri yönlendiriyoruz.',
    });
  };
