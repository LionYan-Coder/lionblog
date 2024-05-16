import { defineField, defineType } from 'sanity';
import { AvatarImage } from './components/AvatarImage';

export default defineType({
	name: 'user',
	title: '用户',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string'
		}),
		defineField({
			name: 'email',
			title: 'Email',
			type: 'string'
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'url',
			components: {
				input: AvatarImage
			}
		}),
		defineField({
			name: 'password',
			type: 'string',
			hidden: true
		}),
		defineField({
			name: 'emailVerified',
			type: 'datetime',
			hidden: true
		})
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'email',
			imageUrl: 'image'
		}
	}
});
