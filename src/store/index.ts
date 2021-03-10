import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { userReducer } from "./reducers/user";
import { UserStateType } from "./types";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

export interface StoreStateType {
  user: UserStateType;
}

const rootReducer = combineReducers({
  user: userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function store() {
  const enhancer = compose(applyMiddleware(thunk));
  const store = createStore(persistedReducer, enhancer);
  console.log(store.getState());
  // @ts-ignore
  const persistor = persistStore(store);
  return { store, persistor };
}
