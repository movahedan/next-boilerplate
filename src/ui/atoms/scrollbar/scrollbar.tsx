import { useEffect, useMemo, useRef, useState } from 'react';
import tw from 'twin.macro';

import { useMouseEffect, useScrollPosition } from 'lib/hooks';

import type { CSSProperties } from 'react';

export const Scrollbar = () => {
	const scrollThumbRef = useRef<HTMLSpanElement>(null);

	const [top, height] = useScrollPosition();
	const noScrollbar = !height;
	const thumbInlineStyles = useMemo<CSSProperties>(
		() => ({
			height: `${height}%`,
			top: `${top}%`,
		}),
		[height, top]
	);

	const [isScrolling, setIsScrolling] = useState(false);
	const onScrollFocus = () => setIsScrolling(true);
	const onScrollBlur = () => setIsScrolling(false);
	useEffect(() => {
		const afterScroll = () => {
			setIsScrolling((prev) => {
				if (prev) {
					scrollThumbRef.current?.blur();
				}

				return prev;
			});
		};

		window.addEventListener('mouseup', afterScroll);

		return () => {
			window.removeEventListener('mouseup', afterScroll);
		};
	}, []);

	const [isExpanded, setIsExpanded] = useState(false);
	useMouseEffect(
		(event) => {
			if (isScrolling) {
				const disableTextSelection = () => {
					window.getSelection()?.removeAllRanges();
				};
				const scroll = () => {
					window.scrollTo({
						top: window.scrollY + event.movementY * 10,
					});
				};

				scroll();
				disableTextSelection();
			} else {
				const handleExpandState = () => {
					const isMouseNear =
						(window.innerWidth - event.x) / window.innerWidth < 0.05;

					if (isMouseNear) {
						setIsExpanded(true);
					} else {
						const movementX = event.movementX;
						setTimeout(() => {
							if (movementX < 0) {
								setIsExpanded(false);
							}
						}, 500);
					}
				};

				handleExpandState();
			}
		},
		[isScrolling]
	);

	return noScrollbar ? null : (
		<span css={tw`fixed top-0 right-0 z-0 flex h-screen`}>
			<span
				css={[
					tw`relative w-3 md:w-4 my-auto h-70vh`,
					tw`rounded-full rounded-tr-none rounded-br-none bg-white-opacity-10`,
					isExpanded && tw`rounded-full`,
				]}
			>
				<span
					ref={scrollThumbRef}
					tabIndex={-1}
					role='scrollbar'
					aria-controls=''
					aria-valuenow={0}
					onTouchStart={onScrollFocus}
					onTouchEnd={onScrollBlur}
					onFocus={onScrollFocus}
					onBlur={onScrollBlur}
					css={tw`absolute top-0 right-0 z-0 w-12`}
					style={thumbInlineStyles}
				>
					<span
						css={[
							tw`transition-all duration-300 ease-out motion-reduce:transform-none`,
							tw`absolute top-0 right-0 z-0 h-full w-3 md:w-4`,
							tw`bg-blue border-mouse rounded-full rounded-tr-none rounded-br-none`,
							isExpanded && tw`rounded-full`,
						]}
					/>
				</span>
			</span>
		</span>
	);
};
