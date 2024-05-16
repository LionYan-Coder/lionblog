import { EditBlog } from './EditBlog';
import http from '~/http';
import { EResponseCode } from '~/config/enum';

async function fetchArticleDetail(id: number) {
	const { code, data, message } = await http<Article>(
		`/admin/article/${id}`,
		'GET'
	);

	if (code !== EResponseCode.success) {
		throw new Error(JSON.stringify({ code, message }));
	}
	return data;
}

interface IProps {
	params: { id: string };
}

export async function generateMetadata({ params }: IProps) {
	const article =
		Number(params.id) !== 0
			? await fetchArticleDetail(Number(params.id))
			: undefined;
	return {
		title: article?.title || '新建博客'
	};
}

export default async function Page({ params }: IProps) {
	const article =
		Number(params.id) !== 0
			? await fetchArticleDetail(Number(params.id))
			: undefined;
	return <EditBlog article={article} />;
}
