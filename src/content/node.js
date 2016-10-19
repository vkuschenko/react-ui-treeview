import React from "react";
import Group from "./group";
import Expander from "./expander";

/**
 * Props:
 *  nodes     -
 *  styles    -
 *  node      -
 *    node.nodes
 *    node.type
 *    node.id
 *    node.collapsed
 *    node.selected
 *    node.name
 */
class Node extends React.Component {

  render () {
    var expandable = this.props.node.nodes && this.props.node.nodes.length > 0;
    var nodeStyles = this.props.styles.node;

    return (
      <li data-type={this.props.node.type} className={nodeStyles.node}>
        
        {expandable && <Expander styles={this.props.styles}
                                 id={this.props.node.id}
                                 collapsed={this.props.node.collapsed} />}
        
        <div className={nodeStyles.label}>
          <span onClick={this.onNodeClick} className={this.props.node.selected ? nodeStyles.selected : ""}>
            {this.props.node.name}
          </span>
        </div>
        {expandable && this.renderGroup()}
      </li>
    );
  }

  renderGroup () {
    return (
      <Group styles={this.props.styles} collapsed={this.props.node.collapsed} nodes={this.props.node.nodes}>
        {this.props.node.nodes.map(function (node) {
          return <Node key={node.id} styles={this.props.styles} node={node}/>
        }, this)}
      </Group>
    );
  }

  onNodeClick () {
    this.context.handlerNodeClick(this.props.id, this.props.node.clickHandler.bind(this));
  }

}

Node.contextTypes = {
  handlerNodeClick: React.PropTypes.func
};

export default Node;