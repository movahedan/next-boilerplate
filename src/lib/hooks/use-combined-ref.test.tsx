import { render } from '@testing-library/react';
import { forwardRef, useRef } from 'react';

import { useCombinedRef } from './use-combined-ref';

import type {
	MutableRefObject,
	RefObject,
	HTMLAttributes,
	ForwardedRef,
} from 'react';

it('shares a value between forwarded refs and mutable refs', () => {
	let componentRef: MutableRefObject<HTMLDivElement | null> | undefined;
	let applicationRef: RefObject<HTMLDivElement> | undefined;
	const functionRef: ForwardedRef<HTMLDivElement> = jest.fn();

	const MyComponent = forwardRef<
		HTMLDivElement,
		HTMLAttributes<HTMLDivElement>
	>(function Component(props, ref) {
		componentRef = useCombinedRef(ref, functionRef);

		return <div {...props} ref={componentRef} />;
	});

	const App = () => {
		applicationRef = useRef<HTMLDivElement>(null);

		return <MyComponent ref={applicationRef} />;
	};

	render(<App />);

	if (!componentRef || !applicationRef) {
		throw new Error('Undefined component ref or application ref');
	}

	expect(componentRef.current).not.toBeNull();
	expect(componentRef.current).toBeInstanceOf(HTMLDivElement);
	expect(componentRef.current).toBeInTheDocument();
	expect(componentRef.current).toBe(applicationRef.current);
	expect(functionRef).toBeCalledWith(componentRef.current);
});
