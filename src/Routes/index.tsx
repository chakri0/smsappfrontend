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
import ProtectedRoute from '../Component/Common/ProtectedRoute';
import GuestRoute from '../Component/Common/GuestRoute';

const Router = (): React.JSX.Element => {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route
					path="/login"
					element={
						<GuestRoute>
							<Login />
						</GuestRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<GuestRoute>
							<ForgotPassword />
						</GuestRoute>
					}
					// Component={ForgotPassword}
				/>
				<Route
					path="/reset-password"
					element={
						<GuestRoute>
							<ResetPassword />
						</GuestRoute>
					}
					// Component={ResetPassword}
				/>
				<Route
					path="/accountSetup"
					element={
						<GuestRoute>
							<AccountSetup />
						</GuestRoute>
					}
					// Component={AccountSetup}
				/>

				<Route
					element={
						<CommonLayout>
							{' '}
							<Outlet />{' '}
						</CommonLayout>
					}>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<ProfileSettings />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/invite-user"
						element={
							<ProtectedRoute>
								<InviteUser />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/manage-item"
						element={
							<ProtectedRoute>
								<ManageItems />
							</ProtectedRoute>
						}
					/>
					{/* ś<Route path="/profile" Component={ProfileSettings} /> */}
					<Route
						path="/manage-branch"
						element={
							<ProtectedRoute>
								<ManageBranch />
							</ProtectedRoute>
						}
					/>
				</Route>

				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Suspense>
	);
};

export default Router;
