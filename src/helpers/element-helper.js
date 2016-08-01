"use strict";

module.exports = {

  findElement: function (nodes, id) {
    var node = null;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) {
        node = nodes[i];
        break;
      }
      else if (nodes[i].nodes && nodes[i].nodes.length > 0) {
        node = this.findElement(nodes[i].nodes, id);
        if (node) {
          break;
        }
      }
    }

    return node;
  },

  setToAll: function (nodes, property, val) {
    for (var i = 0; i < nodes.length; i++) {
      (nodes[i])[property] = val;
      if (nodes[i].nodes && nodes[i].nodes.length > 0) {
        this.setToAll(nodes[i].nodes, property, val);
      }
    }
  },

};