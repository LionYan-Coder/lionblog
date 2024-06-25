import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';
import { verifyCodeFormSchema } from '~/lib/schema';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { code, email } = verifyCodeFormSchema.parse(body);

		const kv_token = await kv.get(`${email}-token`);

		if (code === kv_token) {
			return NextResponse.json({ data: true, message: '验证成功', code: 200 });
		} else {
			return NextResponse.json({
				data: false,
				message: '验证码错误哦',
				code: 200
			});
		}
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
