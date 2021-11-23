import { useEffect, useRef } from 'react';

import { analyticEvent } from './_analytics';

import type { DependencyList, RefObject } from 'react';

/**
 ** useAnalytics

 Please read this document if you are new to the topic:
 https://github.com/movahedan/next-boilerplate/blob/main/docs/directories.md

 * A hook util to send analytic events, that gives the access of analytic command
 * and works in 2 way for manual (dom interaction) and functional tracking
 *
 * @parameters
 * @deps Array must be given (needed to be in additionalHooks in eslint config)
 * @callback Function Control whether it is disabled, manual or functional
 ** if callback returns @false => the request will be disabled
 ** if callback returns an @AnalyticEventInfo => the request will be send functionally
 ** if callback returns an @AnalyticTracker => the ref will be yours to do the request manually
 *
 * @returns
 * @A_ref object that you can bind to an Element when using manual tracking
 * If you not use it and want a manual track, it will throw an Error
 *
 * @example of functional tracking
 ** useAnalytics(() => getSamplePageAnalyticsProps(), []);
 *
 * return (
 *   <div>
 *   </div>
 * );
 *
 * @example of manual tracking
 ** const ref = useAnalytics(() => trackHeaderInteractions, []);
 *
 * return (
 *   <div ref={ref} id="id">
 *   </div>
 * );
 *
 * @example of disabled
 ** useAnalytics(() => false, []);
 *
 * return (
 *   <div>
 *   </div>
 * );
 *
 */

export type AnalyticEventInfo<
	AnalyticEventType = string,
	AnalyticEventData = unknown
> = {
	eventType: AnalyticEventType;
	data: AnalyticEventData;
};
export type AnalyticTracker<ContainerElement = HTMLDivElement> = (
	containerRef: RefObject<ContainerElement>,
	analyticCommand: typeof analyticEvent
) => void;

export const useAnalytics = <
	AnalyticEventType = string,
	AnalyticEventData = unknown,
	ContainerElement = HTMLDivElement
>(
	callback: () =>
		| false
		| AnalyticEventInfo<AnalyticEventType, AnalyticEventData>
		| AnalyticTracker<ContainerElement>,
	deps: DependencyList
): RefObject<ContainerElement> => {
	const containerRef = useRef<ContainerElement>(null);

	useEffect(() => {
		const result = callback();

		if (result) {
			if (typeof result === 'function') {
				if (containerRef.current === null) {
					throw Error(
						'[useAnalytics]: containerRef is not attached to any element'
					);
				}

				result(containerRef, analyticEvent);
			} else {
				const { eventType, data } = result;
				analyticEvent<AnalyticEventType, AnalyticEventData>(eventType, data);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return containerRef;
};
