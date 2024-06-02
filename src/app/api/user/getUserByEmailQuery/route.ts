import { NextRequest, NextResponse } from 'next/server';
import { client } from 'sanity/lib/client';
import { getUserByEmailQuery } from '~/lib/sanity/queries';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const email = searchParams.get('email');
	const user = await client.fetch(getUserByEmailQuery, {
		userSchema: 'user',
		email
	});

	if (user) {
		return NextResponse.json(user);
	} else {
		return NextResponse.json({ message: '用户不存在' });
	}
}
