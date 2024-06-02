'use client';
import { Card, Container } from '~/components';
import { cn } from '~/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { LoaderCircleIcon, ShieldAlertIcon } from '~/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SignError {
	type: 'warning' | 'error' | 'none';
	title: string;
	message?: string;
	content?: string;
}

export default function SignInPage() {
	const router = useRouter();
	const [error, setError] = useState<SignError>({
		type: 'none',
		title: '',
		message: '',
		content: ''
	});

	useEffect(() => {
		async function validEmail() {
			const res = await fetch(
				'/api/user/validEmail' + window.location.search
			).then((res) => res.json());

			if (res) {
				if (res.expired) {
					setError({
						type: 'warning',
						title: '这个链接已过期',
						message: '回到原标签页以继续',
						content: '你可以关闭此标签页'
					});
				} else if (res.redirect_url) {
					router.replace(res.redirect_url);
				} else {
					setError({
						type: 'error',
						title: '服务器错误',
						message: '验证出现错误',
						content: JSON.stringify(res.error)
					});
				}
			}
		}

		validEmail();
	}, []);

	return (
		<div className="bg-background">
			<Container className="mt-28">
				<div className="flex justify-center">
					<Card
						className={cn(
							'w-[25rem] max-w-[calc(100vw-0.75rem)] md:max-w-[calc(100vw-5rem)] backdrop-blur-xl backdrop-saturate-150 bg-[hsla(0,0%,98%,.8)] dark:bg-[rgba(24,24,27,.4)]',
							'border-none backdrop-blur-none backdrop-saturate-0 shadow-large bg-white dark:bg-[rgba(24,24,27,.4)]'
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
								{error.type !== 'none' ? error.title : 'Sign in...'}
							</Card.Title>
							<Card.Description className="text-base text-foreground/65">
								{error.type !== 'none' ? error.message : '校验稍等片刻后重定向'}
							</Card.Description>
						</Card.Header>
						<Card.Content className="p-12 flex flex-col items-center justify-center gap-8">
							<AnimatePresence mode="popLayout">
								{error.type !== 'none' ? (
									<div className="flex flex-col gap-8 items-center justify-center">
										<motion.div
											initial={{ opacity: 0, y: 25 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -15 }}
											className="rounded-full w-24 h-24 bg-black/5 flex justify-center items-center"
										>
											<ShieldAlertIcon className="w-10 h-12 text-warning" />
										</motion.div>
										<p className="text-xs text-muted-foreground break-all">
											{error.content}
										</p>
									</div>
								) : (
									<motion.div
										initial={{ opacity: 0, y: 25 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -15 }}
									>
										<LoaderCircleIcon className="w-20 h-20 animate-spin duration-500 opacity-40" />
									</motion.div>
								)}
							</AnimatePresence>
						</Card.Content>
					</Card>
				</div>
			</Container>
		</div>
	);
}
