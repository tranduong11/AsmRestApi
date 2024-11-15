var express = require('express');
var router = express.Router();




// MongoDB
// cách kết nối thao tác với MongoDB
const mongodb = 'mongodb+srv://duongttph50748:idThuOdMfKwwmu5J@cluster0.6pk2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose');
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
  console.log("Connected to mongodb")
}).catch(err => {
  console.log(err)
});

// query dữ liệu và hiển thị trên EJS
// Query dữ liệu và trả về Json từ MongoDB

const student = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
})

const STUDENT = mongoose.model('student', student)

router.get('/getDataBase', function (req, res) {
  STUDENT.find({}).then(result => {
    res.send(result)
  })
})

router.get('/createUser', function (req, res) {
  const student = new STUDENT({
    name: "Trần Dương",
    address: "Ninh bình",
    phone: "0346595709"
  })
  student.save().then(result => {
    res.send(result)
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trần Trọng Dương một hai ba bốn năm' });
});

//định nghĩa các chức năng

router.get('/demo', function(req, res, next) {
  res.send('Hehehehehehehe');
});
router.get('/user', function(req, res) {
  //req: đối tượng chứa các tham số mà phía client gửi lên: trình duyệt, android, postman, ...
  //res: đối tượng kiểm soát cách giữ liệu được trả về cho client
  //trả về 1 file html, trả về 1 biến, trả về 1 array object, hay trả về 1 json data
  var jsonData=[{
    id: 1,
    name: 'Nguyen Van A',
    age: 20
  },
    {
      id: 2,
      name: 'Nguyen Van B',
      age: 22
    },{
      id: 3,
      name: 'Nguyen Van C',
      age: 25
    }
  ]
  res.render('users',{name:'Buoi',data:jsonData})
});
router.post('/createUser',function (req,res) {
  //Thuộc tinh sau biến body là thuộc tính trong thẻ input
  //req.body.name: lấy giá trị của thẻ input có thuộc tính name="name"
    //req.body.age: lấy giá trị của thẻ input có thuộc tính name="age"
  //ví dụ:
  //<input type="text" name="name">
  //<input type="text" name="age">
  const  name = req.body.name;
    const age = req.body.age;
    const user=`{
        name: ${name},
        age: ${age}
    }`
    res.json(user);
})
module.exports = router;
