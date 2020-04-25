'use strict';

const { addDays } = require('date-fns');

const validate = require('../../validators/getWeatherConditions');

function setup(body) {
	const { clouds, airports, size } = body;

	let data = [
		{
			airports: insertBlock(airports, size),
			clouds: insertBlock(clouds, size),
			firstClosed: false,
		},
	];

	let airportsClosed = data[0].airports.filter((airport) => {
		return !!data[0].clouds.find(
			(cloud) => cloud.x === airport.x && cloud.y === airport.y
		);
	});

	while (
		airportsClosed.length > 0 &&
		data[0].airports.length !== airports &&
		data[0].clouds.length !== clouds
	) {
		data[0] = [
			{
				airports: insertBlock(airports, size),
				clouds: insertBlock(clouds, size),
			},
		];

		airportsClosed = data[0].airports.filter((airport) => {
			return !!data[0].clouds.find(
				(cloud) => cloud.x === airport.x && cloud.y === airport.y
			);
		});
	}

	return data;
}

function getRandomNumber(max) {
	return Math.floor(Math.random() * max);
}

function insertBlock(quantity, size) {
	const data = [];
	for (let i = 0; i < quantity; i++) {
		data.push({ x: getRandomNumber(size.x), y: getRandomNumber(size.y) });
	}

	return data;
}

function moveClouds(clouds, size) {
	const newData = [];

	clouds.map(({ x, y }) => {
		newData.push({ x: x - 1, y: y });
		newData.push({ x: x + 1, y: y });
		newData.push({ x: x, y: y - 1 });
		newData.push({ x: x, y: y + 1 });
		newData.push({ x, y });
	});

	return newData;
}

module.exports = function (router) {
	router.post('/', validate, async function (req, res) {
		let data = setup(req.body);

		let airportsClosed = data[data.length - 1].airports.filter(
			(airport) => {
				return !!data[data.length - 1].clouds.find(
					(cloud) => cloud.x === airport.x && cloud.y === airport.y
				);
			}
		);

		let firstAirportClosed = false;

		while (airportsClosed.length !== req.body.airports) {
			data.push({
				clouds: moveClouds(data[data.length - 1].clouds, req.body.size),
				airports: data[0].airports,
				firstClosed: false,
			});

			airportsClosed = data[data.length - 1].airports.filter(
				(airport) => {
					return !!data[data.length - 1].clouds.find(
						(cloud) =>
							cloud.x === airport.x && cloud.y === airport.y
					);
				}
			);

			if (airportsClosed.length > 0 && !firstAirportClosed) {
				firstAirportClosed = true;
				data[data.length - 1].firstClosed = true;
			}
		}

		res.json(
			data.map((day, index) => ({
				...day,
				date: addDays(new Date(), index).toLocaleDateString(),
			}))
		);
	});
};
