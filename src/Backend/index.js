import express from "express";
const app = express();
const port = "";

app.get("/", (req, res) => {
  res.json({
    msg: "Hello world",
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
