const express = require("express")
const judgeRouter = express.Router()
const fs = require('fs')
const http = require('http');
const axios = require("axios")
judgeRouter.post("/", async (req,res)=>{
    try{
        if(!req.body.code || req.body.code == ""){
            res.status(400).json({message:"No Code Found"})
        }
        if(!req.body.lang_id || req.body.lang_id == ""){
            res.status(400).json({message:"Please send a language id"})
        }
        
        const problemFolder = "problem1" 
        const inputTestcases = fs.readFileSync(`./problems/${problemFolder}/Input.txt`)
        const expectedOutput = fs.readFileSync(`./problems/${problemFolder}/Output.txt`)
        const userCode = req.body.code
        let data = JSON.stringify({
            "source_code": userCode,
            "language_id": req.body.lang_id,
            "stdin": inputTestcases,
            "expected_output": expectedOutput
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:2358/submissions/?base64_encoded=false&wait=false',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          const response = await axios.request(config)
          const judgement = await new Promise(function (resolve, reject) {
            setTimeout(async function () {
              
              const judgement = await axios.get(`http://localhost:2358/submissions/${response.data.token}?base64_encoded=true&fields=stdout,stderr,status_id,language_id,compile_output`,{
                responseType: 'arraybuffer'
              }) 
              resolve(judgement)
            }, 2000);
          });
        //   const judgement = await response.json()
        let repj = await JSON.parse(Buffer.from(judgement.data, 'base64').toString());
        //   console.log("judgement",response.data);
        //   console.log(repj);
        // let str2 = repj.compile_output                                                                                                                                                                                                                               OyBpbnQgbWFpbigpeyBjcmV0dXJuIDA7fQogICAgICB8ICAgICAgICAgICAg
    let str =  "bWFpbi5jcHA6MToxOiBlcnJvcjog4oCYSTJsdVkyeDFaR1VnUEdsdmMzUnla\nV0Z0UGdvS0lIVnphVzVuSUc1aGJXVnpjR0ZqWlNCemRHUTdJQW9LSUdsdWRD\nQnRZV2x1S0hadmFXUXBJSHNLSUNCcGJuUWdlQ0JqYVc04oCZIGRvZXMgbm90\nIG5hbWUgYSB0eXBlCiAgICAxIHwgSTJsdVkyeDFaR1VnUEdsdmMzUnlaV0Z0\nUGdvS0lIVnphVzVuSUc1aGJXVnpjR0ZqWlNCemRHUTdJQW9LSUdsdWRDQnRZ\nV2x1S0hadmFXUXBJSHNLSUNCcGJuUWdlQ0JqYVc0K1BuZzdDaUFnWTI5MWRE\ndzhlRHNLSUNCamNtVjBkWEp1SURBN0NuMD0KICAgICAgfCBefn5+fn5+fn5+\nfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+\nfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn4K\n"
    let str2 = "bWFpbi5jcHA6IEluIGZ1bmN0aW9uIOKAmGludCBtYWluKCnigJk6Cm1haW4u\nY3BwOjI6MzU6IGVycm9yOiDigJhjcmV0dXJu4oCZIHdhcyBub3QgZGVjbGFy\nZWQgaW4gdGhpcyBzY29wZQogICAgMiB8ICB1c2luZyBuYW1lc3BhY2Ugc3Rk\nOyBpbnQgbWFpbigpeyBjcmV0dXJuIDA7fQogICAgICB8ICAgICAgICAgICAg\nICAgICAgICAgICAgICAgICAgICAgICBefn5+fn5+Cg==\n"
    const errM =  repj.compile_output? repj.compile_output: (repj.stderr?repj.stderr : null);
    var buffer =  errM?Buffer.from(errM,"base64"):null; 
    console.log(buffer.toString());
        // (await JSON.parse(Buffer.from(judgement.data, 'base64').toString())).compile_output.split("\\n").map((op)=>{
            // (str.split("\\n")).map((op)=>{

            //     var buffer = Buffer.from(op,"base64"); 
            //         console.log(buffer.toString());
            //   })
        // res.send(buffer.toString())
        res.status(200).json({
            token:response.data, 
            judgement:repj, decoded: errM? buffer.toString():"None"  });
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
    })















judgeRouter.post("/custom", async (req,res)=>{
    try{
        if(!req.body.code || req.body.code == ""){
            res.status(400).json({message:"No Code Found"})
        }
        if(!req.body.input){
            res.status(400).json({message:"Please give custom input testcases for custom output"})
        }
        
        const problemFolder = "problem1" 
        const input = fs.readFileSync(`./problems/${problemFolder}/Input.txt`)
        const output = fs.readFileSync(`./problems/${problemFolder}/Output.txt`)
        const code = req.body.code

        res.send("working " + content);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
    })
    
    
    module.exports = judgeRouter