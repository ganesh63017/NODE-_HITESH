import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connectionInsatnce = await mongoose.connect(
			`${process.env.DB_URL}`
		);
		console.log("MONGO DB CONNECTED" + connectionInsatnce.connection.host);
	} catch (error) {
		console.log(error.message + " " + "connecting DB failed");
		process.exit(1);
	}
};

export default connectDB;
