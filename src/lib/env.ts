// Resend

import { assertValue } from './utils';

export const resendKey = assertValue(
	process.env.AUTH_RESEND_KEY,
	'Missing environment variable: AUTH_RESEND_KEY'
);
