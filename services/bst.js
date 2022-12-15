class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class BinarySearchTree {
  constructor(CompareFn = this.defaultCompare) {
    this.CompareFn = CompareFn;
    this.root = null;
  }

  insert(key) {
    if (!this.root) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    // if the key is less then, then go insert it to the left.
    if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        // To be first child of the root; if the left has nothing there.
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      // else if the key is greater then, then insert it to the right.
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
}

module.exports = { BinarySearchTree, Node, defaultCompare, Compare };
