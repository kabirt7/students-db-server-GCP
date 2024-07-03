import express from "express";
import bodyParser from "body-parser";
import router from "./routes/students.js";
import { sequelize } from "./db/index.js";

const app = express();
const port = process.env.PORT || 3306;

try {
  // TRYING TO CONNECT TO THE MYSQL DB
  const result = await sequelize.sync();
  console.log(result);
  app.use(bodyParser.json());
  app.use("/students", router);

  app.get("/", (req, res) => {
    res.send("Hello Charlie");
  });

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
} catch (error) {
  console.log("ERROR!");
  console.log(error);
}
