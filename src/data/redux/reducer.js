import initialStore from "./initial-store";
import keys from "./keys";

function reducer(state = initialStore, action) {
  switch (action.type) {
    case keys.UPDATE_ACTIVE_KEYS:
      return { ...state, activeKeys: action.value };
    default:
      return state;
  }
}

export default reducer;
