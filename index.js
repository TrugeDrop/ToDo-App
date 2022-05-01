require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Message = require("./models/message");
const layout = require("express-ejs-layouts");

mongoose.connect(process.env.token, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(3000, () => console.log('Ready!'));
})
.catch(() => {
  console.log('Not ready!')
});

app.set("view engine", "ejs");
app.use(layout)
app.use(express.static("./public"));
app.set("layout", "inc/layout");
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  Message.find({}, function(err,msgs){
    res.render('form', { msgs: msgs });
  });
});

app.post('/ekle', async function (req, res) {
  const msg = new Message({
    msg: req.body.msg
  });
  msg.save();
  res.json(msg)
});

app.post('/sil', function(req,res) {
  Message.findByIdAndDelete(req.body.id, function(err){
    if(err) return res.json({ status: "err" });
    res.json({ status: "success" })
  });
});
