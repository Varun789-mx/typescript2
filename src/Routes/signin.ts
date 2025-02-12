import {Router} from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import {getclient} from "../db/config";
import jwt from "jsonwebtoken";
import { status_code } from "./Status_code";


export const signinroute = Router();

const signinbody = zod.object({ 
	email:zod.string().email(),
	password:zod.string()
});
async function Checkuser(email:string,password:string) { 
	const hash = finduser(email);
	const match = await bcrypt.compare(password,hash);
	if(match) { 
		return true;
	} 
	return false;
}
async function finduser(email:string) { 
	const client = getclient(); 
	const findquery = `SELECT * FROM paytmuser WHERE email = $1 RETURNING password`;
	try {
       	const findres = await client.query(findquery,email);
	return findres;
	}
	catch(error) { 
		console.error("User doesn't exist please signup ");
}
}

signin.post('/signin',(req,res):Promise<any> => {
       try{ 
       	   const {email,password} = req.body;
           const safedata = signinbody.safeParse({email,password});
		if(!safedata.success) { 
	    		return res.status(Bad_request).json({
				msg:"Incorrect inputs",
				error:safedata.error
			});
		}
	  const verifyuser = Checkuser(safedata.email,safedata.password);
	  if(!verify) { 
		  return res.status(Status_code.Bad_request).json({
			  msg:"Incorrect password"
		  });
	  }
       }
       catch(error) { 
	       res.status(Stauts_code.Request_timeout).json({
		       msg:"Request failed"
	       });
       }
}
);
