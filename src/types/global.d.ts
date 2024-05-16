interface Asset {
	_type: string;
	alt: string;
	asset: {
		url: string;
		alt: string;
		lqip?: string;
		dominant?: {
			title: string;
			population: number;
			background: string;
			foreground: string;
		};
	};
}

interface Color {
	hex: string;
	_type: string;
	alpha: number;
	hsl: {
		h: number;
		l: number;
		a: number;
		s: number;
	};
	hsv: {
		h: number;
		a: number;
		s: number;
		v: number;
	};
	rgb: {
		g: number;
		a: number;
		b: number;
		r: number;
	};
}

interface BlockText {
	text: string;
	_key: string;
	_type: string;
	marks: string[];
}
interface BlockContent {
	markDefs: string[];
	style: string;
	_key: string;
	_type: string;
	children: BlockText;
}

interface HeadingNode {
	_type: 'span';
	text: string;
	_key: string;
}

interface Node {
	_type: 'block';
	style: 'h1' | 'h2' | 'h3' | 'h4';
	_key: string;
	children?: HeadingNode[];
}
