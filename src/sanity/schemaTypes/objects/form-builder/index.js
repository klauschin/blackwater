import { ThListIcon } from '@sanity/icons';

export default function formBuilder({ name = 'formField' } = {}) {
	return {
		name: name,
		icon: ThListIcon,
		type: 'array',
		of: [{ type: 'formField' }],
		preview: {
			prepare() {
				return {
					title: 'Form Builder',
					media: ThListIcon,
				};
			},
		},
	};
}
