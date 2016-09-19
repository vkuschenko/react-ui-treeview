var React = require("react");
var ReactDOM = require("react-dom");
var Treeview = require("../src/index");

ReactDOM.render(
  <Treeview nodes={nodes} buttons={buttons}/>,
  document.getElementById("container")
);