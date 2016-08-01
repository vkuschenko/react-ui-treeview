"use strict";

module.exports = {
  
  verify: function(nodes) {
    var self = this;
    return nodes.map(function(node){
      if(node.nodes && node.nodes.length > 0){
        node.nodes = self.verify(node.nodes);
      }

      node = self.setCollapsed(node);
      node = self.setGuid(node);
      return node;
    });
  },

  setCollapsed: function(node) {
    if(!("collapsed" in node)){
      node.collapsed = false;
    }
    return node;
  },

  setGuid: function (node) {
    if (!node.id) {
      node.id = (this.guidSection() + this.guidSection() + "-" + this.guidSection() + "-4" 
      + this.guidSection().substr(0, 3) + "-" + this.guidSection() + "-" + this.guidSection()
      + this.guidSection() + this.guidSection()).toLowerCase();
    }
    return node;
  },
  
  guidSection: function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
};