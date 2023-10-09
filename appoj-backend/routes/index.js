var express = require('express');
var router = express.Router();
const { fileUpload } = require('../middleware/multerConfig');
const { password } = require('../constants');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/submit-file", verifypassword,fileUpload.single("file"), uploadFiles);

function uploadFiles(req, res) {
  
    console.log(req.body);
    console.log(req.file);
    res.status(200).json({ message: "Successfully submitted files" });
}
function verifypassword(req,res,next){
  console.log(req.headers.password,password);
  if(req.headers.password != password){
    res.status(403).json({message:"Invalid password"})
  }
  else{
    next()
    return
  }
}
module.exports = router;
