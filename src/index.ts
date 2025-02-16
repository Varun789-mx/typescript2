import express from "express";
import { userRouter } from "./Routes/signup";
import { signinroute } from "./Routes/signin";

const app = express();
const port = 3000;


app.use(express.json());
app.use('/api', userRouter);
app.use('/api', signinroute)


app.listen(port, () => {
    console.log(`Server started on ${port} `);
});