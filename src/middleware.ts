import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(req: NextApiRequest, res: NextApiResponse) {
	const session = await auth();
	if (session?.user) {
		if ((req as unknown as NextRequest).nextUrl.pathname.startsWith('/sign')) {
			return NextResponse.redirect(new URL('/', req.url), { status: 302 });
		}
	}
	const authMiddleware = NextAuth(authConfig).auth;
	await authMiddleware(req, res);
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|index.html).*)']
};
