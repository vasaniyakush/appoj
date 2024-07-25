// const fs = require("fs")
import fs from "fs";
// const path = require("path");
import path from "path";

const saveFile = (name,extention,file_content) =>{
  console.log(name, file_content,extention);
  const currdate = new Date()
  
  const pathtosave = `./public/submission/${currdate.getDate()}_${currdate.getMonth()}_${currdate.getFullYear()}`
  console.log("pathtosave",pathtosave);
  console.log("dirname",__dirname);
  fs.mkdirSync(pathtosave, { recursive: true })
  const finalPath = path.join(pathtosave,`${name}.${extention}`)

  fs.writeFile(finalPath, file_content, 'utf8', (err) => {
      if (err) {
          throw err;
      }
  });
}


module.exports = {saveFile}