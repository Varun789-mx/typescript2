import {Router} from "express";
import zod from "zod";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";
import cors from "cors";
import { status_code } from "./Status_code";
import { createuser } from "../db/Insertuser";
export const userRouter = Router();
const jwtsecret = "samplestring";



  interface user_fields {
      firstname: string,
      lastname: string,
      email: string,
      mobile: string,
      password: string,
  }



 const signupbody = zod.object({
     firstname: zod.string(),
     lastname: zod.string(),
     email: zod.string(),
     mobile: zod.string(),
     password: zod.string()
 });


 async function ExistingUser(email: string) {
     try {
         const findquery = `SELECT EXISTS(SELECT * FROM paytmuser WHERE email = $1)`;
         const client = await getclient();
         if (!client) {
             throw new Error("failed to get db client");
         }
         const result = await client.query(findquery, [email]);
         return result;
     }
     catch (error) {
         console.error("Error in checking the email", error);
     }
 }

 userRouter.post('/signup', async (req,res):Promise<any>=> {
     try {
	  const ruff:user_fields = {
	  firstname:req.body.firstname,
	  lastname:req.body.lastname,
	  email:req.body.email,
	  mobile:req.body.mobile,
	  password:req.body.password
	  };
         const data  = signupbody.safeParse(ruff);
	 console.log(ruff);
         if (!data.success) {
             return res.status(status_code.Success).json({
                 msg: "Incorrect inputs",
                 error: data.error.issues
             });
         }
         const prevuser = await ExistingUser(req.body.email);
         if(prevuser) {
             return res.status(status_code.Bad_Request).json({
                 message:"User already exists",
             });
         }
         const adduser = await createuser(req.body);
         const token = await jwt.sign({email: req.body.email},jwtsecret);
         return res.status(status_code.Success).json({
         msg:"user succesfully created",
         token:token
         });
     } catch (error) {
         console.log("error occured while signup", error);
     }
 });


