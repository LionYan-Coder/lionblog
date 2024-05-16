import { useSession } from 'next-auth/react';
import { SignInOrUp } from './sign';
import { UserInfo } from './user-info';

export function User() {
	const session = useSession();
	if (!session?.data?.user) {
		return <SignInOrUp />;
	}

	return <UserInfo />;
}
