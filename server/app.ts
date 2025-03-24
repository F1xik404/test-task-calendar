import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import db from "./configs/db";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    db.authenticate()
    db.sync({alter: true})
})