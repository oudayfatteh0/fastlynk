import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

import urlRoutes from "./routes/urlRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
