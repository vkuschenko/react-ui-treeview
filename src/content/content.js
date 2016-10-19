import React from "react";
import Group from "./group";
import Node from "./node";

class Content extends React.Component {

  render () {
    return (
      <div className={this.props.styles.content}>
        <Group styles={this.props.styles} collapsed={false} root={true}>
          {this.props.nodes.map(function (node) {
            return <Node key={node.id} styles={this.props.styles} node={node}/>
          }, this)}
        </Group>
      </div>
    );
  }
  
}

export default Content;
