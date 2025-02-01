import express, { Request, Response } from "express";

import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "../../db/user.model";
import { new_user } from "../zod_schemas/user_schema";
import { status_code } from "../Status_code";
const Signup = express();
const port = 4000;

Signup.use(cors());
Signup.use(express.json());

interface user_fields {
  First_name: string,
  Last_name: string,
  Email: string,
  Mobile: string,
  Password: string,
}

Signup.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const DATA: user_fields = {
      First_name: req.body.First_name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Mobile: req.body.Mobile,
      Password: req.body.Password
    };
    const Parsed_Data = new_user.safeParse(DATA);
    if (!Parsed_Data.success) {
      return res.status(status_code.Bad_Request).json({
        msg: "Incorrect inputs",
        error: Parsed_Data.error.errors
      });
    }
    const previous_user = await User.findOne({
      Email: DATA.Email,
      First_name: DATA.First_name,
    });
    if (previous_user) {
      return res.status(status_code.Forbidden).json({
        msg: "User already exists",
      });
    }
    const Hashed_Pass = bcrypt.hashSync(DATA.Password, 10);
    DATA.Password = Hashed_Pass;
    const create_user = await User.create(DATA);
    if (!create_user) {
      return res.status(status_code.Request_timeout).json({
        error: "User creation failed"
      });
    }
    return res.status(status_code.Success).json({
      msg: "User successfully created",
    });
  } catch (error) {
    return res.status(status_code.Failed).json({
      msg: "Request failed",
      error: error
    });
  }
});

Signup.listen(port, () => {
  console.log(`Server started at http://localhost:${port}/signup`);
}).on('error', (error) => {
  console.log(`Error occurred while listening on ${port}`, error);
});
