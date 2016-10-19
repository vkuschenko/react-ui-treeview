import React from "react";
import Toolbar from "./toolbar/toolbar";
import Content from"./content/content";
import { verify } from "./helpers/input-preprocessor";
import { findNodeById, setToAll } from "./helper";
import defaultStyles from"./default-styles";

class Treeview extends React.Component{

  constructor() {
    super();
    this.state = {nodes: []};
  }

  componentWillMount () {
    this.setState({
      nodes: verify(this.props.nodes)
    });
  }

  render () {
    return (
      <div className={this.props.styles.treeview}>
        <Toolbar styles={this.props.styles.toolbar}
                 useDefaultButtons={this.props.useDefaultButtons}
                 customButtons={this.props.buttons}/>
        <Content styles={this.props.styles.content} nodes={this.state.nodes}/>
      </div>
    );
  }

  // FUNCTIONALITY

  handlerExpanderClick (id) {
    var node = findNodeById(this.state.nodes, id);
    if (node) {
      node.collapsed = !node.collapsed;
      this.setState({nodes: this.state.nodes});
    }
  }

  handlerNodeClick (id, customHandler) {
    setToAll(this.state.nodes, "selected", false);
    var node = findNodeById(this.state.nodes, id);
    if (node) {
      node.selected = true;
      if (customHandler && customHandler instanceof Function) {
        customHandler();
      }
    }
  }

  handlerExpandAll () {
    var nodes = this.state.nodes;
    setToAll(nodes, "collapsed", false);
    this.setState(nodes);
  }

  handlerCollapseAll () {
    var nodes = this.state.nodes;
    setToAll(nodes, "collapsed", true);
    this.setState(nodes);
  }

  // Context dependent functionality

  getChildContext () {
    return {
      handlerExpanderClick: this.handlerExpanderClick.bind(this),
      handlerNodeClick: this.handlerNodeClick.bind(this),
      handlerExpandAll: this.handlerExpandAll.bind(this),
      handlerCollapseAll: this.handlerCollapseAll.bind(this)
    };
  }

}

Treeview.defaultProps = {
  styles: defaultStyles,
  useDefaultButtons: true
};

Treeview.childContextTypes = {
  handlerExpanderClick: React.PropTypes.func,
  handlerNodeClick: React.PropTypes.func,
  handlerExpandAll: React.PropTypes.func,
  handlerCollapseAll: React.PropTypes.func
};

export default Treeview;
