import React from "react";

/**
 * Props:
 *  styles      - styles
 *  id          - node id
 *  collapsed   - is node collapsed
 *  onClick     - `onClick` callback (optional)
 */
class Expander extends React.Component {

  render () {
    var expanderStyles = this.props.styles.expander;
    var styles = [expanderStyles.expander];
    styles.push(this.props.collapsed ? expanderStyles.collapsed : expanderStyles.opened);

    return <div className={styles.join(" ")} onClick={this.onClick.bind(this)}></div>;
  }

  onClick () {
    if (this.context.handlerExpanderClick) {
      this.context.handlerExpanderClick(this.props.id);
    }
  }

}

Expander.contextTypes = {
  handlerExpanderClick: React.PropTypes.func
};

export default Expander;