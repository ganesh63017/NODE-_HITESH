import { Router } from "express";
import { registerUser } from "../controllers/user-controller.js";
import { uploadImages } from "../middlewares/multer-middleware.js";

const auth_router = Router();

auth_router.route("/register").post(
	uploadImages.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
		{
			name: "cover_image",
			maxCount: 1,
		},
	]),
	registerUser
);

export { auth_router };
