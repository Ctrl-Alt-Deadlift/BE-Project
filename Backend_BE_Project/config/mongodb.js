import mongoose from "mongoose"

const connectDB = async () => {

  mongoose.connection.on('connected', () => {
    console.log('\nMongoDB Connection is getting verified . . .\n');
  });

  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB Connection Successful ✅ ✅  \n\nTo verify connection printing the host = ", connectionInstance.connection.host);
    console.log("\n")
  }


  catch (error) {
    console.log(error);
  }

}

export default connectDB;