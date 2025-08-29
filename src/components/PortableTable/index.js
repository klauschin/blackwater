import React from 'react';
import TablePortableText from './TablePortableText';

export default function PortableTable({ blocks, className }) {
	if (!blocks) return null;
	const { rows } = blocks;

	return (
		<div className="max-sm:scrollbar-thin max-sm:scrollbar-track-[var(--color-subtle)] max-sm:scrollbar-thumb-[var(--color-accent)] max-sm:scrollbar-track-rounded max-sm:scrollbar-thumb-rounded odd:bg-black/20 max-sm:overflow-x-auto">
			<table className="max-sm:min-w-[600px]">
				<tbody>
					{rows.map((row) => (
						<tr key={row._key}>
							{row?.cells.map((cell, index) => {
								const { text } = cell;
								return (
									<td key={row._key + index}>
										<TablePortableText blocks={text} />
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
