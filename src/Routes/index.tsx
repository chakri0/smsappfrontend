import * as React from 'react';
import { Suspense } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import CommonLayout from '../Layout/Common';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/Forgot Password';
import ResetPassword from '../Pages/Reset Password';
import InviteUser from '../Pages/InviteUser';
import ManageItems from '../Pages/ManageItem';
import ProfileSettings from '../Pages/Profile';
import ManageBranch from '../Pages/ManageBranch';
import AccountSetup from '../Pages/Setup';

const Router = (): React.JSX.Element => {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path="/login" Component={Login} />
				<Route path="/forgot-password" Component={ForgotPassword} />
				<Route path="/reset-password" Component={ResetPassword} />
				<Route path="/accountSetup" Component={AccountSetup} />

				<Route
					element={
						<CommonLayout>
							{' '}
							<Outlet />{' '}
						</CommonLayout>
					}>
					<Route path="/" Component={Dashboard} />
					<Route path="/invite-user" Component={InviteUser} />
					<Route path="/manage-item" Component={ManageItems} />
					<Route path="/profile" Component={ProfileSettings} />
					<Route path="/manage-branch" Component={ManageBranch} />
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Suspense>
	);
};

export default Router;
