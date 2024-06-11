import NextAuth, { DefaultSession, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import Resend from 'next-auth/providers/resend';
import { client } from 'sanity/lib/client';
import { Provider } from 'next-auth/providers';
import { authConfig } from './auth.config';
import { SanityAdapter, SanityCredentials } from './lib/sanity';
import { emailConfig } from './config/email';
import { getEmailTextAndHtml } from './email/ValidEmail';
import { getIpInfo } from './lib/ip';

// import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
// import { Redis } from "@upstash/redis"

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_URL!,
//   token: process.env.UPSTASH_REDIS_TOKEN!,
// })

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
	Resend({
		from: emailConfig.from,
		maxAge: 60 * 10,
		async sendVerificationRequest(params) {
			const { identifier: to, provider, url, request } = params;
			const { host } = new URL(url);
			const ipInfo = await getIpInfo(request as any);
			const { text, html } = getEmailTextAndHtml({ host, url, ipInfo });

			const res = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${provider.apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					from: provider.from,
					to,
					subject: `Sign in to lionblog.cc`,
					html,
					text
				})
			}).catch((err) => {
				throw new Error('Resend error: ' + JSON.stringify(err));
			});
			if (!res.ok)
				throw new Error('Resend error: ' + JSON.stringify(await res.json()));
		}
	}),
	SanityCredentials(client)
];

const filterProvider = ['Credentials', 'Resend'];

export const providerMap = providers
	.filter((v) => {
		return !filterProvider.includes(v.name);
	})
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
