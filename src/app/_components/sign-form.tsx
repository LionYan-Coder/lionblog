'use client';
import { Button, Input, Form } from '~/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from '~/assets';
import { useSign } from './sign';
import { SignIn } from '~/lib/actions/auth';
import { signInformSchema, signUpFormSchema } from '~/lib/schema';
import { motion } from 'framer-motion';

export function SignInForm() {
	const { setLoginUser, setStep, setCountdown, setError } = useSign();
	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof signInformSchema>>({
		resolver: zodResolver(signInformSchema),
		defaultValues: {
			email: ''
		}
	});

	async function handleNextStep(formData: z.infer<typeof signInformSchema>) {
		setLoading(true);
		try {
			const res = await fetch(
				`/api/user/getUserByEmailQuery?email=${formData.email}`
			).then((res) => {
				if (res.ok) {
					return res.json();
				}
			});
			if (res._id) {
				await SignIn('resend', { ...formData, redirect: false }).finally(() =>
					setLoading(false)
				);
				setLoginUser(res);
				setStep('verifyEmailLink');
				setCountdown(30);
			} else {
				setLoading(false);
				form.setError('email', { message: res.message });
			}
		} catch (error) {
			setLoading(false);
			setError({
				type: 'error',
				title: 'Error',
				description: JSON.stringify(error)
			});
		}
	}

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4">
				<Form.Field
					name="email"
					control={form.control}
					render={({ field }) => (
						<Form.Item>
							<Form.Label>电子邮件地址</Form.Label>
							<Form.Control>
								<Input {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				></Form.Field>
				<Button
					onClick={form.handleSubmit(handleNextStep)}
					className="w-full flex justify-center text-[13px] font-semibold"
					disabled={loading}
				>
					{loading ? (
						<LoaderCircleIcon className="animate-spin text-base mr-2" />
					) : (
						'继续'
					)}
				</Button>
			</form>
		</Form>
	);
}

export function SignUpForm() {
	const [loading, setLoading] = useState(false);
	const { setRegisterUser, setStep, setCountdown, setError } = useSign();
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	});

	async function handleNextStep(formData: z.infer<typeof signUpFormSchema>) {
		setLoading(true);
		try {
			const res = await fetch(
				`/api/user/getUserByEmailQuery?email=${formData.email}`
			).then((res) => {
				if (res.ok) {
					return res.json();
				}
			});
			if (!res || !res._id) {
				const res = await fetch('/api/user/sendEmailCode', {
					method: 'POST',
					body: JSON.stringify(formData)
				})
					.then((res) => res.json())
					.finally(() => setLoading(false));

				if (res && res.id) {
					setRegisterUser(formData);
					setStep('verifyEmailCode');
					setCountdown(30);
				} else {
					setError({
						type: 'error',
						title: '验证码发送失败，请稍后再试',
						description: JSON.stringify(res.error)
					});
				}
			} else {
				setLoading(false);
				form.setError('email', { message: '此用户已存在' });
			}
		} catch (error) {
			setLoading(false);
			setError({
				type: 'error',
				title: 'Error',
				description: JSON.stringify(error)
			});
		}
	}

	return (
		<Form {...form}>
			<form className="flex flex-col gap-4 relative">
				<div className="flex gap-4">
					<Form.Field
						name="firstName"
						control={form.control}
						render={({ field }) => (
							<Form.Item>
								<Form.Label>名字</Form.Label>
								<Form.Control>
									<Input {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					></Form.Field>
					<Form.Field
						name="lastName"
						control={form.control}
						render={({ field }) => (
							<Form.Item>
								<Form.Label>姓氏</Form.Label>
								<Form.Control>
									<Input {...field} />
								</Form.Control>
								<Form.Message />
							</Form.Item>
						)}
					></Form.Field>
				</div>
				<Form.Field
					name="email"
					control={form.control}
					render={({ field }) => (
						<Form.Item>
							<Form.Label>电子邮件地址</Form.Label>
							<Form.Control>
								<Input {...field} />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				></Form.Field>
				<Form.Field
					name="password"
					control={form.control}
					render={({ field }) => (
						<Form.Item>
							<Form.Label>密码</Form.Label>
							<Form.Control>
								<Input {...field} type="password" />
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				></Form.Field>
				<Button
					onClick={form.handleSubmit(handleNextStep)}
					className="w-full flex justify-center text-[13px] font-semibold"
					disabled={loading}
				>
					{loading ? (
						<LoaderCircleIcon className="animate-spin text-base mr-2" />
					) : (
						'继续'
					)}
				</Button>
			</form>
		</Form>
	);
}
