import { GButton } from 'ui/atoms';

const ComponentSamplePage = () => {
	return (
		<>
			<h3>Buttons:</h3>
			<GButton size='large'>Large Button</GButton>
			<GButton>Medium Button</GButton>
			<GButton size='small'>Small Button</GButton>
			<GButton disabled>Disabled Button</GButton>
			<GButton loading>Disabled Button</GButton>
		</>
	);
};

export default ComponentSamplePage;
