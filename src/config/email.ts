export const emailConfig = {
	from: process.env.NEXT_PUBLIC_SITE_EMAIL_FROM,
	baseUrl:
		process.env.VERCEL_ENV === 'production'
			? process.env.NEXT_PUBLIC_SITE_URL
			: 'http://localhost:3000'
};
