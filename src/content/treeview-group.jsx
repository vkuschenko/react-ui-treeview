var React = require("react");

"use strict";

var TreeviewGroup = React.createClass({

  render: function () {
    var groupClass = this.props.styles.group;
    if (this.props.root) {
      groupClass += " " + this.props.styles.groupRoot;
    }
    if (this.props.collapsed) {
      groupClass += " " + this.props.styles.groupCollapsed;
    }

    return (
      <ul className={groupClass}>
        {this.props.children}
      </ul>
    );
  }

});

module.exports = TreeviewGroup;