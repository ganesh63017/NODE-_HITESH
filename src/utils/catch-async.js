/**
 * Middleware function to handle async errors in Express routes.
 *
 * @param {Function} handleAsync - The async function to handle the request.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
const handleAsync = (handleAsync) => (req, res, next) => {
	/**
	 * Executes the handleAsync function, which should be an async function
	 * handling the request. If an error is caught, it calls the next
	 * middleware function with the error.
	 */
	Promise.resolve(handleAsync(req, res, next)).catch((err) => next(err));
};
export default handleAsync;
