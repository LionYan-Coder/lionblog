import { NextRequest } from 'next/server';
import { emailConfig } from '~/config/email';
import { kv } from '@vercel/kv';
import { signUpFormSchema } from '~/lib/schema';
import getEmailTextAndHtml from '~/email/SignUpCodeEmail';
import { getIpInfo } from '~/lib/ip';
import { resend } from '~/email';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email } = signUpFormSchema.parse(body);
		const code = Math.random().toString().slice(-6);
		let startTime = Date.now();

		await kv.set(`${email}_token`, code, { ex: 600 });

		let endTime = Date.now();

		// 计算花费的时间
		let duration = endTime - startTime;

		console.log(`kv存储花费时间: ${duration} 毫秒`);

		startTime = Date.now();
		const ipInfo = await getIpInfo(req);
		endTime = Date.now();

		// 计算花费的时间
		duration = endTime - startTime;

		console.log(`获取ip花费时间: ${duration} 毫秒`);

		const { text, html } = getEmailTextAndHtml({ code, ipInfo });

		startTime = Date.now();
		const { data, error } = await resend.emails.send({
			from: emailConfig.from as string,
			to: [email],
			subject: `${code} is your verification code`,
			text,
			html
		});

		endTime = Date.now();

		// 计算花费的时间
		duration = endTime - startTime;

		console.log(`resend sdk 花费时间: ${duration} 毫秒`);

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		console.log('error', error);

		return Response.json({ error }, { status: 500 });
	}
}
