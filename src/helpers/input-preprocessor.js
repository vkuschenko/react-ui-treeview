function setCollapsed(node) {
  if (!("collapsed" in node)) {
    node.collapsed = false;
  }
  return node;
}

function setGuid(node) {
  if (!node.id) {
    node.id = (guidSection() + guidSection() + "-" + guidSection() + "-4"
    + guidSection().substr(0, 3) + "-" + guidSection() + "-" + guidSection()
    + guidSection() + guidSection()).toLowerCase();
  }
  return node;
}

function guidSection () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function verify(nodes) {
  return nodes.map(function (node) {
    if (node.nodes && node.nodes.length > 0) {
      node.nodes = verify(node.nodes);
    }

    node = setCollapsed(node);
    node = setGuid(node);
    return node;
  });
}