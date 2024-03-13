class ApiResponse {
	constructor(statusCode, data, message = "success") {
		// The message to be included in the response.
		this.message = message;
		// Indicates if the status code is less than 400, indicating success.
		this.success = statusCode < 400;
		// The data to be included in the response.
		this.data = data;
		// The HTTP status code of the response.
		this.statusCode = statusCode;
	}
}

export { ApiResponse };
