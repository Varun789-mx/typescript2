import { Router } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";
import { status_code } from "./Status_code";


export const signinroute = Router();

const signinbody = zod.object({
	email: zod.string().email(),
	password: zod.string()
});
async function Checkuser(email: string, password: string) {
	const hash = finduser(email);
	const match = await bcrypt.compare(password, hash);
	if (match) {
		return true;
	}
	return false;
}
async function finduser(email: string) {
	const client = getclient();
	const findquery = `SELECT * FROM paytmuser WHERE email = $1 RETURNING password`;
	try {
		const findres = await (await client).query(findquery, [email]);
		return findres;
	}
	catch (error) {
		console.error("User doesn't exist please signup ");
	}
}
signinroute.post('/signin', (req, res) => {
	try {
		const { email, password } = req.body;
		const safedata = signinbody.safeParse({ email, password });
		if (!safedata.success) {
			return res.status(status_code.Bad_Request).json({
				msg: "Incorrect inputs",
				error: safedata.error
			});
		}
		const verifyuser = Checkuser(safedata.data.email, safedata.data.password);
		if (!verifyuser) {
			return res.status(status_code.Bad_Request).json({
				msg: "Incorrect password"
			});
		}
	}
	catch (error) {
		return res.status(status_code.Request_timeout).json({
			msg: "Request failed"
		});
	}
}
);
