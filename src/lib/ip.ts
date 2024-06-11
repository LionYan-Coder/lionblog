import { NextRequest } from 'next/server';

export const getIpInfo = async (request: NextRequest) => {
	let ip = '';
	if (process.env.NODE_ENV.includes('pro')) {
		ip = request.ip ?? request.headers.get('x-real-ip') ?? '';
		const forwardedFor = request.headers.get('x-forwarded-for');
		if (!ip && forwardedFor) {
			ip = forwardedFor.split(',').at(0) ?? 'Unknown';
		}
	} else {
		ip = '183.217.82.28';
	}

	const data = await fetch(
		`http://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`
	).then((res) => res.json());

	return data;
};
