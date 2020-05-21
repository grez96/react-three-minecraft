import keys from "./keys";

export function updateMessage(value) {
  return {
    type: keys.UPDATE_MESSAGE,
    value,
  };
}
