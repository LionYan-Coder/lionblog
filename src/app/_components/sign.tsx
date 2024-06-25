'use client';

import { Alert, Avatar, Button, Card, OtpInput, Spin } from '~/components';
import { cn } from '~/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Providers } from './provider-form';
import { DOMAIN } from '~/config/constants';
import { SignInForm, SignUpForm } from './sign-form';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import { PenLineIcon } from '~/assets';
import { SignIn } from '~/lib/actions/auth';
import { z } from 'zod';
import { signUpFormSchema } from '~/lib/schema';
import { getFullName } from '~/lib/user';
import { AnimatePresence, motion } from 'framer-motion';
import { signUp } from '~/lib/sanity/client';

interface SignProps {
	type?: 'sign-in' | 'sign-up';
	mode?: 'page' | 'modal';
	className?: string;
}

interface SignError {
	type: 'warning' | 'error' | 'none';
	title: string;
	description?: string;
}

function useSignContext({ type }: SignProps) {
	const [signType, setSignType] = useState<SignProps['type']>(type);
	const [step, setStep] = useState<
		'login' | 'register' | 'verifyEmailLink' | 'verifyEmailCode'
	>(type === 'sign-in' ? 'login' : 'register');
	const title = useMemo(() => {
		if (step === 'login') {
			return '登录';
		} else if (step === 'register') {
			return '创建您的账户';
		} else if (step === 'verifyEmailLink') {
			return '查看您的电子邮件';
		} else if (step === 'verifyEmailCode') {
			return '验证您的电子邮件';
		}
	}, [step]);

	const [countdown, setCountdown] = useState(0);
	const [spinning, setSpinning] = useState(false);
	const [loginUser, setLoginUser] = useState<User | null>(null);
	const [registerUser, setRegisterUser] = useState<z.infer<
		typeof signUpFormSchema
	> | null>(null);
	const [error, setError] = useState<SignError>({
		type: 'none',
		title: '',
		description: ''
	});
	const timer = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (countdown > 0 && timer.current === null) {
			timer.current = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}

		if (countdown === 0) {
			if (timer.current) clearInterval(timer.current);
			timer.current = null;
		}

		return () => {
			if (timer.current) clearInterval(timer.current);
			timer.current = null;
		};
	}, [countdown]);

	return useMemo(
		() => ({
			signType,
			title,
			step,
			countdown,
			loginUser,
			error,
			registerUser,
			setRegisterUser,
			setError,
			setLoginUser,
			setStep,
			setSignType,
			spinning,
			setSpinning,
			setCountdown
		}),
		[countdown, error, registerUser, signType, spinning, step, title, loginUser]
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

export function Sign({ type, className, mode = 'modal' }: SignProps) {
	const context = useSignContext({ type });
	const { title, step, error, spinning, setStep, setRegisterUser } = context;

	// useEffect(() => {
	// 	setStep('verifyEmailCode');
	// 	setRegisterUser({
	// 		email: 'yanyahonglong@gmail.com'
	// 	} as any);
	// }, []);

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
					<Card.Title className="text-xl">{title}</Card.Title>
					<Card.Description className="text-base text-foreground/65">
						{'继续使用 ' + DOMAIN}
					</Card.Description>
					<AnimatePresence>
						{error.type !== 'none' && (
							<motion.div
								layout
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -15 }}
							>
								<Alert variant="destructive" className="bg-black/5">
									<Alert.Title>{error.title}</Alert.Title>
									<Alert.Description>{error.description}</Alert.Description>
								</Alert>
							</motion.div>
						)}
					</AnimatePresence>
				</Card.Header>
				<Card.Content className="px-8 flex flex-col gap-6 text-xs">
					<SignContext.Provider value={context}>
						{['login', 'register'].includes(step) && (
							<FormContent mode={mode} />
						)}
						{step === 'verifyEmailLink' && <VerifyEmailLinkContent />}
						{step === 'verifyEmailCode' && <VerifyEmailCodeContent />}
					</SignContext.Provider>
				</Card.Content>
			</Card>
		</Spin>
	);
}

function FormContent({ mode }: { mode: SignProps['mode'] }) {
	const { step, setStep } = useSign();
	return (
		<>
			<Providers />
			<Segment />
			{step === 'login' && <SignInForm />}
			{step === 'register' && <SignUpForm />}
			<div className="text-sm">
				<span className="text-zinc-700 dark:text-zinc-400">
					{step === 'login' ? '还没有账户？' : '已经有账户了？'}
				</span>

				{mode === 'modal' ? (
					<button
						className="underline"
						onClick={() =>
							step === 'login' ? setStep('register') : setStep('login')
						}
					>
						{step === 'login' ? '注册' : '登录'}
					</button>
				) : (
					<Link
						href={step === 'login' ? '/sign-up' : '/sign-in'}
						className="underline"
					>
						{step === 'login' ? '注册' : '登录'}
					</Link>
				)}
			</div>
		</>
	);
}

