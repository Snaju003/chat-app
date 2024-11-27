import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in the environment variables.");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log("Connected to MongoDB");

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed.");
            process.exit(0);
        });
    } catch (error) {
        console.error("Failed connecting to MongoDB:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
};

export default connectToDatabase;
