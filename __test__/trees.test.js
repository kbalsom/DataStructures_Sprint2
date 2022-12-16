const { AVLTree } = require("../services/avl");
const {
  BinarySearchTree,
  Node,
  defaultCompare,
  Compare,
} = require("../services/avl");
const mdb = require("../services/mdb");

describe("Testing Routes", () => {
  beforeAll(async () => {
    expect(mdb.connect()).toBeTruthy();
  });
  afterAll(() => {
    mdb.close();
  });

  describe("Testing the Functions that was Used From AVLTree Class", () => {
    test("Tests the inputs of the AVL tree.", () => {
      const tree = new AVLTree();
      tree.insert(10);
      tree.insert(23);
      tree.insert(35);
      tree.insert(42);
      tree.insert(50);
      expect(tree.root).not.toBe(null);
      expect(tree.root.key).toBe(23);
      expect(tree.root.left.key).toBe(10);
      expect(tree.root.right.key).toBe(42);
      expect(tree.root.right.left.key).toBe(35);
      expect(tree.root.right.right.key).toBe(50);
    });

    test("Test to see if inputs rotate left.", () => {
      const tree = new AVLTree();
      tree.insert(18);
      tree.insert(25);
      tree.insert(39);
      expect(tree.root.key).toBe(25);
      expect(tree.root.left.key).toBe(18);
      expect(tree.root.right.key).toBe(39);
      // console.log(newTree, null, 2);
    });

    test("Test to see if inputs rotate left and right.", () => {
      const tree = new AVLTree();
      tree.insert(12);
      tree.insert(27);
      tree.insert(31);
      tree.insert(48);
      tree.insert(54);
      expect(tree.root.key).toBe(27);
      expect(tree.root.left.key).toBe(12);
      expect(tree.root.right.key).toBe(48);
      expect(tree.root.right.left.key).toBe(31);
      expect(tree.root.right.right.key).toBe(54);
    });
  });
});
