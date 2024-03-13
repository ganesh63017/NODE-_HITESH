import express from "express"; // Import the Express.js framework
import cookieParser from "cookie-parser"; // Import the cookie-parser middleware
import cors from "cors"; // Import the CORS middleware
import { auth_router } from "./routes/auth-routes.js";

const app = express(); // Create an instance of the Express application

// Set up CORS middleware to allow cross-origin requests from the specified origin
app.use(cors());

// Parse incoming JSON bodies with a limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse incoming URL-encoded form data
app.use(express.urlencoded());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies attached to incoming requests
app.use(cookieParser());

app.use("/api/v1/user", auth_router);

export { app };
