import { emailConfig } from '~/config/email';
import Layout from './Layout';
import { Section, Text, Link, Button, Img } from './_components';
import { FC } from 'react';
import { render } from '@react-email/render';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
	url: string;
	host: string;
	ipInfo: IpInfo;
}

export const ValidEmail: FC<Props> = ({ url, host, ipInfo }) => {
	const previewText = `你的登录链接`;
	return (
		<Layout previewText={previewText}>
			<Section className="mt-[24px]">
				<Img
					src={`${emailConfig.baseUrl}/avatar_transparent.png`}
					width="100"
					height="100"
					alt="Lion"
				/>
			</Section>
			<Section className="mt-[24px] px-2 tracking-wider">
				<Text className="text-3xl text-black font-bold">
					Sign in to
					<Link href={host} className="underline">
						{host}
					</Link>
				</Text>
				<Text className="mt-8">
					Click the button below to sign in to
					<Link href={host} className="underline font-medium">
						{host}.
					</Link>
					This link will expire in 10 minutes.
				</Text>
				<Button
					href={url}
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-zinc-800 text-primary-foreground shadow hover:bg-zinc-800/90 h-9 px-5 py-2 text-white"
				>
					Sign in to {host}
				</Button>
				<Text className="mt-8">
					If {`you're`} having trouble with the above button,{' '}
					<Link href={host} className="underline">
						click here.
					</Link>
				</Text>
			</Section>
			<Section className="mt-[48px] px-2 text-gray-500">
				<Text className="text-black font-medium text-lg">
					{`Didn't `}request this?
				</Text>
				<Text>
					This code was requested from{' '}
					<span className="text-black font-medium text-lg">
						{ipInfo.ip}，{ipInfo.country}
					</span>{' '}
					at {dayjs().fromNow()}. If you {`didn't`} make this request, you can
					safely ignore this email.
				</Text>
			</Section>
		</Layout>
	);
};

export function getEmailTextAndHtml(props: Props) {
	const text = render(<ValidEmail {...props} />, {
		plainText: true
	});

	const html = render(<ValidEmail {...props} />, {
		pretty: true
	});

	return { text, html };
}

export default getEmailTextAndHtml;
