import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState ? { user: JSON.parse(serializedState) } : undefined;
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.user);
    localStorage.setItem("userState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
