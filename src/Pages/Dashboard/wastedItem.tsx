import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../Hooks/reduxHooks';

interface ChartProps {
	branch: string;
}
export default function WastedItem(props: ChartProps): React.JSX.Element {
	const { branch } = props;
	const { dasboardDetails } = useAppSelector((state) => state.dashboard);
	const [itemName, setItemName] = React.useState<string[]>([]);
	const [wastedQuantity, setWastedQuantity] = React.useState<
		number[] | undefined
	>([0]);

	React.useEffect(() => {
		if (dasboardDetails.wastedItemsList.length > 0) {
			const newItemNames = dasboardDetails.wastedItemsList.map(
				(item) => item.itemName,
			);
			const newWastedQuantity = dasboardDetails.wastedItemsList.map(
				(item) => Number(item.wastedQuantity),
			);
			setItemName(newItemNames);
			setWastedQuantity(newWastedQuantity);
		} else {
			setWastedQuantity([0]);
			setItemName([]);
		}
	}, [dasboardDetails.wastedItemsList, branch]);

	return (
		<div key={branch}>
			<BarChart
				xAxis={[
					{
						id: 'barCategories',
						data: itemName,
						scaleType: 'band',
					},
				]}
				series={[
					{
						data: wastedQuantity,
						label: 'Wasted Quantity',
					},
				]}
				width={500}
				height={300}
			/>
		</div>
	);
}
