import { kv } from '@vercel/kv';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const email = searchParams.get('email');
		const token = searchParams.get('token');
		const redirect_url = searchParams.get('redirect_url');

		let startTime = Date.now();
		const v = await kv.get(`${email}-token`);

		let endTime = Date.now();

		// 计算花费的时间
		let duration = endTime - startTime;

		console.log(`validEmail 接口请求花费时间: ${duration} 毫秒`);

		if (v === token) {
			return NextResponse.json(
				{ expired: false, redirect_url },
				{ status: 403 }
			);
		} else {
			return NextResponse.json({ expired: true }, { status: 403 });
		}
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
