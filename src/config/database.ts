import { MONGODB_URI } from "../constants";
import mongoose, { ConnectOptions } from "mongoose";

mongoose.set("strictQuery", false);

const connectDatabase = () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined.");
    }
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    } as ConnectOptions);

    mongoose.connection.on("error", (error: string) => {
      console.log("Connect to database failed with error:", error);
      throw new Error(error);
    });

    mongoose.connection.on("open", () => {
      console.log("Connect to database successfully");
    });
  } catch (error: any) {
    console.log("Connect to database failed with error:", error);
    throw new Error(error);
  }
};

export default connectDatabase;
