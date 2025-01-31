
import cors from "cors";
import { User } from "../../db/user.model";
import { new_user } from "../zod_schemas/user_schema";
import express, { Router, Request, Response } from "express";
const port = 4000;

const New_user: Router = express.Router();

New_user.use(cors());
New_user.use(express.json());

enum Status_code {
  Success = 200,
  Bad_Request = 400,
  Unauthorized = 401,
  Forbidden = 403,
  Not_Found = 404,
  Method_Not_Allowed = 405,
  Length_Required = 411,
  Internal_Server_Error = 500,
  Service_Unavailable = 503,
  Gateway_Timeout = 504,
}

interface SignupRequestBody {
  First_name: string;
  Last_name: string;
  Email: string;
  Password: string;
}

New_user.post("/signup", async (req: Request<{}, {}, SignupRequestBody>, res: Response, next: express.NextFunction) => {
  try {
    const DATA = {
      First_name: req.body.First_name,
      Last_name: req.body.Last_name,
      Email: req.body.Email,
      Password: req.body.Password,
    };

    const safedata = new_user.safeParse(DATA);

    if (!safedata.success) {
      return res.status(Status_code.Length_Required).json({
        msg: "input fields are incorrect",
        error: safedata.error
      });
    }

    const already_exist = await User.findOne({
      Email: safedata.data.Email,
      First_name: safedata.data.First_name,
    });

    if (already_exist) {
      return res.status(Status_code.Bad_Request).json({
        msg: "user already exist please login",
      });
    }
    const Created_User = await User.create(safedata.data);
    if (!Created_User) {
      return res.status(Status_code.Service_Unavailable).json({
        msg: "Cannot create user at this moment",
      });
    }
    return res.status(Status_code.Success).json({
      msg: "User succesfully created",
    });
  }
  catch (error) {
    return res.status(Status_code.Gateway_Timeout).json({
      msg: "Unable to process the request at this time",
      error: error
    })
  }
});

const startServer = async () => {
  try {
    const app = express();
    app.use('/api', New_user);
    
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

