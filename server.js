import express from "express";
import studentRoutes from "./src/student/routes.js";

const app = express();
const port = 4200;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello backend developer");
});
app.use("/api/v1/students", studentRoutes);

app.listen(port, () => {
  console.log("app is listening at 4200");
});
