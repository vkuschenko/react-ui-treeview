var React = require("react");
var ReactDOM = require("react-dom");
var Treeview = require("../../src/treeview");

var nodes = [
  {
    type: "list",
    name: "Databases",
    nodes: [
      {
        type: "database",
        name: "mysql1.localhost",
        nodes: [
          {name: "Tables", click: function(){ console.log(this.props.node.id);}},
          {name: "Procedures"},
          {name: "Indexes"},
          {name: "Views", nodes: [{name: "View1"}, {name: "View2"}, {name: "View3"}, {name: "View4"},]},
        ]
      },
      {
        type: "database",
        name: "mysql2.localhost"
      },
      {
        type: "database",
        name: "mongo.localhost"
      }
    ]
  },
  {
    type: "list",
    name: "Services",
    click: function(){ console.log(this.props.node.name);},
    nodes: [
      {name: "Payments", type: "payments"},
      {name: "Orders", type: "orders"},
      {name: "Search", type: "search"}
    ]
  },
  {
    type: "list",
    name: "Balancers"
  }
];

var buttons = [
  {
    value: "Button 1", clickHandler: function () {
      console.log(this.props.value);
    }
  },
  {
    value: "Button 2", clickHandler: function () {
      console.log(this.props.value);
    }
  }
];

ReactDOM.render(
  <Treeview nodes={nodes} buttons={buttons}/>,
  document.getElementById("container")
);