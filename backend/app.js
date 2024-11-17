import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import mongoDB from "./monogoDB/mongoDB.js";
import messageRoutes from "./routes/message.js"
import userRoutes from "./routes/user.js"

const app = express();
const PORT = process.env.PORT || 5500


dotenv.config();

app.use(express.json()); // To parse in the incoming request from JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.send("We are live!!")
// })

app.listen(PORT, () => {
    mongoDB();
    console.log(`Server is live on ${PORT}`)
})