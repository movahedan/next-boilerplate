import { useEffect } from "react";

import { analyticEvent } from "../commands";

export const useAuthenticatedEvent = () => {
  const profile = useDummyProfile();
  useEffect(() => {
    analyticEvent("authenticated", { profileId: profile?.id });
  }, [profile]);
};

const useDummyProfile = () => ({ id: "1" });
