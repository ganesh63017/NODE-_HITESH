import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/images");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
	// fileFilter(req, file, cb) {
	// 	if (!file.originalname.match(/\.(png|jpg|jpeg|JPG)$/)) {
	// 		// upload only png and jpg format
	// 		return cb(new Error("Please upload a Image"));
	// 	}
	// 	cb(undefined, true);
	// },
});

export const uploadImages = multer({
	storage,
});
