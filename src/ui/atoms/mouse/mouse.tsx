import { useMousePosition } from 'lib/hooks';

import { mouseStyles } from './mouse.styles';

export const Mouse = ({ disabled = false }: { disabled?: boolean }) => {
	const { x, y } = useMousePosition();

	return (
		<span className='fixed top-0 bottom-0 left-0 right-0 z-10 h-screen pointer-events-none'>
			<span
				hidden={disabled}
				className={mouseStyles}
				style={{
					left: x - 72 / 2,
					top: y - 72 / 2,
				}}
			/>
		</span>
	);
};
