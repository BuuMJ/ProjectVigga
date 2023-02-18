const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db')
const AccountModel = require('./app/models/Account')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

db.connect();

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
              return AccountModel.create({
                username: username,
                password: password,
                fullname: fullname,
                adremail: adremail,
                role: role,
              })
                .then(data => {
                  res.json('Tạo tài khoản thành công');
                })
                .catch(err => {
                  console.error(err);
                  res.json('Lỗi tạo tài khoản');
                });
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

    //Route innit
    route(app);