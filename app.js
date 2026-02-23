const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/config/database");

// Rutas importadas
const authRoutes = require("./src/routes/authRoutes");
const requestRoutes = require("./src/routes/requestRoutes");

const app = express();

// Conectar DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Usamos path.join para que funcione en la nube local

// Definir rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
const errorHandler = require("./src/middlewares/errorHandler");
app.use(errorHandler);
// Si alguien entra a la raíz '/', le enviamos el index.html a la fuerza

module.exports = app;
/*  */
