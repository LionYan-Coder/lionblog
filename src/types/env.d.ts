declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		PORT?: string;
		AUTH_SECRET: string;
		GITHUB_ID: string;
		GITHUB_SECRET: string;
		GOOGLE_ID: string;
		GOOGLE_SECRET: string;
		TWITTER_ID: string;
		TWITTER_SECRET: string;
		SANITY_API_READ_TOKEN: string;
		SANITY_API_WRITE_TOKEN: string;

		IPINFO_TOKEN: string;
	}
}
