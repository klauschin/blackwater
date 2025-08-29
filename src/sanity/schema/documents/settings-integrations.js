import { defineType } from 'sanity';

export default defineType({
	title: 'Integrations',
	name: 'settingsIntegration',
	type: 'document',
	fieldsets: [
		{
			title: '.network',
			name: 'network',
		},
		{
			title: '.foundation',
			name: 'foundation',
		},
	],
	fields: [
		{
			title: 'Google Analytics (GA)',
			description: 'G-XXXXXXXXXX',
			name: 'gaID',
			type: 'string',
			fieldset: 'network',
		},
		{
			title: 'Google Tag Manager (GTM)',
			description: 'GTM-XXXXXXX',
			name: 'gtmID',
			type: 'string',
			fieldset: 'network',
		},
		{
			title: 'Google Analytics (GA)',
			description: 'G-XXXXXXXXXX',
			name: 'gaIDfoundation',
			type: 'string',
			fieldset: 'foundation',
		},
		{
			title: 'Google Tag Manager (GTM)',
			description: 'GTM-XXXXXXX',
			name: 'gtmIDfoundation',
			type: 'string',
			fieldset: 'foundation',
		},
		{
			title: 'Hubspot Portal ID',
			name: 'hubspotPortalId',
			type: 'string',
			description:
				'Once you log into HubSpot CRM, your account information will be available on the top right of your screen. It will include the email address associated with the account and the Hub Portal ID.',
		},
		{
			title: 'Enable Hubspot tracking code',
			name: 'enableHubspotTrackingCode',
			type: 'boolean',
			description: 'Hubspot Portal ID must be provided',
		},
		{
			title: 'Cookiebot Domain Group ID',
			name: 'cookiebotDomainID',
			type: 'string',
			description:
				'Manage cookie consent banner on https://manage.cookiebot.com',
		},
		{
			title: "Enable Cookiebot's cookie consent banner",
			name: 'enableCookieConsent',
			type: 'boolean',
			description: 'Cookiebot Domain Group ID must be provided',
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Integrations',
			};
		},
	},
});
