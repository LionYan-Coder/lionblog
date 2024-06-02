import * as React from 'react';

import { Body, Container, Head, Html, Preview, Tailwind } from './_components';

export default function Layout({
	previewText,
	children
}: {
	previewText: string;
	children: React.ReactNode;
}) {
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-zinc-50 pt-[32px] font-sans">
					<Container className="max-w-3xl mx-auto px-12">{children}</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
