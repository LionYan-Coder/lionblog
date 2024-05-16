import { client } from 'sanity/lib/client';
import { signUpHandler } from '~/lib/sanity/credentials';

const handler = signUpHandler(client);

export { handler as POST };
