interface Idea {
	_id: string;
	slug: string;
	title: string;
	publishedAt: string;
	summary: string;
	content: BlockContent[];
	author: {
		name: string;
		slug: string;
		image: Asset;
	};
	coverImage: Asset;
	tags: Tag[];
	headings: Node[];
}
