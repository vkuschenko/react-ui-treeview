var React = require("react");
var Toolbar = require("./toolbar/toolbar");
var Content = require("./content/content");
var inputPreprocessor = require("./helpers/input-preprocessor");
var helper = require("./helper");
var defaultStyles = require("./default-styles");

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
        <Toolbar styles={this.props.styles.toolbar}
                 useDefaultButtons={this.props.useDefaultButtons}
                 customButtons={this.props.buttons}/>
        <Content styles={this.props.styles.content} nodes={this.state.nodes}/>
      </div>
    );
  },

  // FUNCTIONALITY

  handlerExpanderClick: function (id) {
    var node = helper.findNodeById(this.state.nodes, id);
    if (node) {
      node.collapsed = !node.collapsed;
      this.setState({nodes: this.state.nodes});
    }
  },

  handlerNodeClick: function (id, customHandler) {
    helper.setToAll(this.state.nodes, "selected", false);
    var node = helper.findNodeById(this.state.nodes, id);
    if (node) {
      node.selected = true;
      if (customHandler && customHandler instanceof Function) {
        customHandler();
      }
    }
  },

  handlerExpandAll: function () {
    var nodes = this.state.nodes;
    helper.setToAll(nodes, "collapsed", false);
    this.setState(nodes);
  },

  handlerCollapseAll: function () {
    var nodes = this.state.nodes;
    helper.setToAll(nodes, "collapsed", true);
    this.setState(nodes);
  },

  // Context dependent functionality

  getChildContext: function () {
    return {
      handlerExpanderClick: this.handlerExpanderClick,
      handlerNodeClick: this.handlerNodeClick,
      handlerExpandAll: this.handlerExpandAll,
      handlerCollapseAll: this.handlerCollapseAll
    };
  }

});

Treeview.childContextTypes = {
  handlerExpanderClick: React.PropTypes.func,
  handlerNodeClick: React.PropTypes.func,
  handlerExpandAll: React.PropTypes.func,
  handlerCollapseAll: React.PropTypes.func
};

module.exports = Treeview;
