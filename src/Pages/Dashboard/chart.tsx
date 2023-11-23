import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleCharts(): React.JSX.Element {
	return (
		<BarChart
			xAxis={[
				{
					id: 'barCategories',
					data: ['Pizza', 'Beverages', 'Ingridients'],
					scaleType: 'band',
				},
			]}
			series={[
				{
					data: [2, 5, 3],
				},
			]}
			width={500}
			height={300}
		/>
	);
}
