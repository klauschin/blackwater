'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { formatNewLineToBr } from '@/lib/utils';

const INSTRUCTIONS_LIST = [
	{
		title: 'Gmail (app)',
		url: 'https://support.google.com/mail/answer/8395?hl=en&co=GENIE.Platform%3DAndroid',
	},
	{
		title: 'Gmail (web)',
		url: 'https://support.google.com/mail/answer/8395?hl=en&co=GENIE.Platform%3DDesktop',
	},
	{
		title: 'Apple Mail (Mac)',
		url: 'https://www.hubspot.com/email-signature-generator/add-html-signature-mail-mac',
	},
	{
		title: 'IOS',
		url: 'https://support.dominionlending.ca/hc/en-us/articles/360061469614-How-do-I-add-my-email-signature-to-Apple-Mail-iPhone',
	},
];

/*--- Used for image with color variants
const ICON_COLOR = [
	'black',
	'cream',
	'gold',
	'aube',
	'laurel',
	'moss',
	'vert',
	'kombu',
	'red',
];
*/

export default function PageEmailSignature() {
	const COPY_TEXT_INITIAL = 'Click to copy';
	const COPY_TEXT_CLICKED = 'Copied!';
	const clipboardRef = useRef();
	const [buttonText, setButtonText] = useState(COPY_TEXT_INITIAL);

	const [name, setName] = useState('Name');
	const [position, setPosition] = useState('Position');
	const [subtext, setSubtext] = useState('Subtext');
	/*--- Used for image with color variants
	const [iconColor, setIconColor] = useState('black');
	*/

	const SITE_URL = process.env.SITE_URL.replace(/\/$/, '');

	const onHandleCopy = () => {
		setButtonText(COPY_TEXT_CLICKED);
		setTimeout(() => {
			setButtonText(COPY_TEXT_INITIAL);
		}, 2000);

		const range = document.createRange();

		range.setStart(clipboardRef.current, 0);
		range.setEndAfter(clipboardRef.current);
		window.getSelection()?.removeAllRanges();
		window.getSelection()?.addRange(range);
		document.execCommand('copy');
		window.getSelection()?.removeAllRanges();
	};

	const onHandleInputName = (e) => {
		setName(e.target.value);
	};

	const onHandleInputPosition = (e) => {
		setPosition(e.target.value);
	};

	const onHandleInputSubtext = (e) => {
		setSubtext(e.target.value);
	};

	/*--- Used for image with color variants
	const onHandleInputColor = (e) => {
		setIconColor(e.target.value);
	};
	*/

	return (
		<div className="p-email-signature f-v f-a-c f-j-c gap-lg bg-stone text-black">
			<div className="p-email-signature__form c-form">
				<div className="c-form__fields">
					<div className="c-field" data-size="1/2">
						<label htmlFor="email-signature-name" className="c-field__label">
							Name
						</label>
						<input
							id="email-signature-name"
							type="text"
							value={name}
							placeholder="Enter your name"
							onChange={onHandleInputName}
						/>
					</div>
					<div className="c-field" data-size="1/2">
						<label
							htmlFor="email-signature-position"
							className="c-field__label"
						>
							Position
						</label>
						<input
							id="email-signature-position"
							type="text"
							value={position}
							placeholder="Enter your position"
							onChange={onHandleInputPosition}
						/>
					</div>
					<div className="c-field" data-size="1">
						<label htmlFor="email-signature-subtext" className="c-field__label">
							Subtext
						</label>
						<textarea
							id="email-signature-subtext"
							value={subtext}
							placeholder="Enter your subtext"
							rows="3"
							onChange={onHandleInputSubtext}
						/>
					</div>
					{/*--- Used for image with color variants
					<fieldset className="c-field c-field__checkboxes" data-size="1">
						<legend className='c-field__label'>Icon Color</legend>
						<div className="c-field__checkboxes__grid g g-2 gap-sm">
							{ICON_COLOR.map((color, i) => (
								<div key={i} className="c-field c-field__checkboxes__item">
									<label htmlFor={`icon-color-${color}`} className='c-field__label f-h f-j-s f-a-c gap-sm'>
										<input
											type="radio"
											id={`icon-color-${color}`}
											name="icon-color"
											value={color}
											checked={iconColor === color}
											onChange={onHandleInputColor}
										/>
										{color}
									</label>
								</div>
							))}
						</div>
					</fieldset> */}
				</div>
			</div>
			<div className="p-email-signature__result">
				<table
					ref={clipboardRef}
					style={{ color: 'black', backgroundColor: 'transparent' }}
					border="0"
				>
					<tbody>
						<tr>
							<td style={{ paddingRight: '15px' }}>
								<a
									href={`${SITE_URL}/?ref=email-sig`}
									target="_blank"
									rel="noreferrer"
								>
									<img
										width="50"
										height="50"
										alt="Logo"
										src={`${SITE_URL}/PATH_TO_LOGO.png`}
									/>
								</a>
							</td>
							<td
								style={{
									verticalAlign: 'middle',
									fontFamily: 'Helvetica, sans-serif',
									fontSize: '12px',
									fontWeight: '400',
									letterSpacing: '0px',
									lineHeight: 1.25,
									color: 'black',
								}}
							>
								<p>
									<strong style={{ fontWeight: '700' }}>{name}</strong>
									{position ? ` ${position} ` : ' '}
								</p>
								{subtext && (
									<p
										dangerouslySetInnerHTML={{
											__html: formatNewLineToBr(subtext),
										}}
									/>
								)}
								<a
									href={`${SITE_URL}/?ref=email-sig`}
									target="_blank"
									rel="noreferrer"
									style={{ color: 'black' }}
								>
									<u>Website</u>
								</a>
								&nbsp;|&nbsp;
								<a
									href={`${SITE_URL}/newsletter?ref=email-sig`}
									target="_blank"
									rel="noreferrer"
									style={{ color: 'black' }}
								>
									<u>Newsletter</u>
								</a>
								{/* Other links here */}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<button
				aria-label="Click to copy email signature"
				className="btn"
				onClick={onHandleCopy}
			>
				{buttonText}
			</button>

			<div className="p-email-signature__instructions f-v f-a-c gap-md">
				<p className="t-l-1 text-gray">Instructions</p>
				<ul className="f-h f-w f-j-c gap-sm">
					{INSTRUCTIONS_LIST.map((item, i) => (
						<li key={i}>
							<Link
								href={item.url}
								target="_blank"
								rel="noreferrer"
								className="btn"
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
