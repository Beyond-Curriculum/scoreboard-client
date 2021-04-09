import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Redux/reducer";
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
//import * as serviceWorker from "./serviceWorker"

const store = createStore(reducer);
const instance = createInstance({
  urlBase: 'https://analytics.bc-pf.org/',
  siteId: 11,
  // userId: 'UID76903202', // optional, default value: `undefined`.
  // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
  // disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  heartBeat: { // optional, enabled by default
    active: true, // optional, default value: true
    // seconds: 10 // optional, default value: `15
  },
  // linkTracking: false, // optional, default value: true
  configurations: { // optional, default value: {}
    // any valid matomo configuration, all below are optional
    disableCookies: true,
    setSecureCookie: true,
    // setRequestMethod: 'POST'
  }
})

ReactDOM.render(
  <MatomoProvider value={instance}>
    <Provider store={store}>
        <App />
      </Provider>
    </MatomoProvider>,
  document.getElementById("root")
);

//serviceWorker.unregister();
