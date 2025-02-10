import express, { Request, Response } from "express";
import { Router as signuproute } from "./Routes/signup";
const app = express();
const port = 3000;


app.use(express.json());
app.use('signup', signuproute);

app.get('/', (req: Request, res: Response) => {
	res.send("Hello world");
});

app.listen(port, () => {
	console.log(`Server started on ${port} `);
});
