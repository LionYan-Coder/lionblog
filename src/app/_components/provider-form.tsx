import {
	ArrowRightIcon,
	GitHubBrandIcon,
	GoogleBrandIcon,
	TwitterIcon
} from '~/assets';
import { providerMap } from '~/auth';
import { Button } from '~/components';
import { SignIn } from '~/lib/actions/auth';

function StrategyIcon({ id, className }: { id: string; className?: string }) {
	if (id === 'github') {
		return <GitHubBrandIcon className={className} />;
	}
	if (id === 'google') {
		return <GoogleBrandIcon className={className} />;
	}

	return <TwitterIcon className={className} />;
}

export function Providers() {
	return (
		<div className="flex flex-col gap-2 text-[13px]">
			{providerMap.map((provider) => (
				<Button
					className="group w-full bg-[unset] backdrop-blur-sm justify-start gap-4 font-normal hover:bg-black/5 text-[13px]"
					variant="outline"
					size="lg"
					key={provider.id}
					onClick={() => SignIn(provider.id)}
				>
					<StrategyIcon id={provider.id} className="text-xl" />
					<span className="flex-1 text-start text-foreground">
						使用 {provider.name} 登录
					</span>
					<ArrowRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all" />
				</Button>
			))}
		</div>
	);
}
