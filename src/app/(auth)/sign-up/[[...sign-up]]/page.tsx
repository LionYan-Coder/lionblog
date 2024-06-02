import { Sign } from '~/app/_components/sign';
import { Container } from '~/components';

export default function SignUpPage() {
	return (
		<div className="bg-background">
			<Container className="mt-16">
				<div className="flex justify-center items-center">
					<Sign
						type="sign-up"
						className="border-none backdrop-blur-none backdrop-saturate-0 shadow-large bg-white dark:bg-[rgba(24,24,27,.4)]"
					/>
				</div>
			</Container>
		</div>
	);
}
