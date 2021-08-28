import { useRouter } from "next/router";
import { useEffect } from "react";

import { analyticPageEvent } from "../events";

import type { ReactEventHandler } from "react";

export const useAnalyticsPageEvent = () => {
  const router = useRouter();
  const dummyAnalyticPageEventProps = useDummyPageEventProps();

  useEffect(() => {
    const pageView: ReactEventHandler = () => {
      setTimeout(() => {
        analyticPageEvent(dummyAnalyticPageEventProps);
      }, 150);
    };

    setTimeout(() => {
      analyticPageEvent(dummyAnalyticPageEventProps);
    }, 150);

    router.events.on("routeChangeComplete", pageView);

    return () => {
      router.events.off("routeChangeComplete", pageView);
    };
  }, [dummyAnalyticPageEventProps, router.events]);
};

const useDummyPageEventProps = () => ({
  id: "string",
  name: "string",
});
