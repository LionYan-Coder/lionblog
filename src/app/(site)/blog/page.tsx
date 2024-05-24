import { Container } from '~/components/ui';
import { BlogPosts } from './BlogPosts';
import { EmptyIcon } from '~/assets';
import type { Metadata } from 'next';
import { client } from 'sanity/lib/client';
import { getPostQuery } from '~/lib/sanity/queries';

export const metadata: Metadata = {
	title: '我的博客',
	description: '我的博客之路：探索、思考、分享、记录点滴、启发思考。'
};

export default async function BlogPage() {
	const posts = await client.fetch<Post[] | null>(getPostQuery, {
		size: 99,
		page: 1
	});
	return (
		<Container className="mt-16 sm:mt-20">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					{metadata.title as string}
				</h1>
				<p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
					<span className="text-balance">{metadata.description}</span>
				</p>
			</header>
			{posts && posts.length > 0 ? (
				<BlogPosts posts={posts || []} />
			) : (
				<div className="max-w-2xl flex flex-col justify-center text-muted-foreground space-y-3">
					<EmptyIcon className="w-9 h-9" />
					<p>暂无文章...</p>
				</div>
			)}
		</Container>
	);
}

export const revalidate = 60;