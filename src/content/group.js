import React from "react";

/**
 * Props:
 *  styles      - styles
 *  root        - is root node
 *  collapsed   - is node collapsed
 */
class Group extends React.Component {

  render () {
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

}

export default Group;