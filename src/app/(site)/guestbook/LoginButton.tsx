'use client';
import { UserArrowLeftIcon } from '~/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button, Dialog } from '~/components';
import { SignDialog } from '~/app/_components/sign-dialog';

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
			<AnimatePresence>{dialogOpen && <SignDialog />}</AnimatePresence>
		</Dialog.Root>
	);
}
