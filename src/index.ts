import express, { Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import bodyParser from "body-parser";
import propertyRouter from "./routes/propertyRoutes";
import rentalRouter from "./routes/rentalRoutes";
const cors = require("cors");

// Enable CORS for all routes

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/rentals", rentalRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
