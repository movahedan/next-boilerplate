import { render, waitFor } from '@testing-library/react';

import { delayImport } from './delay-import';

const DynamicComponent = () => <p>LoadableComponent</p>;
DynamicComponent.displayName = 'LoadableComponent';
DynamicComponent.preload = jest.fn();

const Component = delayImport(() => Promise.resolve(DynamicComponent));
const Component2 = delayImport(Promise.resolve(DynamicComponent));

it('delayImport should import component with delay', async () => {
	const { container } = render(<Component />);
	expect(container).not.toHaveTextContent('LoadableComponent');
	await waitFor(() => expect(container).toHaveTextContent('LoadableComponent'));

	const { container: container2 } = render(<Component2 />);
	expect(container2).not.toHaveTextContent('LoadableComponent');
	await waitFor(() =>
		expect(container2).toHaveTextContent('LoadableComponent')
	);
});
