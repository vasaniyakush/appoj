const express = require("express")
const judgeRouter = express.Router()
const fs = require('fs')
judgeRouter.post("/", async (req,res)=>{
    if(!req.body.code || req.body.code == ""){
        res.status(400).json({message:"No Code Found"})
    }
    // let response = await fetch("../problems/Input.txt")
    // const input = await response.text()
    // response = await fetch("../problems/Output.txt")
    // const output = await response.text()
    // const code = req.body.code
    // console.log(str)
    let str2 = "bWFpbi5jcHA6IEluIGZ1bmN0aW9uIOKAmGludCBtYWluKCnigJk6Cm1haW4u\nY3BwOjI6MzU6IGVycm9yOiDigJhjcmV0dXJu4oCZIHdhcyBub3QgZGVjbGFy\nZWQgaW4gdGhpcyBzY29wZQogICAgMiB8ICB1c2luZyBuYW1lc3BhY2Ugc3Rk\nOyBpbnQgbWFpbigpeyBjcmV0dXJuIDA7fQogICAgICB8ICAgICAgICAgICAg\nICAgICAgICAgICAgICAgICAgICAgICBefn5+fn5+Cg==\n"
    var buffer = Buffer.from(str2,"base64"); 
    console.log(buffer.toString());
    // var strings = str2.split("\\n");
    var ans = buffer.toString()
    // strings.map((ones)=>{

    //     var buffer = Buffer.from(ones,"base64"); 
    //     ans += "\n"+  buffer.toString();
    // })
    res.send(ans);
})


module.exports = judgeRouter