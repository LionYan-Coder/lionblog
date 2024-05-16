import { SignForm } from '~/app/_components/sign-form';
import { Container } from '~/components';

export default function SignUpPage() {
	return (
		<div className="fixed inset-0 z-50 bg-background">
			<Container className="mt-28">
				<div className="flex justify-center">
					<SignForm mode="page" type="signup" />
				</div>
			</Container>
		</div>
	);
}
