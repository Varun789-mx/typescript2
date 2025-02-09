import express from "express";
import zod, { any } from "zod";
import { pool } from "pg";
import cors from "cors";
import {Status_code} from "./Status_code";
const Router = express.Router();
Router.use(express.json());
Router.use(cors());

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

 async function ExistingUser(email:string) {
    try {
        const query = `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`;
        const result = await pool.query(query, [email]);
        return result.rows[0].exists;
    }
    catch (error) {
        console.error("Error in checking the email", error);
    }
}


Router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { success } = signupbody.safeParse(req.body);
        if (!success) {
            return res.status(Status_code.Success).json({
                msg: "Incorrect inputs",
                error: Error,
            });
        }

    }catch(error) { 
	    console.log("error occured while signup",error);
    }
 });
