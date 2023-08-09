import { configureStore } from "@reduxjs/toolkit";
import theme from "./feature/theme";

export const store = configureStore({
  reducer: {
    theme: theme.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
