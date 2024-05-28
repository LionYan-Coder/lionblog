'use client';
import { UserArrowLeftIcon, XIcon } from '~/assets';
import { AnimatePresence, motion } from 'framer-motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button, Dialog } from '~/components';
import { SignForm } from '~/app/_components/sign-form';

export function LoginButton() {
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Dialog.Trigger asChild>
				<motion.div
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<Button className="gap-2 text-sm font-semibold">
						<UserArrowLeftIcon className="mr-1 text-lg" />
						登录即可留言
					</Button>
				</motion.div>
			</Dialog.Trigger>
			<AnimatePresence>
				{dialogOpen && (
					<Dialog.Portal forceMount>
						<DialogPrimitive.Overlay asChild>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="fixed z-40 inset-0 backdrop-blur-sm backdrop-saturate-150 bg-zinc-100/40 dark:bg-zinc-900/40"
							></motion.div>
						</DialogPrimitive.Overlay>
						<DialogPrimitive.Content asChild>
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 30 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 30 }}
								className="relative z-40 my-20"
							>
								<SignForm type="signin" mode="modal" />
								<DialogPrimitive.Close
									autoFocus={false}
									className="absolute text-lg right-4 top-4 p-1 rounded-sm opacity-60 bg-transparent hover:bg-zinc-400/30 hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all"
								>
									<XIcon />
									<span className="sr-only">关闭</span>
								</DialogPrimitive.Close>
							</motion.div>
						</DialogPrimitive.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
