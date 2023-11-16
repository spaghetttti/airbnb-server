import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import connectToDatabase from "./services/database";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/test-users",  async (req: Request, res: Response) => {
  // connection.query("SELECT * FROM users", (err, rows, fields) => {
  //   if (!err) {
  //     res.send(rows);
  //   } else console.log(err);
  // });
  const pool : any = await connectToDatabase();
  const connection = await pool.getConnection();
  const [rows]:any = await connection.query("SELECT * FROM users");
  res.send(rows);
  connection.release();
});

app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
