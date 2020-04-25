import React, { useEffect, useState, useMemo } from 'react';
import { GiSmokingVolcano } from 'react-icons/gi';

import api from '../../services/api';
import Square from '../../components/Square';

import {
	Header,
	Title,
	Container,
	FormContent,
	Warnings,
	Map,
	Simulation,
} from './styles';

export default function Home() {
	const [data, setData] = useState([]);
	const [size, setSize] = useState({ x: 10, y: 10 });
	const [clouds, setClouds] = useState(4);
	const [airports, setAirports] = useState(3);

	useEffect(() => {
		const storedSimulation = localStorage.getItem(
			'@volcano-simulator/last-simulation'
		);

		if (storedSimulation) {
			setData(JSON.parse(storedSimulation));
		}
	}, []);

	useEffect(() => {
		try {
			const newSimulation = JSON.stringify(data);
			const oldSimulation = JSON.stringify(
				localStorage.getItem('@volcano-simulator/last-simulation')
			);

			if (newSimulation !== oldSimulation) {
				localStorage.setItem(
					'@volcano-simulator/last-simulation',
					newSimulation
				);
			}
		} catch (error) {
			console.log('Erro ao salvar dados');
		}
	}, [data]);

	const days = useMemo(() => data.length, [data]);

	const firstClosed = useMemo(() => data.find((day) => day.firstClosed), [
		data,
	]);

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.post('/weather', {
			clouds,
			airports,
			size,
		});

		setData(response.data);
	}

	function renderSquares(index) {
		let squares = [];

		for (let count_x = 0; count_x <= size.x - 1; count_x++) {
			for (let count_y = 0; count_y <= size.y - 1; count_y++) {
				const [hasCloud] = data[index].clouds.filter((position) => {
					return position.x === count_x && position.y === count_y;
				});

				const [hasAirport] = data[index].airports.filter((position) => {
					return position.x === count_x && position.y === count_y;
				});

				squares.push(
					<Square
						key={`${count_x}${count_y}`}
						cloud={!!hasCloud}
						airport={!!hasAirport}
					/>
				);
			}
		}

		return squares;
	}

	return (
		<div>
			<Header>
				<GiSmokingVolcano size={30} color="#fff" />
				<Title>Simulador de nuvens vulcânicas</Title>
			</Header>
			<Container>
				<FormContent>
					<form onSubmit={handleSubmit}>
						<h1>Dados iniciais</h1>
						<label htmlFor="clouds">Quantidade de nuvens</label>
						<input
							required
							autoFocus
							min={4}
							type="number"
							id="clouds"
							onChange={(e) => setClouds(e.target.value)}
							value={clouds}
							placeholder="Quantidade de nuvens"
						/>
						<label htmlFor="airports">
							Quantidade de aeroportos
						</label>
						<input
							required
							min={3}
							id="airports"
							type="number"
							onChange={(e) => setAirports(e.target.value)}
							value={airports}
							placeholder="Quantidade de aeroportos"
						/>
						<label htmlFor="rows">Linhas</label>
						<input
							required
							min={10}
							max={20}
							id="rows"
							type="number"
							onChange={(e) =>
								setSize({ ...size, x: e.target.value })
							}
							value={size.x}
							placeholder="Quantidade de linhas"
						/>
						<label htmlFor="columns">Colunas</label>
						<input
							required
							min={10}
							max={20}
							id="columns"
							type="number"
							onChange={(e) =>
								setSize({ ...size, y: e.target.value })
							}
							value={size.y}
							placeholder="Quantidade de colunas"
						/>

						<button className="button" type="submit">
							Simular
						</button>

						<Warnings>
							<h3>
								Todos os aeroportos estarão fechados em {days}{' '}
								dia
								{days > 1 ? 's' : ''}
							</h3>

							<h3>
								Primeiro fechamento previsto para o dia{' '}
								{firstClosed && firstClosed.date}
							</h3>
						</Warnings>
					</form>
				</FormContent>

				<Simulation>
					{data &&
						data.map((day, index) => (
							<div key={day.date}>
								<h2>
									{index === 0 ? 'Hoje' : 'Dia'} - {day.date}
								</h2>

								<Map size={size}>{renderSquares(index)}</Map>
							</div>
						))}
				</Simulation>
			</Container>
		</div>
	);
}
