import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'account',
	title: '账户',
	type: 'document',
	fields: [
		defineField({
			name: 'providerType',
			title: 'Provider type',
			type: 'string'
		}),
		defineField({
			name: 'providerId',
			title: 'Provider id',
			type: 'string'
		}),
		defineField({
			name: 'providerAccountId',
			title: 'Provider account id',
			type: 'string'
		}),
		defineField({
			name: 'refreshToken',
			title: 'Refresh token',
			type: 'string'
		}),
		defineField({
			name: 'accessToken',
			title: 'Access token',
			type: 'string'
		}),
		defineField({
			name: 'accessTokenExpires',
			title: 'Access token expires',
			type: 'number'
		}),
		defineField({
			name: 'user',
			title: 'user',
			type: 'reference',
			to: { type: 'user' }
		})
	]
});
