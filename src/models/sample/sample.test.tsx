import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { SampleModel } from './index';
import { useSampleModelInitializer } from './sample.initializers';

import type { Sample } from './sample';
import type { ReactNode } from 'react';

const defaultData: Sample = SampleModel.mockData;

describe('SampleModel', () => {
	let error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
	beforeEach(() => {
		error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	describe('context', () => {
		const contextProvidedRender = (
			component: ReactNode,
			initialData: null | Sample = defaultData
		) =>
			render(
				<SampleModel.Provider key={0} initialData={initialData ?? undefined}>
					{component}
				</SampleModel.Provider>
			);

		const DummyContextConsumer = () => {
			const [sampleModel] = SampleModel.useData();

			return <dd data-testid='value'>{JSON.stringify(sampleModel)}</dd>;
		};

		it('should provide the data when initialData is given', () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				status: 200,
				statusText: 'ok',
				json: async () => defaultData,
			} as Response);

			const { getByTestId } = contextProvidedRender(<DummyContextConsumer />);

			expect(getByTestId('value')).toHaveTextContent(
				JSON.stringify(defaultData)
			);
		});

		it('before initialization the data should match its type', async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				status: 200,
				statusText: 'ok',
				json: async () => defaultData,
			} as Response);

			const { getByTestId } = contextProvidedRender(
				<DummyContextConsumer />,
				null
			);

			expect(getByTestId('value')).toHaveTextContent(
				JSON.stringify(SampleModel.initialData)
			);
		});
	});

	describe('initializers', () => {
		it('should initialize sampleModel when initial value is undefined', async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				status: 200,
				statusText: 'ok',
				json: async () => defaultData,
			} as Response);

			const setState = jest.fn();
			renderHook(() => useSampleModelInitializer(setState));
			await waitFor(() => expect(setState).toBeCalledWith(defaultData));
		});

		it('should console.error the error', async () => {
			fetchMock.mockRejectOnce();

			const setState = jest.fn();
			renderHook(() => useSampleModelInitializer(setState));
			await waitFor(() => expect(error).toBeCalled());
		});

		it('should not initialize sampleModel when initial value is available', async () => {
			fetchMock.mockResolvedValueOnce({
				ok: true,
				status: 200,
				statusText: 'ok',
				json: async () => defaultData,
			} as Response);

			const setState = jest.fn();
			renderHook(() => useSampleModelInitializer(setState, defaultData));

			await waitFor(() => expect(setState).not.toBeCalled());
		});
	});

	describe('utils', () => {
		it('should has attacher function', () => {
			let attachResult = undefined;

			attachResult = SampleModel.attachObject(defaultData);
			expect(attachResult).toMatchObject({
				sampleModel: defaultData,
			});

			attachResult = SampleModel.attachObject(undefined);
			expect(attachResult).toMatchObject({
				sampleModel: undefined,
			});
		});

		it('should has extractor function', () => {
			let attachResult = undefined;

			attachResult = SampleModel.extractObject({
				sampleModel: defaultData,
			});
			expect(attachResult).toMatchObject(defaultData);

			attachResult = SampleModel.extractObject({
				sampleModel: undefined,
			});
			expect(attachResult).toBeUndefined();
		});
	});
});
