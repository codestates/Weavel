import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  authReducer,
});

export default persistReducer(persistConfig, rootReducer);
