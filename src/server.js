const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')


const route = require('./routes');
const db = require('./config/db')
const AccountModel = require('./app/models/Account')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use(express.static(path.join(__dirname, 'public')));

//connect DB
db.connect();

// use middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

// Teamplate engine
app.engine(
  "hbs",handlebars({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

//register
app.post('/register', (req, res, next) => {
  var username = req.body.username
  var password = req.body.password
  var fullname = req.body.fullname
  var adremail = req.body.adremail
  var role = req.body.role

AccountModel.findOne({
  username: username,
})
  .then(data => {
    if (data) {
      res.json('Tài khoản đã tồn tại');
    } else {
      AccountModel.findOne({
        adremail: adremail,
      })
        .then(data => {
          if (data) {
            res.json('Địa chỉ email đã tồn tại');
          } else {
            bcrypt.hash(password, 10, function(err, hash) {
              // Store hash in your password DB.
              console.log(hash)
               AccountModel.create({
                username: username,
                password: hash,
                fullname: fullname,
                adremail: adremail,
                role: role,
              })
          })
        return res.render('login', {msg:'Dang ki thanh cong'})
          }
        })
        .catch(err => {
          console.error(err);
          res.json('Lỗi kiểm tra địa chỉ email');
        });
    }
  })
  .catch(err => {
    console.error(err);
    res.json('Lỗi kiểm tra tài khoản');
  });
  })

// //Login
// app.post('/login', (req, res, next) => {
//   var username = req.body.username
//   var password = req.body.password


//   AccountModel.findOne({
//       username: username,
//       password: password
//   })
//   .then(data=>{
//     if(data){
//       return res.json('dang nhap thanh cong');
//     }else{
//       return res.json('dang nhap that bai');
//     }
//   })
// })





//Route innit
route(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
