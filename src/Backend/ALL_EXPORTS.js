import { User } from "src/db/user.model.js";
import { new_user } from "src/zod_schemas/user_schema.js";

module.exports({ User, new_user });
