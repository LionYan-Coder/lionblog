'use client';
import { Button, Input, Form } from '~/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from '~/assets';
import { useSign } from './sign';

const formSchema = z.object({
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

export function SignInForm() {
	const { setValidUser, setStep, sendEmail } = useSign();
	const [loading, setLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ''
		}
	});

	async function handleNextStep(formData: z.infer<typeof formSchema>) {
		setLoading(true);
		const res = await fetch(
			`/api/user/getUserByEmailQuery?email=${formData.email}`
		)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
			})
			.catch(() => setLoading(false));
		if (res._id) {
			const data = await sendEmail(res.email).finally(() => setLoading(false));
			if (data) {
				setValidUser(res);
				setStep('sendEmail');
			}
		} else {
			setLoading(false);
			form.setError('email', { message: res.message });
		}
	}

	return (
		<Form {...form}>
			<form className="gap-4">
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
					className="w-full flex justify-center mt-4 text-[13px] font-semibold"
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
