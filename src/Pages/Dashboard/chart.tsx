import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../Hooks/reduxHooks';
import { type DashboardDetails } from 'src/Services/APIs/DashboardService';

interface ChartProps {
	dasboardDetails: DashboardDetails;
	branch: string;
}
export default function SimpleCharts(props: ChartProps): React.JSX.Element {
	const { branch } = props;
	const { dasboardDetails } = useAppSelector((state) => state.dashboard);
	const [itemName, setItemName] = React.useState<string[]>([]);
	const [quantity, setQuantity] = React.useState<number[] | undefined>([0]);
	const [healthScore, setHealthScore] = React.useState<number[] | undefined>([
		0,
	]);
	React.useEffect(() => {
		if (dasboardDetails.itemsWithTotalStock.length > 0) {
			const newItemNames = dasboardDetails.itemsWithTotalStock.map(
				(item) => item.itemName,
			);
			const newItemQuantity = dasboardDetails.itemsWithTotalStock.map(
				(item) => Number(item.availableQuantity),
			);
			const newItemHealthScore = dasboardDetails.itemsWithTotalStock.map(
				(item) => Number(item.healthScore),
			);
			setItemName(newItemNames);
			setQuantity(newItemQuantity);
			setHealthScore(newItemHealthScore);
		} else {
			setItemName([]);
			setQuantity([0]);
			setHealthScore([0]);
		}
	}, [dasboardDetails.itemsWithTotalStock, branch]);

	return (
		<div key={branch}>
			{/* <BarChart
			xAxis={[
				{
					id: 'barCategories',
					data: itemName,
					scaleType: 'band',
				},
			]}
			series={[
				{
					data: quantity,
				},
			]}
			width={500}
			height={300}
		/> */}
			<BarChart
				width={500}
				height={300}
				series={[
					{
						data: quantity,
						label: 'Quantity',
						id: 'quantityId',

						yAxisKey: 'leftAxisId',
					},
					{
						data: healthScore,
						label: 'Health Score',
						id: 'healthScoreId',

						yAxisKey: 'rightAxisId',
					},
				]}
				xAxis={[{ data: itemName, scaleType: 'band' }]}
				yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
				rightAxis="rightAxisId"
			/>
		</div>
	);
}
