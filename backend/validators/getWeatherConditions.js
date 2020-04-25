module.exports = function validate(req, res, next) {
	const {
		clouds,
		airports,
		size: { x, y },
	} = req.body;

	if (x < 10 || y < 10) {
		return res
			.status(400)
			.json({ error: 'size should be at least 10 x 10' });
	}

	if (airports < 3) {
		return res.status(400).json({ error: 'airports' });
	}

	if (clouds < 4) {
		return res.status(400).json({ error: 'clouds' });
	}

	return next();
};
