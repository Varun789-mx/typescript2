import { Router } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";
const JWTSECRET = "securepass";
import { status_code } from "";

export const signinroute = Router();

const signinbody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
async function Checkuser(email: string, password: string) {
  const findres = await finduser(email);
  if (!findres || findres.rows.length === 0) {
    return false;
  }
  const hash: string = findres.rows[0].password;
  const match = bcrypt.compare(password, hash);
  if (!match) {
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
  } catch (error) {
    console.error("User doesn't exist please signup ");
  }
}
interface userfield {
  email: string;
  passwordL: string;
}
signinroute.post("/signin", async (req, res): Promise<any> => {
  try {
    const data: userfield = req.body;
    const safedata = signinbody.safeParse(data);
    if (!safedata.success) {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect inputs",
        error: safedata.error,
      });
    }
    const verifyuser = Checkuser(safedata.data.email, safedata.data.password);
    if (!verifyuser) {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect password",
      });
    }
    const token = jwt.sign({ email: safedata.data.email }, JWTSECRET);
    return res.status(status_code.Success).json({
      msg: "User logged in successfully",
      token: "Bearer" + token,
    });
  } catch (error) {
    return res.status(status_code.Request_timeout).json({
      msg: "Request failed",
    });
  }
});
