import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'guestbook',
	title: '留言',
	type: 'document',
	fields: [
		defineField({
			name: 'user',
			title: 'User',
			type: 'reference',
			to: { type: 'user' }
		}),
		defineField({
			name: 'message',
			title: 'Message',
			type: 'string'
		})
	],

	preview: {
		select: {
			title: 'user.name',
			subtitle: 'message',
			imageUrl: 'user.image'
		}
	}
});
