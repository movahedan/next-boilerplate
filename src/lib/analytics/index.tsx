import { FC } from "react";

import { useAnalyticsPageEvent, useAuthenticatedEvent } from "./providers";

export const AnalyticsProvider: FC = () => {
  useAnalyticsPageEvent();
  useAuthenticatedEvent();

  return null;
};

export * from "./script";
export * from "./events";
