//Algorithms and Data Structures
//Written By: Kara Balsom
//Date Written: Dec 14, 2022

//Set up Node class.
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

//Set up Compare constants.
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

//defaultCompare Function.
function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

//Set up BinarySearchTree class.
class BinarySearchTree {
  constructor(CompareFn = this.defaultCompare) {
    this.CompareFn = CompareFn;
    this.root = null;
  }

  //Inset Function.
  insert(key) {
    if (!this.root) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  //Insert Node Function.
  insertNode(node, key) {
    if (this.CompareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }
}

module.exports = { BinarySearchTree, Node, defaultCompare, Compare }; //Export Functions.
