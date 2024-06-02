'use client';
import { Dialog, Tooltip } from '~/components';

import { UserArrowLeftIcon } from '~/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { SignDialog } from './sign-dialog';

export function SignInButton() {
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

				<AnimatePresence>{dialogOpen && <SignDialog />}</AnimatePresence>
			</Dialog.Root>
		</Tooltip.Provider>
	);
}
