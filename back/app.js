const express = require ('express');
const path = require ('path');
const dotenv = require("dotenv");
const app = express();
const connectTodatabase = require('./config/connectToDatabase')
const bodyParser = require("body-parser");
const cors = require('cors')
const authRoutes = require("./router");
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser')

dotenv.config();
connectTodatabase()

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/", authRoutes);

app.listen(port, () => console.log (`Serveur lancer sur le port ${port} 🔥`));