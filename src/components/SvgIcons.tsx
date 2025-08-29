export interface SvgIconsProps {
	type: string | undefined;
}

export default function SvgIcons({ type }: SvgIconsProps) {
	switch (type) {
		case 'home':
			return (
				<svg
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="svg-icon svg-home"
				>
					<path
						d="M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M6 14.6667V8H10V14.6667"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case 'document':
			return (
				<svg
					className="svg-icon svg-document"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g stroke="currentColor">
						<path d="M9.592 1.439H3.225A1.592 1.592 0 0 0 1.633 3.03v12.734a1.592 1.592 0 0 0 1.592 1.592h9.55a1.592 1.592 0 0 0 1.592-1.592v-9.55L9.592 1.439Z" />
						<path d="M9.592 1.439v4.775h4.775M11.184 10.193H4.817M11.184 13.377H4.817M6.409 7.01H4.817" />
					</g>
				</svg>
			);
		case 'account-head':
			return (
				<svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="0.5" y="0.5" width="34" height="34" rx="17" fill="#84B6D2" />
					<rect
						x="0.5"
						y="0.5"
						width="34"
						height="34"
						rx="17"
						stroke="#84B6D2"
					/>
					<path
						d="M6.78125 35V33.25C6.78125 26.4845 11.5802 21 17.5001 21C23.4199 21 28.2189 26.4845 28.2189 33.25V35"
						fill="white"
					/>
					<path
						d="M17.5 21C20.8827 21 23.6251 17.866 23.6251 14C23.6251 10.134 20.8827 7 17.5 7C14.1173 7 11.375 10.134 11.375 14C11.375 17.866 14.1173 21 17.5 21Z"
						fill="white"
					/>
				</svg>
			);
		case 'chevrons-right':
			return (
				<svg
					className="svg-icon svg-chevrons-right"
					viewBox="0 0 5 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0.772461 9.16659L4.43913 4.99992L0.772461 0.833252"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case 'chevrons-left':
			return (
				<svg
					className="svg-icon svg-chevrons-left"
					viewBox="0 0 7 10"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M5.40006 9.16659L1.7334 4.99992L5.40006 0.833252"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			);
		case 'content-moderation':
			return (
				<svg
					className="svg-icon svg-content-moderation"
					viewBox="0 0 11 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.2832 12.4167V11.3167H1.8332H9.6332H10.1832V12.4167H1.2832Z"
						fill="#406688"
						stroke="#212121"
						strokeWidth="1.5"
					/>
				</svg>
			);
		default:
			return null;
	}
}
