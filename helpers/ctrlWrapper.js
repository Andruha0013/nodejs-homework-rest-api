const ctrlWrapper = (ctrlFunc) => {
	const func = async (req, res, next) => {
		try {
			console.log("wrapper");
			console.log(ctrlFunc);
			await ctrlFunc(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

module.exports = ctrlWrapper;
