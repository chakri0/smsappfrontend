import { SvgIcon } from '@mui/material';
import React from 'react';

export default function BackArrow(): React.JSX.Element {
	return (
		<SvgIcon
			className="w-6 h-6 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 10">
			<path
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M13 5H1m0 0 4 4M1 5l4-4"
			/>
		</SvgIcon>
	);
}
