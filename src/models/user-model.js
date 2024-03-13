import mongoose, { Schema } from "mongoose";
import validator from "validator";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		user_name: {
			type: String,
			require: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			require: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email");
				}
			},
		},
		full_name: {
			type: String,
			require: true,
			trim: true,
			index: true,
		},
		avatar: {
			type: String, // cloudinary URL
			require: true,
		},
		cover_image: {
			type: String, // cloudinary URL
			require: true,
		},
		watch_history: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Video",
				},
			],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			trim: true,
			minlength: 8,
			validate(value) {
				if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
					throw new Error(
						"Password must contain at least one letter and one number"
					);
				}
			},
			private: true, // used by the private plugin
		},
		refresh_token: {
			type: String,
		},
	},
	{ timestamps: true }
);

// calls before saving the Data of User
userSchema.pre("save", async function (next) {
	// checks if the password is changed or not and saves hashed password
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.isPasswordMatch = async function (password) {
	// Get the user instance
	// 'this' refers to the current user document
	const user = this;

	// Use bcrypt's compare function to compare the provided password
	// with the user's hashed password.
	// The function returns a Promise that resolves to a boolean,
	// indicating whether the passwords match.
	return await bcrypt.compare(password, user.password);
};

userSchema.methods.generateAccessToken = function () {
	// Get the current user instance
	const user = this;

	// Sign the payload with the secret key and expiration time
	return Jwt.sign(
		{
			// The user's ID
			id: user._id,
			// The user's email
			email: user.email,
			// The user's username
			user_name: user.user_name,
			// The user's full name
			full_name: user.full_name,
		},
		// The secret key for signing the token
		process.env.ACCESS_TOKEN_SECRET,
		// The expiration time for the token
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

userSchema.methods.generateRefreshToken = async function () {
	// Get the user instance
	const user = this;

	// Sign the token with the user's ID, secret key, and expiration time
	Jwt.sign(
		{
			// User ID
			id: user._id,
		},
		process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the token
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiration time for the token
		}
	);
};

const User = mongoose.model("User", userSchema);

export default User;
