export function isAPIActionRejected(type: string): boolean {
	const splittedType = type.split('/');
	const actionName = splittedType[splittedType.length - 1];
	return actionName === 'rejected';
}

export function getAccessToken(): string {
	const storedUserInfo: string | null = localStorage.getItem('PhillyUser');
	if (storedUserInfo != null) {
		const userInfo = JSON.parse(storedUserInfo);
		return userInfo.user.accessToken;
	}
	return '';
}
