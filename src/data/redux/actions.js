import keys from "./keys";

export function updateActiveKeys(value) {
  return {
    type: keys.UPDATE_ACTIVE_KEYS,
    value,
  };
}
