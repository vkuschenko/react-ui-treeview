var React = require("react");
var TreeviewToolbar = require("./toolbar/treeview-toolbar.js");
var TreeviewGroup = require("./content/treeview-group.js");
var TreeviewNode = require("./content/treeview-node.js");
var inputPreprocessor = require("./helpers/input-preprocessor");
var defaultStyles = require("./helpers/default-styles");

"use strict";

var Treeview = React.createClass({

  getDefaultProps: function () {
    return {
      styles: defaultStyles,
      useDefaultButtons: true
    };
  },

  getInitialState: function () {
    return {nodes: []};
  },

  componentWillMount: function () {
    this.setState({
      nodes: inputPreprocessor.verify(this.props.nodes)
    });
  },

  render: function () {
    return (
      <div className={this.props.styles.treeview}>
        <TreeviewToolbar styles={this.props.styles}
                         useDefaultButtons={this.props.useDefaultButtons}
                         customButtons={this.props.buttons}/>

        <div className={this.props.styles.treeviewContent}>
          <TreeviewGroup styles={this.props.styles} collapsed={false} root={true}>
            {this.state.nodes.map(function (node) {
              return <TreeviewNode key={node.id} styles={this.props.styles} node={node} />
            }, this)}
          </TreeviewGroup>
        </div>
      </div>
    );
  },

  // Context dependent functionality

  getChildContext() {
    return {
      getTreeviewNodes: getTreeviewNodes.bind(this),
      setTreeviewNodes: setTreeviewNodes.bind(this)
    };
  }

});

Treeview.childContextTypes = {
  getTreeviewNodes: React.PropTypes.func,
  setTreeviewNodes: React.PropTypes.func
};

module.exports = Treeview;


function getTreeviewNodes() {
  return this.state.nodes;
}

function setTreeviewNodes(nodes) {
  this.setState({nodes: nodes});
}