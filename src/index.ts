import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import connectToDatabase from "./services/database";
import bodyParser from "body-parser";
import propertyRouter from "./routes/propertyRoutes";
import rentalRouter from "./routes/rentalRoutes";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(bodyParser.json())

app.get("/test-users",  async (req: Request, res: Response) => {
  const pool : any = await connectToDatabase();
  const connection = await pool.getConnection();
  const [rows]:any = await connection.query("SELECT * FROM users");
  res.send(rows);
  connection.release();
});

app.use('/api/users', userRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/rentals', rentalRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
