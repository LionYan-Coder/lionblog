'use client';

import { Avatar, Button, Card, Spin } from '~/components';
import { cn } from '~/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Providers } from './provider-form';
import { DOMAIN } from '~/config/constants';
import { SignInForm } from './sign-form';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PenLineIcon, ShieldAlertIcon } from '~/assets';
import { SignIn } from '~/lib/actions/auth';

interface SignProps {
	type?: 'sign-in' | 'sign-up';
	className?: string;
}

interface SignError {
	type: 'warning' | 'error' | 'none';
	title: string;
	message?: string;
	content?: string;
}

function useSignContext({ type }: SignProps) {
	const [signType, setSignType] = useState<SignProps['type']>(type);
	const [step, setStep] = useState<'login' | 'register' | 'sendEmail'>(
		type === 'sign-in' ? 'login' : 'register'
	);
	const title = useMemo(() => {
		if (step === 'login') {
			return '登录';
		} else if (step === 'register') {
			return '创建您的账户';
		} else if (step === 'sendEmail') {
			return '查看您的电子邮件';
		}
	}, [step]);

	const [countdown, setCountdown] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [validUser, setValidUser] = useState<User | null>(null);
	const [error, setError] = useState<SignError>({
		type: 'none',
		title: '',
		message: '',
		content: ''
	});

	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;
		if (countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}

		if (countdown === 0) {
			if (timer) clearInterval(timer);
			timer = null;
		}

		return () => {
			if (timer) clearInterval(timer);
			timer = null;
		};
	}, [countdown]);

	return useMemo(
		() => ({
			signType,
			title,
			step,
			countdown,
			validUser,
			error,
			setError,
			setValidUser,
			setStep,
			setSignType,
			spinning,
			setSpinning,
			setCountdown
		}),
		[countdown, error, signType, spinning, step, title, validUser]
	);
}

export const SignContext = createContext<ReturnType<
	typeof useSignContext
> | null>(null);

export const useSign = () => {
	const context = useContext(SignContext);
	if (context == null) {
		throw new Error('sign components must be wrapped in SignContext');
	}
	return context;
};

export function Sign({ type, className }: SignProps) {
	const context = useSignContext({ type });
	const {
		countdown,
		title,
		step,
		validUser,
		error,
		spinning,
		setSpinning,
		setCountdown,
		setError,
		setValidUser,
		setStep
	} = context;

	async function sendEmail() {
		setSpinning(true);
		try {
			await SignIn('resend', {
				email: validUser?.email,
				redirect: false
			}).finally(() => setSpinning(false));
			setCountdown(60);
		} catch (error) {
			setError({
				type: 'error',
				title: '发送邮件失败',
				message: '关闭此弹窗以继续',
				content: JSON.stringify(error)
			});
		}
	}

	function handleBack() {
		setValidUser(null);
		setStep('login');
	}

	return (
		<Spin spinning={spinning} className="w-auto">
			<Card
				className={cn(
					'w-[25rem] max-w-[calc(100vw-0.75rem)] md:max-w-[calc(100vw-5rem)] backdrop-blur-xl backdrop-saturate-150 bg-[hsla(0,0%,98%,.8)] dark:bg-[rgba(24,24,27,.4)]',
					className
				)}
			>
				<Card.Header className="px-8 py-4">
					<Image
						className="mb-6 rounded-full backdrop-blur-xl backdrop-saturate-150 bg-[unset]"
						src="/avatar_transparent.png"
						width={48}
						height={48}
						alt="lion"
					/>
					<Card.Title className="text-xl">
						{error.type !== 'none' ? error.title : title}
					</Card.Title>
					<Card.Description className="text-base text-foreground/65">
						{error.type !== 'none' ? error.message : '继续使用 ' + DOMAIN}
					</Card.Description>
				</Card.Header>
				<Card.Content className="px-8 flex flex-col gap-8">
					{error.type !== 'none' ? (
						<div className="flex flex-col gap-8 justify-center items-center">
							<div className="rounded-full w-24 h-24 bg-black/5 flex justify-center items-center">
								<ShieldAlertIcon className="w-10 h-12 text-warning" />
							</div>
							<p className="text-sm text-muted-foreground break-all">
								{error.content}
							</p>
						</div>
					) : (
						<SignContext.Provider value={context}>
							{step === 'login' && (
								<>
									<Providers />
									<Segment />
									<SignInForm />
									<div className="text-sm">
										<span className="text-zinc-700 dark:text-zinc-400">
											还没有账户？
											{/* {signType === 'sign-in' ? '' : '已经有账户了？'} */}
										</span>
										<Link href="#" className="underline">
											注册
											{/* {signType === 'sign-in' ? '' : '登录'} */}
										</Link>
									</div>
								</>
							)}
							{step === 'sendEmail' && (
								<>
									<div className="bg-black bg-opacity-5 px-4 py-[0.375rem] border border-black/5 gap-2 flex items-center max-w-fit min-h-[2.375rem] rounded-[1.25rem]">
										<Avatar className="bg-black bg-opacity-[0.24] w-5 h-5">
											<Avatar.Image src={validUser?.image}></Avatar.Image>
											<Avatar.Fallback>{validUser?.name}</Avatar.Fallback>
										</Avatar>
										<span className="text-muted-foreground text-sm text-ellipsis overflow-hidden">
											{validUser?.email}
										</span>
										<Button
											variant="link"
											className="px-1 py-1 h-auto focus:ring"
											onClick={handleBack}
										>
											<PenLineIcon className="text-info cursor-pointer" />
										</Button>
									</div>

									<div className="text-sm">
										<p className="font-medium">验证链接</p>
										<p className="text-muted-foreground mt-2">
											使用发送到您的电子邮件的验证链接
										</p>
										<button
											className="underline mt-4 mb-3 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
											disabled={countdown > 0}
											onClick={sendEmail}
										>
											重新发送链接{countdown > 0 && countdown}
										</button>
									</div>
								</>
							)}
						</SignContext.Provider>
					)}
				</Card.Content>
			</Card>
		</Spin>
	);
}

function Segment() {
	return (
		<div className="flex items-center gap-3">
			<div className="flex-1 h-[1px] bg-foreground/15"></div>
			<span className="text-sm text-foreground/65 font-medium">或者</span>
			<div className="flex-1 h-[1px] bg-foreground/15"></div>
		</div>
	);
}
