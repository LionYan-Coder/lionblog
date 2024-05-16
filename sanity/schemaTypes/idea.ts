import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'idea',
	title: '想法',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string'
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			}
		}),
		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' }
		}),
		defineField({
			name: 'summary',
			title: 'Summary',
			type: 'text',
			rows: 5
		}),
		defineField({
			name: 'coverImage',
			title: 'Cover image',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text'
				}
			]
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'tag' } }]
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime'
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'blockContent'
		})
	],

	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'coverImage'
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		}
	}
});
