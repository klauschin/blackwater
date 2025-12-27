import Menu from '@/components/Menu';
import { motion } from 'motion/react';
import type { SettingsMenu } from 'sanity.types';

export function ToolBar({ menu }: { menu: SettingsMenu }) {
	return (
		<motion.div className="bg-background/85 backdrop-blur-lg text-foreground px-contain py-6 lg:hidden fixed bottom-0 w-full">
			{menu && (
				<Menu
					data={menu}
					className="flex items-center t-b-2 gap-2.5 select-none uppercase justify-between"
				/>
			)}
		</motion.div>
	);
}
