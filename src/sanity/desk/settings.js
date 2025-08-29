import {
	CogIcon,
	InfoFilledIcon,
	PackageIcon,
	EnterRightIcon,
	DocumentVideoIcon,
} from '@sanity/icons';

export const settingsMenu = (S) => {
	return S.listItem()
		.title('Settings')
		.child(
			S.list()
				.title('Settings')
				.items([
					S.listItem()
						.title('SEO + Social Sharing')
						.child(
							S.editor()
								.id('settingsSharing')
								.schemaType('settingsSharing')
								.documentId('settingsSharing')
						)
						.icon(InfoFilledIcon),
					S.listItem()
						.title('Integrations')
						.child(
							S.editor()
								.id('settingsIntegration')
								.schemaType('settingsIntegration')
								.documentId('settingsIntegration')
						)
						.icon(PackageIcon),
					S.listItem()
						.title('Redirects')
						.child(
							S.editor()
								.id('settingsRedirect')
								.schemaType('settingsRedirect')
								.documentId('settingsRedirect')
						)
						.icon(EnterRightIcon),
					S.listItem()
						.title('Videos')
						.child(
							S.list()
								.title('Videos')
								.items([
									S.listItem()
										.title('Landscape 1')
										.child(
											S.editor()
												.id('settingsLandscape1')
												.schemaType('settingsLandscape1')
												.documentId('settingsLandscape1')
										)
										.icon(DocumentVideoIcon),
									S.listItem()
										.title('Landscape 2')
										.child(
											S.editor()
												.id('settingsLandscape2')
												.schemaType('settingsLandscape2')
												.documentId('settingsLandscape2')
										)
										.icon(DocumentVideoIcon),
									S.listItem()
										.title('Organism 1')
										.child(
											S.editor()
												.id('settingsOrganism1')
												.schemaType('settingsOrganism1')
												.documentId('settingsOrganism1')
										)
										.icon(DocumentVideoIcon),
									S.listItem()
										.title('Organism 2')
										.child(
											S.editor()
												.id('settingsOrganism2')
												.schemaType('settingsOrganism2')
												.documentId('settingsOrganism2')
										)
										.icon(DocumentVideoIcon),
									S.listItem()
										.title('Organism 3')
										.child(
											S.editor()
												.id('settingsOrganism3')
												.schemaType('settingsOrganism3')
												.documentId('settingsOrganism3')
										)
										.icon(DocumentVideoIcon),
								])
						),
				])
		)
		.icon(CogIcon);
};
