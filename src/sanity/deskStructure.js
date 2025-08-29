import { globalMenu } from './desk/global';
import { pagesMenu, otherPagesMenu } from './desk/pages';
import { menusMenu } from './desk/menus';
import { colorsMenu } from './desk/colors';
import { settingsMenu } from './desk/settings';

const deskStructure = (S, context) =>
	S.list()
		.title('Website')
		.items([
			globalMenu(S),
			pagesMenu(S),
			otherPagesMenu(S),
			S.divider(),
			menusMenu(S),
			colorsMenu(S),
			S.divider(),
			settingsMenu(S),
		]);

export default deskStructure;
