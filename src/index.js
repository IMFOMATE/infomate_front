import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  store from './Store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";


const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);

root.render(
  // <React.StrictMode>
    <Provider store={store} >
        {/*<PersistGate persistor={persistor}>*/}
          <App />
        {/*</PersistGate>*/}
    </Provider>
  // </React.StrictMode>
);
