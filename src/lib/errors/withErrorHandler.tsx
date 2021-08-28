import { Component } from 'react';

import type { FC, ErrorInfo } from 'react';

export interface WithErrorHandlerState {
	hasError: boolean;
	error: null | Error;
	errorInfo: null | ErrorInfo;
}

export function withErrorHandler<P = unknown>(
	WrapperComponent: FC<P>,
	FallbackComponent: FC<WithErrorHandlerState> = ({ error }) => (
		<div>
			<p>Something went wrong</p>
			{error?.toString()}
		</div>
	),
	errorCallback: (args: WithErrorHandlerState) => void = console.error
) {
	return class WithErrorHandler extends Component<
		never,
		WithErrorHandlerState
	> {
		constructor(props: never) {
			super(props);

			this.state = {
				hasError: false,
				error: null,
				errorInfo: null,
			};
		}

		componentDidCatch(error: Error, info: ErrorInfo) {
			this.setState({ hasError: true, error, errorInfo: info });

			errorCallback({ hasError: true, error, errorInfo: info });
		}

		render() {
			if (this.state.hasError) {
				const { error, errorInfo } = this.state;

				return (
					<FallbackComponent
						{...this.props}
						error={error}
						errorInfo={errorInfo}
					/>
				);
			}

			return <WrapperComponent {...this.props} />;
		}
	};
}
