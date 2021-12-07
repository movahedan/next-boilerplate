import { useMousePosition } from 'lib/hooks';

import { mouseClassName, wrapperClassName } from './mouse.styles';

export const Mouse = ({ disabled = false }: { disabled?: boolean }) => {
	const { x, y } = useMousePosition();

	return (
		<span className={wrapperClassName}>
			<span
				hidden={disabled}
				className={mouseClassName}
				style={{
					left: x - 72 / 2,
					top: y - 72 / 2,
				}}
			/>
		</span>
	);
};
