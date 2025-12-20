import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import * as queries from '@/sanity/lib/queries';
import { resolveHref } from '@/lib/utils';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const docId = searchParams.get('docId');
	const slug = searchParams.get('slug');
	const documentType = searchParams.get('documentType');
	const homePageID = await client.fetch(queries.homeID);

	if (docId.includes(homePageID)) {
		redirect('/');
	}

	const url = resolveHref({ documentType, slug });
	redirect(url);
}
