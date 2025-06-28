import mongoose from "mongoose"

const connectDB = async () => {

  mongoose.connection.on('connected', () => {
    console.log('DB is Connected');
  });

  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("To verify connection printing the host = ", connectionInstance.connection.host);
  }


  catch (error) {
    console.log(error);
  }

}

export default connectDB;