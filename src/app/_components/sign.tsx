'use client';
import { Dialog, Tooltip } from '~/components';

import { UserArrowLeftIcon, XIcon } from '~/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SignForm } from './sign-form';

export function SignInOrUp() {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Tooltip.Provider delayDuration={400}>
			<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
				<Tooltip.Root open={tooltipOpen} onOpenChange={setTooltipOpen}>
					<Tooltip.Trigger asChild>
						<Dialog.Trigger asChild>
							<motion.button
								initial={{ opacity: 0, y: -15 }}
								animate={{ opacity: 1, y: 0 }}
								className="group h-10 flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-3 text-xl font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80"
								type="button"
							>
								<UserArrowLeftIcon />
							</motion.button>
						</Dialog.Trigger>
					</Tooltip.Trigger>
					<AnimatePresence>
						{tooltipOpen && (
							<Tooltip.Portal forceMount>
								<Tooltip.Content asChild>
									<motion.div
										initial={{ opacity: 0, scale: 0.96 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
									>
										用户登录
									</motion.div>
								</Tooltip.Content>
							</Tooltip.Portal>
						)}
					</AnimatePresence>
				</Tooltip.Root>

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
		</Tooltip.Provider>
	);
}
