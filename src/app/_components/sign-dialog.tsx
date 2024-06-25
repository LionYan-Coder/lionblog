'use client';
import { Dialog } from '~/components';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { XIcon } from '~/assets';
import { Sign } from './sign';

export function SignDialog() {
	return (
		<Dialog.Portal forceMount>
			<DialogPrimitive.Overlay asChild>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed z-40 w-screen h-[-webkit-fill-available] backdrop-blur-sm backdrop-saturate-150 bg-zinc-100/40 dark:bg-zinc-900/40 overflow-y-auto flex justify-center items-start"
				>
					<DialogPrimitive.Content asChild>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 30 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 30 }}
							className="relative z-50 my-16"
						>
							<Sign type="sign-in" />
							<DialogPrimitive.Close
								autoFocus={false}
								className="absolute text-lg right-4 top-4 p-1 rounded-sm opacity-60 bg-transparent hover:bg-zinc-400/30 hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-all"
							>
								<XIcon />
								<span className="sr-only">关闭</span>
							</DialogPrimitive.Close>
						</motion.div>
					</DialogPrimitive.Content>
				</motion.div>
			</DialogPrimitive.Overlay>
		</Dialog.Portal>
	);
}
