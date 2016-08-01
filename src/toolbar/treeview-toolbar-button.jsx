var React = require("react");

"use strict";

var TreeviewToolbarButton = React.createClass({
  
  render: function () {

    var handler;
    if(this.props.clickHandler){
      handler = this.props.clickHandler.bind(this);
    }

    return (
      <button onClick={handler} className={this.props.styles.treeviewToolbarButton}>
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