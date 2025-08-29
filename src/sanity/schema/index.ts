import { type SchemaTypeDefinition } from 'sanity';
// Setting types
import settingsGeneral from './documents/settings-general';
import settingsIntegration from './documents/settings-integrations';
import settingsMenu from './documents/settings-menu';
import settingsSharing from './documents/settings-sharing';
import settingsRedirect from './documents/settings-redirect';
import settingsColor from './documents/settings-color';

// Object types
import link from './objects/link';
import cta from './objects/cta';
import navDropdown from './objects/nav-dropdown';
import navItem from './objects/nav-item';
import portableText from './objects/portable-text';
import portableTextSimple from './objects/portable-text-simple';
import sharing from './objects/sharing';

// Global types
import gAnnouncement from './documents/g-announcement';
import gHeader from './documents/g-header';
import gFooter from './documents/g-footer';

// Page types
import pGeneral from './documents/p-general';
import p404 from './documents/p-404';
import pHome from './documents/p-home';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		settingsGeneral,
		settingsIntegration,
		settingsMenu,
		settingsSharing,
		settingsRedirect,
		settingsColor,
		link,
		cta,
		navDropdown,
		navItem,
		portableText,
		portableTextSimple,
		sharing,
		gAnnouncement,
		gHeader,
		gFooter,
		pHome,
		pGeneral,
		p404,
	],
};
