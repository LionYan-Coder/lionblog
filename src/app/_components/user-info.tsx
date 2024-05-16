'use client';
import { motion } from 'framer-motion';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { client } from 'sanity/lib/client';
import { ArrowRightFromLineIcon } from '~/assets';
import { Avatar, Popover } from '~/components';
import { SignOut } from '~/lib/actions/auth';
import { cn } from '~/lib/utils';

function UserAvatar({ user, className }: { user?: User; className?: string }) {
	return (
		<Avatar className={cn('ring-2 ring-white/20', className)}>
			<Avatar.Image src={user?.image || ''} />
			<Avatar.Fallback className="text-xs">{user?.name}</Avatar.Fallback>
		</Avatar>
	);
}

export function UserInfo() {
	const session = useSession();
	// client.getDocuments()
	return (
		<Popover>
			<Popover.Trigger asChild>
				<motion.div
					className="pointer-events-auto relative flex h-10 items-center "
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 25 }}
				>
					<button
						aria-expanded="true"
						className="focus:shadow-avatar bg-zinc-100 dark:bg-zinc-900 rounded-full hover:opacity-90 outline-0 select-none transition-all"
					>
						<UserAvatar user={session.data?.user} />
					</button>
					{/* {StrategyIcon && (
				<span className="pointer-events-none absolute -bottom-1 -right-1 flex h-4 w-4 select-none items-center justify-center rounded-full bg-white dark:bg-zinc-900">
					<StrategyIcon className="h-3 w-3" />
				</span>
			)} */}
				</motion.div>
			</Popover.Trigger>
			<Popover.Content align="end" className="rounded-2xl w-64 p-0">
				<div className="py-4 flex flex-col">
					<div className="px-4 mb-2 flex items-center justify-start gap-4">
						<UserAvatar className="w-9 h-9" user={session.data?.user} />
						<div>
							<p className="text-sm font-medium">{session.data?.user?.name}</p>
							<p className="text-xs text-foreground/65">
								{session.data?.user?.email}
							</p>
						</div>
					</div>
					<div className="flex flex-col mt-2">
						<button
							className="px-4 py-3 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-950 transition-colors"
							onClick={() => SignOut()}
						>
							<ArrowRightFromLineIcon className="mx-3 opacity-85 text-sm text-foreground/65" />
							<span className="text-[13px] text-foreground/65">退出登录</span>
						</button>
					</div>
				</div>
			</Popover.Content>
		</Popover>
	);
}
