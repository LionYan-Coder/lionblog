'use server';

import { signIn, signOut } from '~/auth';

export async function SignIn(provider: string) {
	await signIn(provider);
}

export async function SignOut() {
	await signOut();
}
