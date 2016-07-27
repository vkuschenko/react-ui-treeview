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
    return { nodes: [] };
  },
  
  render: function () {
    return (
      <div className={this.props.styles.treeview}>
        <TreeviewToolbar styles={this.props.styles} useDefaultButtons={this.props.useDefaultButtons}
                         handlerCollapseAll={this.handlerCollapseAll} handlerExpandAll={this.handlerExpandAll}
                         customButtons={this.props.buttons} />
        <TreeviewContent nodes={this.props.nodes} styles={this.props.styles} />
      </div>
    );
  },

  // Context dependant functionality

  getChildContext: function () {
    var self = this;
    return {
      registerNode: function (node) {
        var nodes = self.state.nodes;
        nodes.push(node);
        self.setState({ nodes: nodes })
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