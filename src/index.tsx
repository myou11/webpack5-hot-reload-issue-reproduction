import App from "./App";
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(<App />, document.getElementById("test-app"));

// This allows for the page to just reload this component instead of the whole page
//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept();
}