"use strict";

module.exports = {
  styles: {
    group: "treeview-group",
    collapsedGroup: "collapsed-group",
    element: "treeview-element",
    elementLabel: "treeview-element-label",
    expander: "expander",
    expanderCollapsed: "expander-collapsed",
    expanderOpened: "expander-opened"
  },
  singleNode: {name: "tree element"},
  nodeWithChildren: {name: "tree element", nodes: [ {name: "child1"}, {name: "child2"}, {name: "child3"} ]}
};