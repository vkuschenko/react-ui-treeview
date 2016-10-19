import React from "react";
import ReactDOM from "react-dom";
import Treeview from "../src/index";
import data from "./data";

ReactDOM.render(
  <Treeview nodes={data.nodes} buttons={data.buttons} />,
  document.getElementById("container")
);