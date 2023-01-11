const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
//const fileUpload = require('express-fileupload');
const pageRoute = require("./Routes/pageRoute"); 

const Why = require('./Models/Why');
const Contact = require('./Models/Contact');

const app = express();

//Connect DB
mongoose.connect('mongodb+srv://denizkarakas:727302dk@cluster0.nq6wqwl.mongodb.net/?retryWrites=true&w=majority',{
   /*  useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true */
}).then(()=>{
    console.log("DB connected succesful!")
});

//Template Engine
app.set('view engine', 'ejs');

//Global variables
global.userIN = null;
global.contact =  Contact.findOne();
global.contact =  Why.findOne();

  
//Middlewares
app.use(express.static('Public'));
//app.use(fileUpload());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://denizkarakas:727302dk@cluster0.nq6wqwl.mongodb.net/?retryWrites=true&w=majority' }),
}))

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);


//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);

app.use(function(req,res,next){
  res.status(404).render('404', {
    page_name: '404',
   // title:'Bulunamadı | Exnoremo ',
   // description:'Aradığınız sayfayı bulamadık. 404 HATA'
  })
});


app.listen(process.env.PORT || 5000,() => {
  console.log(`Àpp started on port 5000`);
});