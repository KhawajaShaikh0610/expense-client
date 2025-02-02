import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { transactionApi } from "./api/transactionApi";
import authReducer from "./slice/authSlice.js";
import { adminApi } from "./api/adminApi.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
      adminApi.middleware
    ),
});

export default store;
