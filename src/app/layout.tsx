import './globals.css';
import './prism.css';
import type { Metadata } from 'next';
import { sansFont } from '~/lib/font';
import { ThemeProvider } from '~/provider/theme';
import type { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '~/auth';

export const metadata: Metadata = {
	title: 'Lion Yan | Developer',
	description: '我叫Lion，一名前端开发者'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	const session = await auth();
	return (
		<html
			lang="zh-CN"
			className={`${sansFont.variable} m-0 p-0 h-full font-sans antialiased`}
			suppressHydrationWarning
		>
			<body className="flex h-full flex-col">
				<SessionProvider session={session}>
					<ThemeProvider defaultTheme="system" attribute="class" enableSystem>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
