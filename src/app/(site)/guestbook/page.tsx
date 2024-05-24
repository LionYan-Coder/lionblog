import { Container } from '~/components/ui';
import { Metadata } from 'next';
import { client } from 'sanity/lib/client';
import { getGuestbookQuery } from '~/lib/sanity/queries';
import { auth } from '~/auth';
import { Comments } from './comments';
import { LoginButton } from './LoginButton';
import { GuestbookInput } from './CommentInput';

export const metadata: Metadata = {
	title: '留言墙',
	description: '你好，很高兴你的到来，你可以在这里留下你的反馈、交流与讨论'
};

export default async function Guestbook() {
	const messages = await client.fetch<Guestbook[] | null>(getGuestbookQuery);
	const session = await auth();

	return (
		<Container className="mt-16 sm:mt-32">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					{metadata.title as string}
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">{metadata.description as string}</span>
				</p>
			</header>

			<div className="mt-16 sm:mt-20">
				{session?.user ? <GuestbookInput /> : <LoginButton />}

				<div className="relative mt-12">
					<Comments guestbooks={messages || []} />
				</div>
			</div>
		</Container>
	);
}

export const revalidate = 60;
