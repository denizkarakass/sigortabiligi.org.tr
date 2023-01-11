const express = require("express")
const pageController = require("../Controllers/pageController");
const authController = require("../Controllers/authController");
const policeController = require("../Controllers/policeController");
const kefaletController = require("../Controllers/kefaletController");
const whyController = require("../Controllers/whyController");
const contactController = require("../Controllers/contactController");

const redirectMiddleware = require("../middlewares/redirectMidleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); 

router.route("/").get(pageController.getIndexPage);
router.route("/hakkimizda").get(pageController.getAboutPage);
router.route("/giris-yap").get(redirectMiddleware,pageController.getLoginPage);
router.route("/uye-ol").get(redirectMiddleware,pageController.getSignupPage);
router.route("/yonetim-paneli").get(authMiddleware,pageController.getDashboardPage);


router.route('/police-ekle').get(authMiddleware,pageController.getPoliceAddPage);
router.route('/policelerim').get(authMiddleware,pageController.getAllPolices);
router.route('/police/:_id').get(authMiddleware,pageController.getPoliceUpdatePage);

router.route('/kefalet-ekle').get(authMiddleware,pageController.getKefaletAddPage);
router.route('/kefaletlerim').get(authMiddleware,pageController.getAllKefalet);
router.route('/kefalet/:_id').get(authMiddleware,pageController.getKefaletUpdatePage);

router.route('/user-update/:_id').get(authMiddleware,pageController.getUserUpdatePage); 
router.route('/user-manage').get(authMiddleware,pageController.getUserManagePage);
router.route('/user-manage-update/:_id').get(authMiddleware,pageController.getUserManageYetkiPage);


router.route('/musteri-duzenle').get(authMiddleware,pageController.getCustomersPage);
router.route('/sozlesme-duzenle').get(authMiddleware,pageController.getSozlesmePage);
router.route('/neden-duzenle').get(pageController.getWhyPage);
router.route('/iletisim-duzenle').get(pageController.getContactPage);


//Sorgulama Sayfaları
router.route('/sase-no-sorgu').get(authMiddleware,pageController.getSaseSorguPage);
router.route('/kefalet-sorgulama').get(authMiddleware,pageController.getKefaletSorguPage);


//User İşlemleri 
router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/users/logout').get(authController.logoutUser);



//Yönetim paneli İşlemleri  
router.route('/police-add').post(policeController.createPolice);
router.route('/police-update/:_id').put(policeController.updatePolice);
router.route('/:_id').delete(policeController.deletePolice);

router.route('/kefalet-add').post(kefaletController.createKefalet);
router.route('/kefalet-update/:_id').put(kefaletController.updateKefalet);
router.route('/kefalet/:_id').delete(kefaletController.deleteKefalet);

router.route('/user-update/:_id').put(authController.updateUser);
router.route('/user/:_id').delete(authController.deleteUser);
router.route('/user-manage-update/:_id').put(authController.yetkiVer);

router.route('/why-update/:_id').put(whyController.updateWhy);
router.route('/contact-update/:_id').put(contactController.updateContact);
router.route('/sozlesme-update/:_id').put(contactController.updateSozlesme);


// Başarılı hatalı yönlendirmeler

router.route('/success').get(pageController.getSuccessPage);
router.route('/hata-police-add').get(pageController.getErrorPoliceAddPage);
router.route('/hata-police-update').get(pageController.getErrorPoliceAddPage);


module.exports = router;