var React = require("react");

"use strict";

var TreeviewToolbarButton = React.createClass({
  
  render: function () {

    return (
      <button onClick={this.props.clickHandler} className={this.props.styles.treeviewToolbarButton}>
        {this.props.value}
      </button>
    );
  }

});

TreeviewToolbarButton.contextTypes = {
  getTreeviewNodes: React.PropTypes.func,
  setTreeviewNodes: React.PropTypes.func
};

module.exports = TreeviewToolbarButton;