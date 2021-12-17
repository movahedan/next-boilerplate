import tw from 'twin.macro';

import { useMousePosition } from 'lib/hooks';

export const Mouse = ({ disabled = false }: { disabled?: boolean }) => {
	const { x, y } = useMousePosition();

	return (
		<span
			css={tw`fixed top-0 bottom-0 left-0 right-0 z-10 h-screen pointer-events-none`}
		>
			<span
				hidden={disabled}
				css={[
					tw`absolute top-0 left-0 z-10 pointer-events-none`,
					tw`w-72px h-72px bg-mouse opacity-75 border-mouse border-3px rounded-full`,
					tw`transition-all duration-75 ease-out motion-reduce:transform-none`,
				]}
				style={{
					left: x - 72 / 2,
					top: y - 72 / 2,
				}}
			/>
		</span>
	);
};
