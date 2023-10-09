const multer = require("multer");
const fs = require("fs")

const path = require("path");

let config;
let fileBaseUrl = "";

  config = multer.diskStorage({
    destination: function (req, file, cb) {
        const currdate = new Date()
        const pathtosave = `./public/submission/${currdate.getDate()}_${currdate.getMonth()}_${currdate.getFullYear()}`
        console.log("pathtosave",pathtosave);
        console.log("fs",fs.mkdirSync(pathtosave, { recursive: true }))
        
        console.log("cb path",path.join(__dirname, "."+pathtosave));
      cb(null, path.join(__dirname, "."+pathtosave));
    },
    filename: (req, file, cb) => {
      let name =
        `${req.query.name}.${req.query.extention}`
      file.link = name;
      cb(null, name);
    },
  });


const fileUpload = multer({
  storage: config,
  //TODO: file Filter
  fileFilter: function (req, file, cb) {
    // if (!file.originalname.match(/\.(png|jpg|JPG)$/)) {
    //   // upload only png and jpg format
    //   return cb(new ApiBadRequestError("Please Upload A Image"));
    // }
    if(!file.mimetype){
      throw new ApiBadRequestError("file does not have mimetype")
    }
    console.log("originalfile",file);
    cb(undefined, true);
  },
});

module.exports = { fileUpload };
