import type { NextAuthConfig } from 'next-auth';
import { emailConfig } from './config/email';

export const authConfig = {
	// pages: {
	// 	signIn: '/sign-in'
	// },
	session: {
		strategy: 'jwt'
	},
	theme: {
		logo: emailConfig.baseUrl + '/avatar_transparent.png'
	},
	providers: [
		// added later in auth.ts since it requires bcrypt which is only compatible with Node.js
		// while this file is also used in non-Node.js environments
	]
	// callbacks: {
	//   authorized({ auth, request: { nextUrl } }) {
	//     const isLoggedIn = !!auth?.user;
	//     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
	//     if (isOnDashboard) {
	//       if (isLoggedIn) return true;
	//       return false; // Redirect unauthenticated users to login page
	//     } else if (isLoggedIn) {
	//       return Response.redirect(new URL('/dashboard', nextUrl));
	//     }
	//     return true;
	//   },
	// },
} satisfies NextAuthConfig;
