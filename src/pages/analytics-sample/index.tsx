import { useRef, useState } from "react";

import {
  analyticsSearchEventOnType,
  analyticsSearchEventOnSearch,
} from "lib/analytics";

import type {
  FC,
  FormEventHandler,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";

const AnalyticsSamplePage: FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loggedActivities, setLoggedActivities] = useState<
    ReturnType<typeof analyticsSearchEventOnType>[]
  >([]);

  const timeout = useRef<NodeJS.Timeout | null>(null);
  const onType: ChangeEventHandler<HTMLInputElement> = () => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      const { value = "" } = searchInputRef.current || {};
      const loggedActivity = analyticsSearchEventOnType(value);

      setLoggedActivities((prevLogs) => prevLogs.concat([loggedActivity]));
    }, 300);
  };

  const onSearch: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    const { value = "" } = searchInputRef.current || {};
    if (value) {
      const loggedActivity = analyticsSearchEventOnSearch(value);

      setLoggedActivities((prevLogs) => prevLogs.concat([loggedActivity]));
    }
  };

  const onSubmit: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const { value = "" } = searchInputRef.current || {};
    if (value) {
      const loggedActivity = analyticsSearchEventOnSearch(value);

      setLoggedActivities((prevLogs) => prevLogs.concat([loggedActivity]));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Search component (with analytic events)</h1>

      <div style={{ marginBottom: "3rem" }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          onChange={onType}
          onSubmit={onSubmit}
        />
        <button onClick={onSearch}>Search</button>
      </div>

      {loggedActivities.length > 0 && (
        <>
          <h3>Logged activities:</h3>

          <ul style={{ padding: "1rem" }}>
            {loggedActivities.map(([, activityFields], index) => (
              <li key={index}>{JSON.stringify(activityFields, null, 4)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AnalyticsSamplePage;
