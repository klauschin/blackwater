import {
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaSpotify,
	FaXTwitter,
	FaYoutube,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';

type SocialIconKey =
	| 'facebook'
	| 'instagram'
	| 'linkedin'
	| 'spotify'
	| 'x'
	| 'youTube'
	| 'github'
	| string;

export function getIcon(icon: SocialIconKey): IconType | null {
	switch (icon) {
		case 'facebook':
			return FaFacebookF;
		case 'instagram':
			return FaInstagram;
		case 'linkedin':
			return FaLinkedin;
		case 'spotify':
			return FaSpotify;
		case 'x':
			return FaXTwitter;
		case 'youTube':
			return FaYoutube;
		case 'github':
			return FaGithub;
		default:
			return null;
	}
}
