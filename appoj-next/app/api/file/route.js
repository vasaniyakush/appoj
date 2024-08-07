import { savePassword } from "@/constants";
import { saveFile } from "@/multerConfig";

// import { NextRequest } from "next/server";
export async function POST(request) {
    let req= {}
  try {
    req.body = await request.json();
    const file_content = atob(req.body.code)
    const password = request.headers.get('password');
    if(password == savePassword){
        const url = new URL(request.url);
        const queryParams = url.searchParams;
        const name = queryParams.get('name');
        const extention = queryParams.get('extention');
        console.log(name, file_content,extention,password);

        saveFile(name,extention,file_content)

    }
    else{
      // new Response
        return new Response(
            {
              message: "Invalid Password",
            },
            {
              status: 403,
              headers: {
                "Content-Type": "application/json",
              },
            }
            );
    }



    return new Response(
      JSON.stringify({
        message: "File Saved",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );  
        
    
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        err: err,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
  }
}
