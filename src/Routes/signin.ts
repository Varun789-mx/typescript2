import {Router} from "express"
import zod from "zod" 
import {getclient} from "../db/config";
import jwt from "jsonwebtoken"
import { status_code } from "./Status_code";


export const signinroute = Router();

const signinbody = zod.object({ 
	email:zod.string().email(),
	passoword:zod.string()
});



signin.post('/signin',(req,res):Promise<any>=> {
       try{ 
       	   const {email,password} = req.body;
           const safedata = signinbody.safeParse({email,password});
		if(!safedata.success) { 
	    		return res.status(Bad_request).json({
				msg:"Incorrect inputs",
				error:safedata.error
			});
		}
	  const verifyuser = verifypass		

