import { client } from 'sanity/lib/client';
import Resume from './Resume';
import { Container } from '~/components/ui';
import { BlogPosts } from './BlogPosts';
import { getPostQuery } from '~/lib/sanity/queries';
import { PencilSwooshIcon } from '~/assets';

const description = '我的博客之路：探索、思考、分享、记录点滴、启发思考。';
export const metadata = {
	title: '我的博客',
	description,
	openGraph: {
		title: '我的博客',
		description
	},
	twitter: {
		title: '我的博客',
		description,
		card: 'summary_large_image'
	}
};

export default async function Home() {
	const posts = await client.fetch<Post[] | null>(getPostQuery, {
		page: 1,
		size: 6
	});
	return (
		<Container>
			<Resume />
			<div className="mx-auto mt-24 sm:mt-32">
				<h2 className="mb-10 flex items-center justify-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
					<PencilSwooshIcon className="h-5 w-5 flex-none" />
					<span className="ml-2">近期文章</span>
				</h2>
				{posts && posts.length > 0 ? (
					<div className="relative sm:pb-12 sm:ml-[calc(2rem+1px)] md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-50rem))]">
						<div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
						<BlogPosts posts={posts || []} />
					</div>
				) : (
					<p className="mb-2  text-muted-foreground">暂无博客...</p>
				)}
			</div>
		</Container>
	);
}

export const revalidate = 60;
