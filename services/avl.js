//Algorithms and Data Structures
//Written By: Kara Balsom
//Date Written: Dec 14, 2022

const { BinarySearchTree, Node, defaultCompare, Compare } = require("./bst");

//Calculates the balance factor of a node and return its state.
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  // Inserting a node in an AVL tree works the same way as in BST.
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  insertNode(node, key) {
    // Insert node as in BST tree.
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node;
    }

    //Balance the tree if needed.
    const balanceFactor = this.getBalanceFactor(node); // {1}
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // {2}
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // {3}
        node = this.rotationLL(node); // {4}
      } else {
        return this.rotationLR(node); // {5}
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // {6}
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // {7}
        node = this.rotationRR(node); // {8}
      } else {
        return this.rotationRL(node); // {9}
      }
    }
    return node;
  }

  // Removing a node from the AVL Tree.
  removeNode(node, key) {
    node = super.removeNode(node, key); // {1}
    if (node == null) {
      return node;
    }
    // Verify if tree is balanced.
    const balanceFactor = this.getBalanceFactor(node); // {2}
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // {3}
      const balanceFactorLeft = this.getBalanceFactor(node.left); // {4}
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }
}

module.exports = { AVLTree };
