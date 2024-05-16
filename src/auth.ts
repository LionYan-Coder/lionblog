import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { client } from 'sanity/lib/client';
import { Provider } from 'next-auth/providers';
import { authConfig } from './auth.config';
import { SanityAdapter, SanityCredentials } from './lib/sanity';

const providers: Provider[] = [
	GithubProvider({
		allowDangerousEmailAccountLinking: true
	}),
	GoogleProvider({
		allowDangerousEmailAccountLinking: true
	}),
	TwitterProvider({
		allowDangerousEmailAccountLinking: true
	}),
	SanityCredentials(client)
];

export const providerMap = providers
	.filter((v) => v.name !== 'Credentials')
	.map((provider) => {
		if (typeof provider === 'function') {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	});

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers,
	adapter: SanityAdapter(client)
});
