const { AVLTree } = require("../services/avl");

describe("Testing the Functions of avl.js", () => {
  test("Test to check AVLTree() Function.", () => {
    const tree = new AVLTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.root).not.toBe(null);
    expect(tree.root.key).toBe(2);
    expect(tree.root.left.key).toBe(1);
    expect(tree.root.right.key).toBe(4);
    expect(tree.root.right.left.key).toBe(3);
    expect(tree.root.right.right.key).toBe(5);
  });

  test("Test to check getNodeHeight() Function.", () => {
    const tree = new AVLTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    const hgt = tree.getNodeHeight(2);
    expect(hgt).toBe(0);
  });

  test("Test to check the min() Function.", () => {
    const tree = new AVLTree();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    const minimum = tree.min();
    expect(minimum.key).toBe(1);
  });
});
