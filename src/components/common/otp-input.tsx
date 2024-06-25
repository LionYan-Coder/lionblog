'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Otp, { OTPInputProps } from 'react-otp-input';
import { CircleAlertIcon, LoaderCircleIcon } from '~/assets';
import { cn } from '~/lib/utils';

interface OtpExtendProps {
	loading?: boolean;
	status?: 'pending' | 'success' | 'error' | 'none';
	errMsg?: string;
}

export function OtpInput({
	value,
	onChange,
	containerStyle,
	loading = false,
	status = 'none',
	errMsg = '',
	...rest
}: Omit<OTPInputProps, 'renderInput'> & OtpExtendProps) {
	const [unControlledValue, setUnControlledValue] =
		useState<OTPInputProps['value']>(value);
	const [unControlledStatus, setUnControlledStatus] =
		useState<OtpExtendProps['status']>(status);

	function handleChangeValue(otp: string) {
		setUnControlledValue(otp);
		onChange(otp);
	}

	const inputCls = cn(
		'bg-transparent w-full text-center max-w-7 min-w-[1ch] py-[0.125rem] font-semibold text-xl leading-[2] border-b-2 border-black/15 focus:border-info transition-colors outline-none',
		{ 'border-info': unControlledStatus === 'pending' },
		{ 'border-success': unControlledStatus === 'success' },
		{ 'border-destructive': unControlledStatus === 'error' }
	);

	useEffect(() => {
		setUnControlledValue(value);
	}, [value]);

	useEffect(() => {
		setUnControlledStatus(status);
	}, [status]);

	return (
		<AnimatePresence>
			<div>
				<div className="flex items-end space-x-8">
					<Otp
						containerStyle={
							typeof containerStyle === 'string'
								? containerStyle
								: {
										gap: '0.5rem',
										width: 'max-content',
										padding: '0.25rem 0',
										...containerStyle
									}
						}
						value={unControlledValue}
						onChange={handleChangeValue}
						numInputs={6}
						{...rest}
						renderInput={(props) => (
							<input {...props} style={{}} className={inputCls} />
						)}
					/>

					{loading && (
						<motion.div
							initial={{ opacity: 0, x: -15 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -10 }}
						>
							<LoaderCircleIcon className="animate-spin text-black/85 text-base" />
						</motion.div>
					)}
				</div>
				{errMsg && errMsg.length > 0 && (
					<motion.p
						initial={{ opacity: 0, y: -15 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-destructive text-sm mt-2"
					>
						<CircleAlertIcon className="mr-2" /> {errMsg}
					</motion.p>
				)}
			</div>
		</AnimatePresence>
	);
}
