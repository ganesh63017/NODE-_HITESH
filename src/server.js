import dotenv from "dotenv";
import connectDB from "./Database/index.js";
import { app } from "./app.js";

dotenv.config({
	path: "./.env",
});

connectDB()
	.then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`server running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log("DB connection failed " + error.message);
	});

// (async () => {
// 	try {
// 		await mongoose.connect(`${process.env.DB_URL} / ${DB_NAME}`);

// 		console.log(`Connected to MongoDB => ${process.env.DB_URL}` + DB_NAME);

// 		app.on("error", (error) => {
// 			console.log(error.message);

// 			throw error;
// 		});
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// })();
