import { Router } from "express";
import zod from "zod";
import bcrypt from "bcrypt";
import { getclient } from "../db/config";
import jwt from "jsonwebtoken";
const JWTSECRET = "securepass";
import { status_code } from "./Status_code";

export const signinroute = Router();

const signinbody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
async function Checkuser(email: string, password: string) {
  const findres = await finduser(email);
  if (!findres || findres === null || findres.rows.length === 0) {
    return false;
  }
  const hash: string | undefined = findres.rows[0]?.password;
  if (!hash) {
    return false;
  }
  const match = await bcrypt.compare(password, hash);
  if (!match) {
    return false;
  }
  return true;
}
async function finduser(email: string) {
  const client = await getclient();
  try {
    const findquery = `SELECT password FROM paytmuser WHERE email = $1`;
    const findres = await client.query(findquery, [email]);
    return findres;
  } catch (error) {
    console.error("An error occurred while fetching the user");
    return null;
  } finally {
    // No need to close the client as we are using a connection pool
  }
}
interface userfield {
  email: string;
  password: string;
}

signinroute.post("/signin", async (req, res): Promise<any> => {
  try {
    const userData: userfield = req.body;
    const safedata = signinbody.safeParse(userData);
    if (!safedata.success) {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect inputs",
        error: safedata.error,
      });
    }
    let verifyuser;
    try {
      verifyuser = await Checkuser(safedata.data.email, safedata.data.password);
    } catch (error) {
      return res.status(status_code.Internal_Server_Error).json({
        msg: "Error verifying user",
      });
    }
    if (!verifyuser) {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect email or password",
      });
    }
    if (safedata.success && safedata.data) {
      let token = jwt.sign({ email: safedata.data.email }, JWTSECRET, { expiresIn: '1h' });
      return res.status(status_code.Success).json({
        msg: "User logged in successfully",
        token: `Bearer ${token}`  celar
        
      });
    } else {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect inputs",
        error: safedata
      });
    }
  } catch (error) {
    return res.status(status_code.Internal_Server_Error).json({
      msg: "Request failed",
      error: error
    });
  }
});
