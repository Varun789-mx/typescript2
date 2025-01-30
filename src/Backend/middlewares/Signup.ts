import express, { Request, Response } from "express";
import cors from "cors";
import { User, new_user } from "../ALL_EXPORTS.js";

const New_user = express();

New_user.use(cors());
New_user.use(express.json());

interface SignupRequestBody {
  first_name: string;
  Last_name: string;
  email: string;
  mobile: string;
  Password: string;
}

New_user.post("/signup", async (req: Request<unknown, unknown, SignupRequestBody>, res: Response) => {
  const DATA = {
    First_name: req.body.first_name,
    Last_name: req.body.Last_name,
    Email: req.body.email,
    Mobile: req.body.mobile,
    Password: req.body.Password,
  };
  
  const safedata = new_user.safeparse(DATA);
  
  if (!safedata.success) {
    return res.status(411).json({
      msg: "input fields are incorrect",
    });
  }
  
  const create_user = await User.findOne({
    Email:safedata.data.Email,
    First_name:safedata.data.First_name,
  });

  if(!create_user) {
    return res.status(402).json({
      msg:"user already exist please login",
    });
  }
});