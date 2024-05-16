'use client';
import { Card, Button, Input, Label } from '~/components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { DOMAIN } from '~/config/constants';
import { ProviderForm } from './provider-form';
import { XIcon } from '~/assets';
import { useState } from 'react';
import { cn } from '~/lib/utils';

interface SignDialogProps {
	type?: 'signin' | 'signup';
	mode?: 'modal' | 'page';
}

export function SignForm({ type, mode = 'page' }: SignDialogProps) {
	const [signType, setSignType] = useState<SignDialogProps['type']>(
		type || 'signin'
	);

	function handleChangeSignType() {
		if (mode === 'modal') {
			setSignType(signType === 'signin' ? 'signup' : 'signin');
			return;
		}
	}

	return (
		<Card
			className={cn(
				'w-[25rem] max-w-[calc(100vw-0.75rem)] md:max-w-[calc(100vw-5rem)] backdrop-blur-xl backdrop-saturate-150 bg-[hsla(0,0%,98%,.8)] dark:bg-[rgba(24,24,27,.4)]',
				mode === 'page' &&
					'border-none backdrop-blur-none backdrop-saturate-0 shadow-large bg-white dark:bg-[rgba(24,24,27,.4)]'
			)}
		>
			<Image
				className="rounded-full absolute left-1/2 -translate-x-1/2 -top-9 backdrop-blur-xl backdrop-saturate-150 bg-[unset]"
				src="/avatar_transparent.png"
				width={60}
				height={60}
				alt="lion"
			/>
			<Card.Header className="px-8">
				<Card.Title className="text-xl">
					{signType === 'signin' ? '登录' : '创建您的账户'}
				</Card.Title>
				<Card.Description className="text-base text-foreground/65">
					继续使用 {DOMAIN}
				</Card.Description>
			</Card.Header>
			<Card.Content className="px-8">
				<ProviderForm />
				<div className="flex items-center my-8 gap-3">
					<div className="flex-1 h-[1px] bg-foreground/15"></div>
					<span className="text-sm text-foreground/65 font-medium">或者</span>
					<div className="flex-1 h-[1px] bg-foreground/15"></div>
				</div>
				<div className="flex flex-col gap-2">
					<Label htmlFor="email">电子邮件地址</Label>
					<Input />
					<Button className="w-full block mt-2 text-xs font-semibold ">
						继续
					</Button>
				</div>
				<div className="mt-6 text-sm">
					<span className="text-zinc-700 dark:text-zinc-400">
						{signType === 'signin' ? '还没有账户？' : '已经有账户了？'}
					</span>
					<Link
						className="underline"
						href={
							mode === 'page'
								? signType === 'signin'
									? '/sign-up'
									: '/sign-in'
								: '#'
						}
						onClick={handleChangeSignType}
					>
						{signType === 'signin' ? '注册' : '登录'}
					</Link>
				</div>
			</Card.Content>
		</Card>
	);
}
