//Algorithms and Data Structures
//Written By: Kara Balsom
//Date Written: Dec 16, 2022

//Test functions from the program:

const { AVLTree } = require("../services/avl"); //Import AVLTree function from avl.js in services file.

//Test 1: Tests the AVLTree function. Insert data and expect an AVL tree as the result.

describe("Testing the Functions of avl.js", () => {
  test("Test to check AVLTree() Function.", () => {
    const tree = new AVLTree(); //Set up a new tree.
    tree.insert(1); //Insert data into tree...
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    expect(tree.root.key).toBe(2); //Expect the root to be 2.
    expect(tree.root.left.key).toBe(1); //Expect left node to be 1.
    expect(tree.root.right.key).toBe(4); //Expect right node to be 4.
    expect(tree.root.right.left.key).toBe(3); //Expect left node of the 4 node to be 3.
    expect(tree.root.right.right.key).toBe(5); //Expect right node of the 4 node to be 5.
  });

  //Test 2: Tests the getNodeHeight function. Insert data and set height expectation.

  test("Test to check getNodeHeight() Function.", () => {
    const tree = new AVLTree(); //Set up new AVL tree.
    tree.insert(1); //Insert data into tree...
    tree.insert(2);
    tree.insert(3);
    const hgt = tree.getNodeHeight(2); //Pass in node with value of 2, and the tree to the getNodeHeight function.
    expect(hgt).toBe(0); //Expect height to be 0.
  });

  //Test 3: Tests the min function. Insert data and set the minimum node expectation.
  test("Test to check the min() Function.", () => {
    const tree = new AVLTree(); //Set up new AVL tree.
    tree.insert(1); //Insert data into tree...
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    const minimum = tree.min(); //Call min() function, and pass it the tree.
    expect(minimum.key).toBe(1); //Expect minimum node to be 1.
  });
});
