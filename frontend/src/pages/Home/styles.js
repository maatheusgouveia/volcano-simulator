import styled from 'styled-components';

export const Header = styled.header`
	display: flex;
	align-items: center;
	background: #7159c1;
	height: 80px;
	padding-left: 30px;

	svg {
		margin-right: 10px;
	}
`;

export const Title = styled.h1`
	color: #fff;
`;

export const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);

	@media (max-width: 1100px) {
		grid-template-columns: 1fr;
	}

	form {
		top: 0;
		position: sticky;
		padding: 0 0 30px 0;
		max-width: 450px;

		input {
			margin: 10px 0 10px 0;
		}

		button {
			max-height: 60px;
		}
	}

	h1,
	h2 {
		text-align: center;
		margin: 20px 0 20px 0;
	}
`;

export const FormContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Warnings = styled.section`
	background: #ff0038;
	border-radius: 5px;
	margin-top: 20px;
	padding: 10px;

	h3 {
		color: #fff;

		&:last-child {
			margin-top: 10px;
		}
	}
`;

export const Map = styled.div`
	display: grid;
	grid-template-columns: ${({ size }) => `repeat(${size.x || 10}, 1fr)`};
	margin: 20px;
`;

export const Simulation = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
