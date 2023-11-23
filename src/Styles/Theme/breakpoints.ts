import { type BreakpointsOptions } from '@mui/system';
import variable from '../SCSS/general/variables.module.scss';

export const breakpoints: BreakpointsOptions = {
	values: {
		xs: 0,
		sm: parseInt(variable.sm),
		md: parseInt(variable.md),
		lg: parseInt(variable.lg),
		xl: parseInt(variable.xl),
	},
};
