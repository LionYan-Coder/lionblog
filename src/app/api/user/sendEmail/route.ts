import { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { ValidEmail } from '~/email/ValidEmail';
import CryptoJS from 'crypto-js';
import { headers } from 'next/headers';
import { emailConfig } from '~/config/email';
import { kv } from '@vercel/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const { email } = await req.json();
		const token = CryptoJS.AES.encrypt(
			email + Date.now().toString(),
			process.env.AUTH_SECRET
		).toString();
		const params = new URLSearchParams();
		params.append('token', token);
		params.append('email', email);
		params.append('redirect_url', new URL(req.nextUrl.origin).pathname);
		const validHref = `${emailConfig.baseUrl}/sign-verify?${params.toString()}`;
		await kv.set(`${email}-token`, token, { ex: 600 });

		let startTime = Date.now();

		const { data, error } = await resend.emails.send({
			from: 'lionblog.cc <lion@lionblog.cc>',
			to: [email],
			subject: '你的登录链接',
			react: ValidEmail({ validHref })
		});

		let endTime = Date.now();

		// 计算花费的时间
		let duration = endTime - startTime;

		console.log(`接口请求花费时间: ${duration} 毫秒`);

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json({ data });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
