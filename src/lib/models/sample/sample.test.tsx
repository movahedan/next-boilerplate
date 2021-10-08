import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import { axiosMock } from '__mocks__';
import { endpoints } from 'lib/constants';

import { SampleModel } from './index';
import { useSampleModelInitializer } from './initializers';

import type { Sample } from './types';
import type { ReactNode } from 'react';

const waitForPromise = () =>
	new Promise<void>((res) => {
		setTimeout(() => {
			res();
		}, 50);
	});

const defaultData: Sample = SampleModel.mockData;

describe('SampleModel', () => {
	afterEach(() => {
		axiosMock.reset();
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
			axiosMock.onGet(endpoints.sample()).replyOnce(200, defaultData);

			const { getByTestId } = contextProvidedRender(<DummyContextConsumer />);

			expect(getByTestId('value')).toHaveTextContent(
				JSON.stringify(defaultData)
			);
		});

		it('before initialization the data should match its type', async () => {
			axiosMock.onGet(endpoints.sample()).replyOnce(200, defaultData);

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
		// TODO
		it.skip('should initialize sampleModel when initial value is undefined', async () => {
			axiosMock.onGet(endpoints.sample()).replyOnce(200, defaultData);

			const setState = jest.fn();
			const { rerender } = renderHook(() =>
				useSampleModelInitializer(setState)
			);

			await act(async () => {
				await waitForPromise();
			});

			rerender();

			expect(setState).toBeCalledWith(defaultData);
		});

		it('should console.error the error', async () => {
			axiosMock.onGet(endpoints.sample()).networkErrorOnce();

			const setState = jest.fn();
			renderHook(() => useSampleModelInitializer(setState));

			await act(async () => {
				await waitForPromise();
			});

			expect(setState).not.toBeCalled();
		});

		it('should not initialize sampleModel when initial value is available', async () => {
			axiosMock.onGet(endpoints.sample()).replyOnce(200, defaultData);

			const setState = jest.fn();
			renderHook(() => useSampleModelInitializer(setState, defaultData));

			await act(async () => {
				await waitForPromise();
			});

			expect(setState).not.toBeCalled();
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
