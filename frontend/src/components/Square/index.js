import React from 'react';
import { MdCloud, MdLocalAirport } from 'react-icons/md';

import { Block } from './styles';

export default function Square({ airport, cloud }) {
	return (
		<Block>
			{cloud && <MdCloud />}
			{airport && <MdLocalAirport />}
		</Block>
	);
}
