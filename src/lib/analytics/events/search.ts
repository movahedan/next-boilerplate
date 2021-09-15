import { analyticEvent } from './command';

interface ISearchEventProps {
	typed?: string; // What was typed by the user.
	entered?: string; // What was selected by the user.
	method?: string; // The search method used.
}

const defaultMethod = 'manual';

const analyticSearchEvent = (props: ISearchEventProps) =>
	analyticEvent('search', { search: props });

export const analyticsSearchEventOnType = (
	typedValue: string,
	searchMethod = defaultMethod
) => analyticSearchEvent({ typed: typedValue, method: searchMethod });

export const analyticsSearchEventOnSearch = (
	selectedValue: string,
	searchMethod = defaultMethod
) => analyticSearchEvent({ entered: selectedValue, method: searchMethod });
