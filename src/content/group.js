var React = require("react");

"use strict";

/**
 * Props:
 *  styles      - styles
 *  root        - is root node
 *  collapsed   - is node collapsed
 */
var Group = React.createClass({

  render: function () {
    var groupStyles = this.props.styles.group;
    var styles = [groupStyles.group];
    this.props.root && styles.push(groupStyles.root);
    this.props.collapsed && styles.push(groupStyles.collapsed);

    return (
      <ul className={styles.join(" ")}>
        {this.props.children}
      </ul>
    );
  }

});

module.exports = Group;