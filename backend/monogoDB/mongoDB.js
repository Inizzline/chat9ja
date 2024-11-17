import mongoose from "mongoose";

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.mongoDB_URL)
        console.log("Connected to mongoDB successfully");
        
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default mongoDB
