import { client } from 'sanity/lib/client';
import Resume from './Resume';
import { Container } from '~/components/ui';
import { BlogPosts } from './BlogPosts';
import { getPostQuery } from '~/lib/sanity/queries';

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
			<BlogPosts posts={posts || []} />
		</Container>
	);
}

export const revalidate = 60;
