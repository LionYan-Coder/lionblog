import { useSession } from 'next-auth/react';
import { SignInButton } from './sign-in-button';
import { UserInfo } from './user-info';

export function UserButton() {
	const session = useSession();
	console.log('session', session);

	if (!session?.data?.user) {
		return <SignInButton />;
	}

	return <UserInfo />;
}
