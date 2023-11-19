import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-slice";
import authReducer from "./auth-slice";
import sitesSlice from "./sites-slice";

const store = configureStore({
  reducer: { ui: uiReducer, auth: authReducer, sites: sitesSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;