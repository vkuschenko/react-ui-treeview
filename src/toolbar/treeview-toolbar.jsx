var React = require("react");
var TreeviewToolbarButton = require("./treeview-toolbar-button.jsx");
var ElementHelper = require("../helpers/element-helper");

"use strict";

var TreeviewToolbar = React.createClass({

  render: function () {
    var buttons = [];
    if (this.props.useDefaultButtons) {
      buttons.push({ value: "Collapse all", styles: this.props.styles, clickHandler: handlerCollapseAll });
      buttons.push({ value: "Expand all", styles: this.props.styles, clickHandler: handlerExpandAll });
    }

    if(this.props.customButtons) {
      buttons = buttons.concat(this.props.customButtons);
    }

    return (
      <div className={this.props.styles.treeviewToolbar}>
        {buttons.map(function (button, i) {
          return <TreeviewToolbarButton
            key={i}
            value={button.value}
            styles={this.props.styles}
            clickHandler={button.clickHandler} />
        }, this)}
      </div>
    );
  },

});

function handlerCollapseAll() {
  var nodes = this.context.getTreeviewNodes();
  ElementHelper.setToAll(nodes, "collapsed", true);
  this.context.setTreeviewNodes(nodes);
}

function handlerExpandAll() {
  var nodes = this.context.getTreeviewNodes();
  ElementHelper.setToAll(nodes, "collapsed", false);
  this.context.setTreeviewNodes(nodes);
}

module.exports = TreeviewToolbar;