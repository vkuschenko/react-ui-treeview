var React = require("react");
var TreeviewToolbar = require("./toolbar/treeview-toolbar.jsx");
var TreeviewContent = require("./content/treeview-content.jsx");

"use strict";

var Treeview = React.createClass({

  getDefaultProps: function () {
    return {
      styles: {
        treeview: "treeview",
        treeviewContent: "treeview-content",
        group: "treeview-group",
        rootGroup: "root-group",
        collapsedGroup: "collapsed-group",
        element: "treeview-element",
        elementLabel: "treeview-element-label",
        expander: "expander",
        expanderCollapsed: "expander-collapsed",
        expanderOpened: "expander-opened",
        treeviewToolbar: "treeview-toolbar",
        treeviewToolbarButton: "treeview-toolbar-button"
      },
      useDefaultButtons: true
    };
  },

  getInitialState: function () {
    return {nodes: []};
  },

  componentWillMount: function () {
    this.props.nodes = this.verifyNodes(this.props.nodes);
  },

  render: function () {
    return (
      <div className={this.props.styles.treeview}>
        <TreeviewToolbar styles={this.props.styles}
                         useDefaultButtons={this.props.useDefaultButtons}
                         customButtons={this.props.buttons}/>
        <TreeviewContent nodes={this.props.nodes} styles={this.props.styles}/>
      </div>
    );
  },

  verifyNodes: function(nodes) {
    var self = this;
    return nodes.map(function(node){
      if(node.nodes && node.nodes.length > 0){
        node.nodes = self.verifyNodes(node.nodes);
      }
      return self.setGuidToNode(node);
    });
  },

  setGuidToNode: function (node) {
    if (!node.id) {
      var s4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      node.id = (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toLowerCase();
    }
    return node;
  },

  // Context dependant functionality

  getChildContext: function () {
    var self = this;
    return {
      registerNode: function (node) {
        var nodes = self.state.nodes;
        nodes.push(node);
        self.setState({nodes: nodes})
      },
      nodes: self.state.nodes
    };
  }

});

Treeview.childContextTypes = {
  registerNode: React.PropTypes.func,
  nodes: React.PropTypes.array
};

module.exports = Treeview;