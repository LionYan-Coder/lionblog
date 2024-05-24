import { notFound } from 'next/navigation';
import { IdeaPostPage } from './IdeaPostPage';
import { client } from 'sanity/lib/client';
import { getIdeaBySlug, getPostBySlug } from '~/lib/sanity/queries';

export const generateMetadata = async ({
	params
}: {
	params: { slug: string };
}) => {
	console.log('slug', params);

	const idea = await client.fetch<Idea | null>(getIdeaBySlug, {
		slug: params.slug
	});
	if (!idea) {
		notFound();
	}

	const { title, summary, coverImage } = idea;

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
	const idea = await client.fetch<Idea | null>(getIdeaBySlug, {
		slug: params.slug
	});
	if (!idea) {
		notFound();
	}
	return <IdeaPostPage idea={idea} />;
}

export const revalidate = 60;
