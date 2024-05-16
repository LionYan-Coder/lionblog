import type { SanityClient } from '@sanity/client';
import { type CredentialsConfig } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmailQuery } from './queries';
import CryptoJS from 'crypto-js';
import { uuid } from '@sanity/uuid';

export const signUpHandler =
	(client: SanityClient, userSchema: string = 'user') =>
	async (req: any, res: any) => {
		const isEdge = req instanceof Request;

		const body = isEdge ? await req.json() : req.body;

		const { email, password, name, image, ...userData } = body;

		const user = await client.fetch(getUserByEmailQuery, {
			userSchema,
			email
		});

		if (user) {
			const response = { error: '用户已存在' };

			if (isEdge) {
				return new Response(JSON.stringify(response), {
					headers: {
						'Content-Type': 'application/json'
					},
					status: 400
				});
			}

			res.json(response);
			return;
		}

		const { password: _, ...newUser } = await client.create({
			_id: `user.${uuid()}`,
			_type: userSchema,
			email,
			password: await CryptoJS.AES.encrypt(
				password,
				process.env.AUTH_SECRET
			).toString(),
			name,
			image,
			...userData
		});

		if (isEdge) {
			return new Response(JSON.stringify(newUser), {
				headers: {
					'Content-Type': 'application/json'
				},
				status: 200
			});
		}

		res.json({
			id: newUser._id,
			...newUser
		});
	};

export const SanityCredentials = (
	client: SanityClient,
	userSchema = 'user'
): CredentialsConfig =>
	Credentials({
		name: 'Credentials',
		id: 'login',
		type: 'credentials',
		credentials: {
			email: {
				label: '电子邮件地址',
				type: 'text'
			},
			name: {
				label: '用户昵称',
				type: 'text'
			},
			password: {
				label: '密码',
				type: 'password'
			}
		},
		async authorize(credentials) {
			const response = await client.fetch(getUserByEmailQuery, {
				userSchema,
				email: credentials?.email
			});

			if (!response) throw new Error('当前用户不存在！');

			const { _id, ...user } = response;
			const bytes = CryptoJS.AES.decrypt(
				user.password,
				process.env.AUTH_SECRET
			);
			const originalPwd = bytes.toString(CryptoJS.enc.Utf8);
			if (originalPwd === credentials?.password) {
				return {
					id: _id,
					...user
				};
			}

			throw new Error('密码错误');
		}
	});
