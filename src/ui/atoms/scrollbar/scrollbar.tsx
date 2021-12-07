import { cx } from '@emotion/css';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useMouseEffect, useScrollPosition } from 'lib/hooks';

import {
	wrapperStyles,
	scrollbarStyles,
	thumbStyles,
	innerThumbStyles,
} from './scrollbar.styles';

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
		<span className={wrapperStyles}>
			<span className={cx(scrollbarStyles, isExpanded && 'active')}>
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
					className={thumbStyles}
					style={thumbInlineStyles}
				>
					<span className={cx(innerThumbStyles, isExpanded && 'active')} />
				</span>
			</span>
		</span>
	);
};
