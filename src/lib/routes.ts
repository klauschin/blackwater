export const checkIfActive = ({
	pathName,
	url,
	isChild,
}: {
	pathName: string;
	url: string;
	isChild?: boolean;
}) => {
	if (isChild) {
		return pathName.split('/')[1] == url.split('/')[1];
	} else {
		return pathName == url;
	}
};

export const getRoute = ({
	documentType,
	slug,
}: {
	documentType: string | undefined;
	slug: string | undefined;
}): string => {
	if (!documentType) return '';

	switch (documentType) {
		case 'pHome':
			return '/';
		case 'externalUrl':
			return slug || '';

		default:
			return slug ? `/${slug}` : '';
	}
};

export const getWindowURl = (windowUrl: string) => {
	if (windowUrl.includes('localhost:')) {
		return `http://${windowUrl}`;
	}
	return `https://${windowUrl}`;
};
