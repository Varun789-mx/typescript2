import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const connection_uri: string = process.env.mongoose_uri || "";
try {
  mongoose.connect(connection_uri);
  console.log("Connection succesfull");
} catch (error) {
  console.log(`Error in connecting to the Database ${error}`);
}

const user = new mongoose.Schema(
  {
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true },
    Mobile: { type: String, required: true },
    Password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);

export { User };
