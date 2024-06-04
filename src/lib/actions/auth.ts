'use server';

import { signIn, signOut } from '~/auth';

export async function SignIn(provider: string, options?: any) {
	await signIn(provider, options);
}

export async function SignOut() {
	await signOut();
}
