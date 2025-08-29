import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ImgProps {
	imageSrc: string;
	responsiveImageSrc?: string;
	alt?: string;
	className?: string;
	breakpoint?: number;
	quality?: number;
}

const Img: React.FC<ImgProps> = ({
	imageSrc,
	responsiveImageSrc,
	alt,
	className,
	breakpoint = 600,
	quality = 80,
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	});
	const [isLoaded, setLoaded] = useState<boolean>(false);

	const pictureRef = useRef<HTMLPictureElement>(null);
	const [renderedDimensions, setRenderedDimensions] = useState<{
		width: number;
		height: number;
	}>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (inView && pictureRef.current) {
			setRenderedDimensions({
				width: pictureRef.current.offsetWidth,
				height: pictureRef.current.offsetHeight,
			});
		}
	}, [inView]);

	if (!imageSrc) {
		return null;
	}

	return (
		<picture ref={pictureRef} className={className}>
			{responsiveImageSrc && (
				<>
					<source
						media={`(min-width: ${breakpoint + 1}px)`}
						srcSet={imageSrc}
					/>

					<source
						media={`(max-width: ${breakpoint}px)`}
						srcSet={responsiveImageSrc}
					/>
				</>
			)}
			<Image
				ref={ref}
				sizes={inView ? `${renderedDimensions.width}px` : '0vw'}
				src={imageSrc}
				quality={quality}
				alt={alt || 'image'}
				{...(inView && {
					onLoad: () => {
						setLoaded(true);
					},
				})}
				className={clsx({
					lazyload: !isLoaded,
					lazyloaded: isLoaded,
				})}
			/>
		</picture>
	);
};

export default Img;
