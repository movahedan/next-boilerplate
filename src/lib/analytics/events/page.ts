import { analyticEvent } from "../commands";

export const analyticPageEvent = (props: IPageEventProps) =>
  analyticEvent("page", { page: props });

interface IPageEventProps {
  id: string; // A unique page identifier (if available).
  name: string; // A unique page name.
}
