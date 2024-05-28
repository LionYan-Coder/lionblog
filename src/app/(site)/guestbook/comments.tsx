'use client';

import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar, PostPortableText, Prose } from '~/components';
dayjs.extend(relativeTime);

function MessageBlock({ guestbook }: { guestbook: Guestbook }) {
	return (
		<>
			<span className="absolute left-5 top-14 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 h-[calc(100%-4.5rem)] "></span>
			<div className="relative flex items-start space-x-3">
				<Avatar className="w-10 h-10 ring-2 ring-zinc-200 flex-shrink-0">
					<Avatar.Image src={guestbook.user.image} />
					<Avatar.Fallback>{guestbook.user.name}</Avatar.Fallback>
				</Avatar>
				<div className="-mt-1 flex min-w-0 flex-1 items-center gap-3">
					<b className="text-sm font-bold dark:text-zinc-100">
						{guestbook.user.name}
					</b>
					<time
						className="opacity-40 text-xs select-none"
						dateTime={guestbook._createdAt}
					>
						{dayjs(guestbook._createdAt).locale('zh-cn').fromNow()}
					</time>
				</div>
			</div>
			<div className="-mt-4 mb-1 pl-[3.25rem] text-sm">
				<Markdown remarkPlugins={[remarkGfm]}>{guestbook.message}</Markdown>
			</div>
		</>
	);
}

export function Comments({ guestbooks }: { guestbooks: Guestbook[] }) {
	return (
		<div className="relative mt-12">
			<motion.ul
				variants={{
					initial: { opacity: 0 },
					animate: {
						opacity: 1,
						transition: {
							staggerChildren: 0.2
						}
					}
				}}
				initial="initial"
				animate="animate"
			>
				{guestbooks.map((guestbook) => (
					<motion.li
						key={guestbook._id}
						variants={{
							initial: { opacity: 0, y: 20 },
							animate: {
								opacity: 1,
								y: 0,
								transition: {
									type: 'spring'
								}
							}
						}}
						className="relative pb-8"
					>
						<MessageBlock key={guestbook._id} guestbook={guestbook} />
					</motion.li>
				))}
			</motion.ul>
		</div>
	);
}
