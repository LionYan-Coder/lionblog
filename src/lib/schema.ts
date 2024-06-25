import { z } from 'zod';
import { pwdZodPatterns } from './pwdZodPatterns';

export const signInformSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, {
			message: '请输入邮箱'
		})
		.email({
			message: '邮箱地址不合法'
		})
});

export const signUpFormSchema = z.object({
	firstName: z.string().trim().min(1, { message: '请填写此字段' }),
	lastName: z.string().trim().min(1, { message: '请填写此字段' }),
	email: z
		.string()
		.trim()
		.min(1, {
			message: '请输入邮箱'
		})
		.email({
			message: '邮箱地址不合法'
		}),
	password: pwdZodPatterns
});

export const verifyCodeFormSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, {
			message: '请输入邮箱'
		})
		.email({
			message: '邮箱地址不合法'
		}),
	code: z.string().trim().length(6, { message: '验证码不合法' })
});

export const guestbookSchema = z.object({
	message: z.string().min(1).max(600)
});
