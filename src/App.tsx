import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "router";
import { routes } from "router/config";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "store";

function App() {
  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <BrowserRouter>
          <Router routes={routes} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
