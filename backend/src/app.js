import express from "express";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/orders", orderRoutes);

export default app;