import express, { Request, Response } from "express";
import mysql from "mysql";
import { getUsers } from "./controllers/userController";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/users", (req: Request, res: Response) => {
  // //   var mysql = require("mysql");
  //   var connection = mysql.createConnection({

  //   });

  //   connection.connect();

  //   connection.query(
  //     "SELECT * FROM Users",
  //     function (error: any, results: any, fields: any) {
  //       if (error) throw error;
  //       console.log("The solution is: ", results[0]);
  //     }
  //   );

  //   res.send("Hello, World!");
  //   connection.end();

  getUsers(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
