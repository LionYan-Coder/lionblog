import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'tag',
	title: '标签',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string'
		}),
		defineField({
			name: 'color',
			title: 'Color',
			type: 'color'
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'string'
		})
	]
});
