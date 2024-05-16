import { defineType, defineArrayMember } from 'sanity';
import { Tweet } from './components/Tweet';

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default defineType({
	title: 'Block Content',
	name: 'blockContent',
	type: 'array',
	of: [
		defineArrayMember({
			title: 'Block',
			type: 'block',
			// Styles let you define what blocks can be marked up as. The default
			// set corresponds with HTML tags, but you can set any title or value
			// you want, and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H1', value: 'h1' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' }
			],
			lists: [
				{ title: '无序列表', value: 'bullet' },
				{ title: '有序列表', value: 'number' }
			],
			// Marks let you mark up inline text in the Portable Text Editor
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting
				decorators: [
					{ title: '加粗', value: 'strong' },
					{ title: '斜体', value: 'em' },
					{ title: '下划线', value: 'underline' },
					{ title: '删除线', value: 'strike-through' },
					{ title: '代码', value: 'code' }
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [
					{
						title: 'URL',
						name: 'link',
						type: 'object',
						fields: [
							{
								title: 'URL',
								name: 'href',
								type: 'url'
							}
						]
					}
				]
			}
		}),
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: '替代文本'
				},
				{
					name: 'label',
					type: 'string',
					title: '标注'
				}
			]
		}),
		defineArrayMember({
			type: 'object',
			name: 'tweet',
			title: '推文',
			fields: [
				{
					name: 'id',
					type: 'string',
					title: '推文 ID'
				}
			],
			components: {
				preview: Tweet
			},
			preview: {
				select: {
					id: 'id'
				}
			}
		}),
		defineArrayMember({
			type: 'code',
			name: 'codeBlock',
			title: '代码块',
			options: {
				withFilename: true
			}
		})
	]
});
