import express, { Request, Response } from "express";
import zod from "zod";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";	
import cors from "cors";
import { status_code } from "./Status_code";
import { createuser } from "../db/Insertuser";
const Router = express.Router();
Router.use(express.json());
Router.use(cors());
const jwtsecret = "samplestring";
const port = 5000;

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
    email: zod.string().email(),
    mobile: zod.string().min(5, "mobile no should be atleast 10 digits long"),
    password: zod.string().min(8, "password should be atleast 8 characters long")
});

async function ExistingUser(email: string) {
    try {
        const query = `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`;
        const client = await getclient();
        if (!client) {
            throw new Error("failed to get db client");
        }
        const result = await client.query(query, [email]);
        return result.rows[0].exists;
    }
    catch (error) {
        console.error("Error in checking the email", error);
    }
}


Router.post('/signup', async (req: Request, res: Response): Promise<any> => {
    try {
        const { success } = signupbody.safeParse(req.body);
        if (!success) {
            return res.status(status_code.Success).json({
                msg: "Incorrect inputs",
                error: Error,
            });
        }
        const prevuser = await ExistingUser(req.body.email);
        if(!prevuser) {
            return res.status(status_code.Bad_Request).json({
                message:"User already exists",
            });
        }
	const adduser = createuser(req.body);
	if(!adduser) {
		return res.status(status_code.Failed).json({
			message:"Error in creating user",}
		 );
	}
	const token = jwt.sign({email: req.body.email},jwtsecret);
	return res.status(status_code.Success).json({
	msg:"user succesfully created",
	token:token 
	});
    } catch (error) {
        console.log("error occured while signup", error);
    }
});

export {Router};
