import { z } from "zod";

const new_user = z.object({
    First_name: z.string().min(3, "First name should be atleast 3 characters long "),
    Last_name: z.string().min(3, "Last name should be atleast 3 characters long "),
    Email: z.string().email().min(3, "Email should be atleast 3 characters long "),
    Mobile: z.string().min(10, "Mobile no should be atleast ten digit long"),
    Password: z.string().min(8, "Password should be atleast 8 character long"),

})

export { new_user };