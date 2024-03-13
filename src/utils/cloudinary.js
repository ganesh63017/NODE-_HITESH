import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Uploads a file to Cloudinary.

const uploadOnCloudinary = async (localFilePath) => {
	// If no localFilePath is provided, return null.
	if (!localFilePath) return null;

	try {
		// Upload the local file to Cloudinary.
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto", // Automatically determine the resource type.
		});

		// Log the successful upload and return the response.
		console.log("File Uploaded Successfully", response.url);
		fs.unlinkSync(localFilePath);

		return response;
	} catch (error) {
		// If there is an error, delete the local file and re-throw the error.
		fs.unlinkSync(localFilePath);
		return null;
	}
};

export { uploadOnCloudinary };
