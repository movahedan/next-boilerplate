import { render, screen } from '@testing-library/react';
import React, { createContext } from 'react';

import { ComposeProviders } from './compose-provider';

const DummyContextA = createContext<string>('');
const DummyContextB = createContext<string>('');
const DummyContextC = createContext<string>('');

const DummyApp: React.FC = () => (
	<dl data-testid='dummy-app'>
		<dt>Context A</dt>
		<DummyContextA.Consumer>
			{(value) => <dd data-testid='context-a'>{value}</dd>}
		</DummyContextA.Consumer>
		<dt>Context B</dt>
		<DummyContextB.Consumer>
			{(value) => <dd data-testid='context-b'>{value}</dd>}
		</DummyContextB.Consumer>
		<dt>Context C</dt>
		<DummyContextC.Consumer>
			{(value) => <dd data-testid='context-c'>{value}</dd>}
		</DummyContextC.Consumer>
	</dl>
);

it('can be given no providers', () => {
	render(
		<ComposeProviders>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^$/);
});

it('can be given empty providers array', () => {
	render(
		<ComposeProviders providers={[]}>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^$/);
});

it('can be given one provider', () => {
	render(
		<ComposeProviders
			providers={[<DummyContextB.Provider key={0} value='Banana' />]}
		>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^Banana$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^$/);
});

it('can be given multiple providers', () => {
	render(
		<ComposeProviders
			providers={[
				<DummyContextA.Provider key={0} value='Apple' />,
				<DummyContextB.Provider key={1} value='Banana' />,
				<DummyContextC.Provider key={2} value='Carrot' />,
			]}
		>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^Apple$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^Banana$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^Carrot$/);
});

it('applies providers in order', () => {
	render(
		<ComposeProviders
			providers={[
				<DummyContextC.Provider key={0} value='Car' />,
				<DummyContextA.Provider key={1} value='Apple' />,
				<DummyContextB.Provider key={2} value='Banana' />,
				<DummyContextC.Provider key={3} value='Carrot' />,
			]}
		>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^Apple$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^Banana$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^Carrot$/);
});

it('ignores any providers which are not valid', () => {
	render(
		<ComposeProviders
			providers={[
				// @ts-expect-error Boolean is not React element
				true,
				<DummyContextA.Provider key={0} value='Apple' />,
				// @ts-expect-error Number is not React element
				123,
				// @ts-expect-error Null is not React element
				null,
			]}
		>
			<DummyApp />
		</ComposeProviders>
	);
	expect(screen.getByTestId('dummy-app')).toBeInTheDocument();
	expect(screen.getByTestId('context-a')).toHaveTextContent(/^Apple$/);
	expect(screen.getByTestId('context-b')).toHaveTextContent(/^$/);
	expect(screen.getByTestId('context-c')).toHaveTextContent(/^$/);
});
