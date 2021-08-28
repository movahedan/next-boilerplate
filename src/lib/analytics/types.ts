export type TfieldsObject = Record<string, unknown | undefined>;
export type TAnalyticEvent<Name = string> = (
  name: Name,
  fieldsObject?: TfieldsObject
) => [Name, TfieldsObject];
