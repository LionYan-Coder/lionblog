import { notFound } from 'next/navigation';
import http from '~/http';
import { EResponseCode } from '~/config/enum';
import { BlogPostPage } from './BlogPostPage';
import { client } from 'sanity/lib/client';
import { getPostBySlug } from '~/lib/sanity/queries';

async function getBlog(slug: string) {
	const { data, code } = await http<Article>('/article/' + slug, 'GET');
	if (code !== EResponseCode.success) {
		return null;
	}
	return data;
}

export const generateMetadata = async ({
	params
}: {
	params: { slug: string };
}) => {
	const post = await client.fetch<Post | null>(getPostBySlug, {
		slug: params.slug
	});
	if (!post) {
		notFound();
	}

	const { title, summary, coverImage } = post;

	return {
		title,
		description: summary,
		openGraph: {
			title,
			description: summary,
			images: [
				{
					url: coverImage.asset.url
				}
			],
			type: 'article'
		},
		twitter: {
			images: [
				{
					url: coverImage.asset.url
				}
			],
			title,
			description: summary,
			card: 'summary_large_image',
			site: 'lionblog.cc',
			creator: '@lion'
		}
	};
};

export default async function Page({ params }: { params: { slug: string } }) {
	const post = await client.fetch<Post | null>(getPostBySlug, {
		slug: params.slug
	});
	if (!post) {
		notFound();
	}
	return <BlogPostPage post={post} />;
}

export const revalidate = 60;
