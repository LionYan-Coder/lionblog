import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemaTypes/blockContent';
import tag from './schemaTypes/tag';
import post from './schemaTypes/post';
import author from './schemaTypes/author';
import user from './schemaTypes/user';
import account from './schemaTypes/account';
import verificationToken from './schemaTypes/verification-token';
import guestbook from './schemaTypes/guestbook';
import idea from './schemaTypes/idea';
export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		post,
		idea,
		guestbook,
		author,
		tag,
		blockContent,
		user,
		account,
		verificationToken
	]
};
