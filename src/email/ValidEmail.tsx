import { emailConfig } from '~/config/email';
import Layout from './Layout';
import { Section, Text, Link, Button, Img } from './_components';
import { FC } from 'react';
import { render } from '@react-email/render';

interface Props {
	url: string;
	host: string;
}

export const ValidEmail: FC<Props> = ({ url, host }) => {
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
				<Text className="text-2xl text-black font-bold">
					在
					<Link href={host} className="underline">
						{host}
					</Link>
					登录
				</Text>
				<Text className="mt-8">
					点击下方按钮登录
					<Link href={host} className="underline font-medium">
						{host}
					</Link>
				</Text>
				<Text className="mt-4">此链接有效期为10分钟</Text>
				<Button
					href={url}
					className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-zinc-800 text-primary-foreground shadow hover:bg-zinc-800/90 h-9 px-5 py-2 text-white"
				>
					Sign in to {host}
				</Button>
			</Section>
			<Section className="mt-[48px] text-xs px-2 text-gray-500">
				如果不是你发起的此请求，请忽略
			</Section>
		</Layout>
	);
};

export function getEmailTextAndHtml({ url, host }: Props) {
	const text = render(<ValidEmail url={url} host={host} />, {
		plainText: true
	});

	const html = render(<ValidEmail url={url} host={host} />, {
		pretty: true
	});

	return { text, html };
}

export default getEmailTextAndHtml;
