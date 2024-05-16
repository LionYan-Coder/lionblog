import type { UrlInputProps } from 'sanity';
import { Avatar } from '@sanity/ui';

export function AvatarImage(props: UrlInputProps) {
	return <Avatar size={3} src={props.value}></Avatar>;
}
