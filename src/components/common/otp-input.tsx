export function OtpInput() {
	return (
		<OtpInput
			containerStyle={{
				gap: '0.5rem',
				width: 'max-content',
				padding: '0.25rem 0'
			}}
			value={otp}
			onChange={setOtp}
			numInputs={6}
			renderInput={(props) => (
				<input
					{...props}
					style={{}}
					className="bg-transparent w-full text-center max-w-7 min-w-[1ch] py-[0.125rem] font-semibold text-lg border-b-2 border-black/15 focus:border-info transition-colors outline-none"
				/>
			)}
		/>
	);
}
