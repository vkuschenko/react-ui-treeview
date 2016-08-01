var React = require("react");
var TreeviewGroup = require("./treeview-group.jsx");
var ElementHelper = require("../helpers/element-helper");

"use strict";

var TreeviewNode = React.createClass({

  render: function () {
    var expandable = this.props.node.nodes && this.props.node.nodes.length > 0;
    
    return (
      <li data-type={this.props.node.type} className={this.props.styles.element}>
        {expandable && this.drawExpander()}
        <div className={this.props.styles.elementLabel}>
          <span onClick={this.handlerLabelClick} className={this.props.node.selected && this.props.styles.elementLabelSelected}>
            {this.props.node.name}
          </span>
        </div>
        {expandable && this.drawGroup()}
      </li>
    );
  },

  drawGroup: function () {
    return (
      <TreeviewGroup styles={this.props.styles} collapsed={this.props.node.collapsed} nodes={this.props.node.nodes}>
        {this.props.node.nodes.map(function (node) {
          return <TreeviewNode key={node.id} styles={this.props.styles} node={node}/>
        }, this)}
      </TreeviewGroup>
    );
  },

  drawExpander: function () {
    var expanderClass = this.props.styles.expander + " ";
    expanderClass += this.props.node.collapsed
      ? this.props.styles.expanderCollapsed
      : this.props.styles.expanderOpened;

    return <div className={expanderClass} onClick={this.handlerExpanderClick}></div>;
  },

  handlerExpanderClick: function () {
    var nodes = this.context.getTreeviewNodes();
    var node = ElementHelper.findElement(nodes, this.props.node.id);
    if (node) {
      node.collapsed = !node.collapsed;
      this.context.setTreeviewNodes(nodes);
    }
  },

  handlerLabelClick: function () {
    var nodes = this.context.getTreeviewNodes();
    ElementHelper.setToAll(nodes, "selected", false);
    var node = ElementHelper.findElement(nodes, this.props.node.id);
    if (node) {
      node.selected = true;
      this.context.setTreeviewNodes(nodes);
      if(this.props.node.click && this.props.node.click instanceof Function) {
        var clickCallback = this.props.node.click.bind(this);
        clickCallback();
      }
    }
  }

});

TreeviewNode.contextTypes = {
  getTreeviewNodes: React.PropTypes.func,
  setTreeviewNodes: React.PropTypes.func
};

module.exports = TreeviewNode;