import NextAuth, { DefaultSession, User } from 'next-auth';
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
	adapter: SanityAdapter(client),
	callbacks: {
		async session({ session, token }) {
			if (token.providerId) {
				session.user.providerId = token.providerId as string;
			}
			return session;
		},
		async jwt({ token, account }) {
			// 如果是首次登录，把 providerId 加到 token 中
			if (account) {
				token.providerId = account.provider;
			}
			return token;
		}
	},
	debug: process.env.NODE_ENV !== 'production' ? true : false
});

declare module 'next-auth' {
	interface Session {
		user: {
			email: string;
			id: string;
			providerId?: string; // 添加自定义的属性
		} & DefaultSession['user'];
	}

	interface User {
		providerId?: string; // 添加自定义的属性
	}
}
