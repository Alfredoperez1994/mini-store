import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import Product from "../src/models/Product.js";

dotenv.config();

const seedProducts = [
    { name: "Cámara Reflex", description: "Cámara profesional", price: 1200, stock: 5 },
    { name: "Trípode", description: "Trípode ajustable", price: 80, stock: 10 },
    { name: "Lente 50mm", description: "Lente luminoso", price: 400, stock: 7 },
];

const importData = async () => {
    try {
        await connectDB();
        await Product.deleteMany(); // Limpia colección
        await Product.insertMany(seedProducts);
        console.log("Datos insertados correctamente 🚀");
        mongoose.connection.close();
    } catch (error) {
        console.error(`Error al insertar datos: ${error}`);
        process.exit(1);
    }
};

importData();
