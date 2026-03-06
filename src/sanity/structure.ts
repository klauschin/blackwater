import type { StructureResolver } from 'sanity/structure';
import { colorsMenu } from './deskStructure/colors';
import { globalMenu } from './deskStructure/global';
import { menusMenu } from './deskStructure/menus';
import { pageBlog } from './deskStructure/p-blog';
import { pageCurated } from './deskStructure/p-curated';
import { pageEvent } from './deskStructure/p-event';
import { otherPagesMenu, pagesMenu } from './deskStructure/pages';
import { settingsMenu } from './deskStructure/settings';

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Website')
		.items([
			globalMenu(S),
			pagesMenu(S),
			otherPagesMenu(S),
			S.divider(),
			pageEvent(S),
			pageCurated(S),
			S.divider(),
			menusMenu(S),
			colorsMenu(S),
			S.divider(),
			settingsMenu(S),
		]);
