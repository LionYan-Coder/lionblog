import { useSession } from 'next-auth/react';
import { SignInButton } from './sign-in-button';
import { UserInfo } from './user-info';

export function UserButton() {
	const session = useSession();

	if (!session?.data?.user) {
		return <SignInButton />;
	}

	return <UserInfo />;
}
