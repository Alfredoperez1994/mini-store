import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/products.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // para parsear JSON

app.get("/", (req, res) => {
    res.send("API Mini Store funcionando 🚀");
});

app.use("/api/products", productRoutes);

export default app;
