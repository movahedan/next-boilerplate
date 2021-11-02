import { Button } from 'ui/atoms';

const ComponentSamplePage = () => {
	return (
		<>
			<h3>Buttons:</h3>
			<Button size='large'>Large Button</Button>
			<Button>Medium Button</Button>
			<Button size='small'>Small Button</Button>
			<Button disabled>Disabled Button</Button>
			<Button loading>Disabled Button</Button>
		</>
	);
};

export default ComponentSamplePage;
