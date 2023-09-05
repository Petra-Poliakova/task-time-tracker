import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";

const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

//https://www.youtube.com/watch?v=0RpOzhjhTzA&list=PLIckDtOkqwLv56F0c8zbHDivaUQgJr9xw&index=4

//https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/en/docs/extensions/mv3/tut_oauth/index.md

//https://medium.com/@elhardoum/implementing-firebase-auth-sso-with-google-in-chrome-extensions-with-manifest-v3-and-react-js-5946bca0ba19

//https://github.com/RasikaWarade/chrome-extension-mv3-firebase-boilerplate/blob/main/src/popup/main-script.js

//https://www.youtube.com/watch?v=a3IVHlR3kbc&list=PLBS1L3Ug2VVpgpDEcLmapOk52mVGv4MIu&index=10
//https://github.com/manshu/reactjs-chrome-extension-oauth2

//https://www.youtube.com/watch?v=PuemNsiCYAc&t=1511s

//https://github.com/CSFrequency/react-firebase-hooks/blob/v3.0.5/auth/README.md
