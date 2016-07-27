var React = require("react");
var TreeviewToolbarButton = require("./treeview-toolbar-button.jsx");

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
  for (var i = 0; i < this.context.nodes.length; i++) {
    var node = this.context.nodes[i];
    node.setState({ collapsed: true });
  }
}

function handlerExpandAll() {
  for (var i = 0; i < this.context.nodes.length; i++) {
    var node = this.context.nodes[i];
    node.setState({ collapsed: false });
  }
}

module.exports = TreeviewToolbar;