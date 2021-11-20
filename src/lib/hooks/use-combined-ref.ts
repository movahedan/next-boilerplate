import { useEffect, useRef } from 'react';

import type { ForwardedRef, MutableRefObject } from 'react';

type CombinedRefType<T> = MutableRefObject<T> | ForwardedRef<T>;

/**
 * Combine multiple mutable refs and forwarded refs into a single mutable ref
 * object. Useful when you are using `forwardRef` but still need to mutate the
 * ref's current value.
 *
 * @example
 * const Foobar = forwardRef<HTMLElement, Props>(({ props }, forwardedRef) => {
 *   const containerRef = useRef<HTMLElement>();
 *   const combinedRef = useCombinedRef(forwardedRef, containerRef);
 *
 *   useEffect(() => {
 *     // Forwarded ref and container ref now have the same value.
 *     // Combined ref also shares this value for convenience.
 *   }, []);
 *
 *   return (
 *     <div ref={combinedRef} />
 *   );
 * });
 */
export const useCombinedRef = <T>(
	...refs: CombinedRefType<T>[]
): MutableRefObject<T | null> => {
	const targetRef = useRef<T>(null);

	useEffect(() => {
		for (const ref of refs) {
			if (ref) {
				if (typeof ref === 'function') {
					ref(targetRef.current);
				} else {
					ref.current = targetRef.current;
				}
			}
		}
	}, [refs]);

	return targetRef;
};
