import { emailConfig } from '~/config/email';
import Layout from './Layout';
import { Section, Text, Link, Button, Img } from './_components';
import { FC } from 'react';
import { render } from '@react-email/render';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface Props {
	code: string;
	ipInfo: IpInfo;
}

export const SignUpCodeEmail: FC<Props> = ({ code, ipInfo }) => {
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
				<Text className="text-3xl text-black font-bold">Verification code</Text>
				<Text className="mt-8">
					Enter the following verification code when prompted:
				</Text>
				<Text className="text-3xl text-black font-bold">{code}</Text>
				<Text className="mt-8">
					To protect your account, do not share this code.
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
	const text = render(<SignUpCodeEmail {...props} />, {
		plainText: true
	});

	const html = render(<SignUpCodeEmail {...props} />, {
		pretty: true
	});

	return { text, html };
}

export default getEmailTextAndHtml;
