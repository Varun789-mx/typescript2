import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const Todo = [
  {
    id: "1",
    task: "Brush teeth",
    completed: false,
  },
  {
    id: "2",
    task: "Shower at 4am",
    completed: false,
  },
];
app.get("/todo", (req, res) => {
  res.send(Todo);
});
app.listen(port, () => {
  console.log(`server started on ${port}`);
});
