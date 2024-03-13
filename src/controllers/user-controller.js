import { ApiError } from "../utils/api-error.js";
import handleAsync from "../utils/catch-async.js";
import User from "../models/user-model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api-response.js";

export const registerUser = handleAsync(async (req, res) => {
	const { user_name, email, full_name, password } = req.body;
	const avatar_path = req.files?.avatar[0].path;

	console.log({ user_name, email, full_name, password });

	if (
		![user_name, email, full_name, password].every(
			(field) => field?.trim() !== ""
		)
	)
		throw new ApiError(400, "All fields are required");

	const existed_user = await User.findOne({
		$or: [{ user_name }, { email }],
	});

	if (existed_user) throw new ApiError(409, "User already exists");

	if (!avatar_path) throw new ApiError(400, "Avatar is required");

	const avatar_cdn = await uploadOnCloudinary(avatar_path);

	if (!avatar_cdn) throw new ApiError(500, "Failed to upload avatar");

	let cover_image_path;
	if (
		req.files &&
		Array.isArray(req.files.coverImage) &&
		req.files.coverImage.length > 0
	) {
		cover_image_path = req.files?.cover_image[0].path;
	}

	const cover_image_cdn = await uploadOnCloudinary(cover_image_path);

	const user_data = await User.create({
		user_name: user_name.toLowerCase(),
		email,
		full_name,
		password,
		avatar: avatar_cdn.url,
		cover_image: cover_image_cdn?.url || "",
	});

	const created_user = await User.findById(user_data._id).select(
		"-password -refresh_token"
	);

	if (!created_user) throw new ApiError(500, "Failed to save user");

	return res
		.status(201)
		.json(
			new ApiResponse(200, created_user, "User registered Successfully")
		);
});
