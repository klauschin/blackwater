import { PortableTextBlock } from '@portabletext/react';

export interface HomePageData {
	title: string;
	slug?: string | undefined;
	content: PortableTextBlock;
}
