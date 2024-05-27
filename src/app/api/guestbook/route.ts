import { NextRequest, NextResponse } from 'next/server';
import { client } from 'sanity/lib/client';
import { z } from 'zod';
import { auth } from '~/auth';
import { getUserByEmailQuery } from '~/lib/sanity/queries';

const guestbookSchema = z.object({
	message: z.string().min(1).max(600)
});

export async function POST(req: NextRequest) {
	const session = await auth();

	if (session?.user) {
		const user = await client.fetch(getUserByEmailQuery, {
			userSchema: 'user',
			email: session?.user?.email
		});
		if (user._id) {
			const data = await req.json();
			const { message } = guestbookSchema.parse(data);
			const res = await client.create({
				_type: 'guestbook',
				user: {
					_type: 'reference',
					_ref: user._id
				},
				message
			});
			return NextResponse.json(res, { status: 201 });
		}
	} else {
		return NextResponse.json({ message: '登录才可评论' }, { status: 403 });
	}
}
