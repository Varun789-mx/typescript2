import { Router } from "express";
import zod from "zod";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";
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
        const findquery = `SELECT EXISTS(SELECT 1 FROM paytmuser WHERE email = $1)`;
        const client = await getclient();
        if (!client) {
            throw new Error("failed to get db client");
        }
        const result = await client.query(findquery, [email]);
        return result.rows[0].exists;
    }
    catch (error) {
        console.error("Error in checking the email", error);
    }
}

userRouter.post('/signup', async (req, res): Promise<any> => {
    try {
        const ruff: user_fields = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        };
        const data = signupbody.safeParse(ruff);
        if (!data.success) {
            return res.status(status_code.Bad_Request).json({
                msg: "Incorrect inputs",
                error: data.error.issues
            });
        }
        const prevuser = await ExistingUser(ruff.email);
        if (prevuser.rows[0].exists) {
            return res.status(status_code.Bad_Request).json({
                message: "User already exists",
            });
        }
        const userId = await createuser(ruff);
        if (userId === undefined || userId === null) {
            return res.status(status_code.Internal_Server_Error).json({
                msg: "Error in creating user"
            });
        }
        const token = jwt.sign({ email: ruff.email }, jwtsecret);
        return res.status(status_code.Success).json({
            msg: "user successfully created",
            userId: userId,
            token: `Bearer ${token}`
        });
    } catch (error: any) {
        console.error("Error in creating user", error);
        return res.status(status_code.Internal_Server_Error).json({
            msg: "Error in creating user",
            error: error.message
        });
    }
});