function VerifyEmailLinkContent() {
	const {
		loginUser,
		setSpinning,
		setCountdown,
		setLoginUser,
		setStep,
		countdown,
		setError
	} = useSign();
	async function reSendEmail() {
		setSpinning(true);
		try {
			await SignIn('resend', {
				email: loginUser?.email,
				redirect: false
			}).finally(() => setSpinning(false));
			setCountdown(30);
		} catch (error) {
			setError({
				type: 'error',
				title: '发送邮件失败',
				description: JSON.stringify(error)
			});
		}
	}

	function handleBack() {
		setLoginUser(null);
		setStep('login');
	}
	return (
		<>
			<div className="bg-black/5 px-4 py-[0.375rem] border border-black/5 gap-2 flex items-center max-w-fit min-h-[2.375rem] rounded-[1.25rem]">
				<Avatar className="bg-black bg-opacity-[0.24] w-5 h-5">
					<Avatar.Image src={loginUser?.image}></Avatar.Image>
					<Avatar.Fallback>{loginUser?.name}</Avatar.Fallback>
				</Avatar>
				<span className="text-muted-foreground text-sm text-ellipsis overflow-hidden">
					{loginUser?.email}
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
					onClick={reSendEmail}
				>
					重新发送链接{countdown > 0 && countdown}
				</button>
			</div>
		</>
	);
}

function VerifyEmailCodeContent() {
	const {
		registerUser,
		setRegisterUser,
		setSpinning,
		setCountdown,
		setStep,
		countdown,
		setError
	} = useSign();

	const [otp, setOtp] = useState('');
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	function handleBack() {
		setRegisterUser(null);
		setStep('register');
	}

	async function reSendCode() {
		setSpinning(true);
		try {
			await fetch('/api/user/sendEmailCode', {
				method: 'POST',
				body: JSON.stringify(registerUser)
			})
				.then<{ id: string }>((res) => res.json())
				.finally(() => setSpinning(false));
			setCountdown(30);
		} catch (error) {
			setError({
				type: 'error',
				title: '发送邮件失败',
				description: JSON.stringify(error)
			});
		}
	}

	const verifyCode = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch('/api/user/verifyEmailCode', {
				method: 'POST',
				body: JSON.stringify({ email: registerUser?.email, code: otp })
			})
				.then<BaseResponse<boolean>>((res) => res.json())
				.finally(() => setLoading(false));

			if (res.data) {
				// signUp(registerUser)
			} else {
				setErrMsg(res.message);
			}
		} catch (error) {
			setError({
				type: 'error',
				title: '验证失败',
				description: JSON.stringify(error)
			});
		}
	}, [otp, registerUser?.email, setError]);

	useEffect(() => {
		if (otp && otp.length === 6) {
			console.log('verifyCode', verifyCode);

			verifyCode();
		}
	}, [otp, verifyCode]);

	return (
		<>
			<div className="bg-black/5 px-4 py-[0.375rem] border border-black/5 gap-2 flex items-center max-w-fit min-h-[2.375rem] rounded-[1.25rem]">
				<Avatar className="bg-black bg-opacity-[0.24] w-5 h-5">
					<Avatar.Image src="/avatar_placeholder.avif"></Avatar.Image>
					<Avatar.Fallback>
						{getFullName({
							firstName: registerUser?.firstName,
							lastName: registerUser?.lastName
						})}
					</Avatar.Fallback>
				</Avatar>
				<span className="text-muted-foreground text-ellipsis overflow-hidden">
					{registerUser?.email}
				</span>
				<Button
					variant="link"
					className="px-1 py-1 h-auto focus:ring"
					onClick={handleBack}
				>
					<PenLineIcon className="text-info cursor-pointer" />
				</Button>
			</div>

			<div>
				<p className="font-medium">验证码</p>
				<p className="text-muted-foreground mt-2">
					输入发送到您的电子邮件地址的验证码
				</p>
				<OtpInput
					shouldAutoFocus
					errMsg={errMsg}
					loading={loading}
					value={otp}
					onChange={setOtp}
				/>
				<button
					className="underline mt-6 mb-3 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
					disabled={countdown > 0}
					onClick={reSendCode}
				>
					重新发送验证码{countdown > 0 && countdown}
				</button>
			</div>
		</>
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
