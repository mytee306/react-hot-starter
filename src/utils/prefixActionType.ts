const prefixActionTypeWithSeparator = (separator: string) => (
  prefix: string,
) => (actionType: string) => prefix.concat(separator).concat(actionType);

export const prefixActionType = prefixActionTypeWithSeparator(' -> ');
