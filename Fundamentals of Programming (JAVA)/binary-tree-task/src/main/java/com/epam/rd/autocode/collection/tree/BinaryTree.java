package com.epam.rd.autocode.collection.tree;

import java.util.Objects;
import java.util.Optional;

/**
 * Binary Search Tree.<br>
 * This class uses the natural ordering to compare elements.<br>
 * This implementation does not provide any balancing.
 *
 * @author D. Kolesnikov, Y. Mishcheriakov
 */
public class BinaryTree {

    private static final String INDENT = "-~-";
    private static final String EOL = System.lineSeparator();

    private Node root;
    private int size;

    private static final class Node {
        Integer e;
        Node left;
        Node right;

        Node(Integer e) {
            this.e = e;
        }
    }

    public BinaryTree() {
        super();
    }

    public BinaryTree(Integer... elements) {
        for (Integer element : elements) {
            add(element);
        }
    }

    public boolean add(Integer element) {
        if (root == null) {
            root = new Node(element);
            size++;
            return true;
        } else {
            return addRecursive(root, element);
        }
    }

    private boolean addRecursive(Node current, Integer value) {
        if (value < current.e) {
            if (current.left == null) {
                current.left = new Node(value);
                size++;
                return true;
            }
            return addRecursive(current.left, value);
        } else if (value > current.e) {
            if (current.right == null) {
                current.right = new Node(value);
                size++;
                return true;
            }
            return addRecursive(current.right, value);
        } else {
            return false;
        }
    }

    public void addAll(Integer... elements) {
        for (Integer element : elements) {
            add(element);
        }
    }


    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        inOrderTraversal(root, sb);
        sb.append("]");
        return sb.toString();
    }

    private void inOrderTraversal(Node node, StringBuilder sb) {
        if (node != null) {
            inOrderTraversal(node.left, sb);
            if (sb.length() > 1) {
                sb.append(", ");
            }
            sb.append(node.e);
            inOrderTraversal(node.right, sb);
        }
    }


    public Optional<Integer> remove(Integer element) {
        if (element == null) {
            throw new NullPointerException("The input element cannot be null");
        }
        if (containsNodeRecursive(root, element)) {
            root = removeRecursive(root, element);
            size--;
            return Optional.of(element);
        } else {
            return Optional.empty();
        }
    }

    private Node removeRecursive(Node current, Integer value) {
        if (current == null) {
            return null;
        }
        if (value == current.e) {
            if (current.left == null && current.right == null) {
                return null;
            }
            if (current.right == null) {
                return current.left;
            }
            if (current.left == null) {
                return current.right;
            }
            Integer smallestValue = findSmallestValue(current.right);
            current.e = smallestValue;
            current.right = removeRecursive(current.right, smallestValue);
            return current;
        }
        if (value < current.e) {
            current.left = removeRecursive(current.left, value);
            return current;
        }
        current.right = removeRecursive(current.right, value);
        return current;
    }

    private Integer findSmallestValue(Node root) {
        return root.left == null ? root.e : findSmallestValue(root.left);
    }


    private boolean containsNodeRecursive(Node current, Integer value) {
        if (current == null) {
            return false;
        }
        if (value == current.e) {
            return true;
        }
        return value < current.e
                ? containsNodeRecursive(current.left, value)
                : containsNodeRecursive(current.right, value);
    }

    public int size() {
        return size;
    }

    /**
     * The helper method for you.<br>
     * Creates a 'tree' string representation of the tree.<br>
     * If the sequence of elements `[3, 1, 2, 5, 6, 4, 0]`,
     * in the specified order, was added to the tree,
     * then the following representation is expected:
     * <pre>
     *      7
     *   6
     *     5
     * 4
     *     2
     *   1
     *     0
     * </pre>
     * '4' is the root of this tree, '0' is the most left leaf,
     * and '7' is the most right leaf of the tree.
     *
     * @return a 'tree' string representation of the tree.
     */
    String asTreeString() {
        StringBuilder sb = new StringBuilder();
        asTreeString(sb, root, 0);
        return sb.toString();
    }

    private void asTreeString(StringBuilder sb, Node node, int k) {
        if (node == null) {
            return;
        }
        asTreeString(sb, node.right, k + 1);
        sb.append(INDENT.repeat(k));
        sb.append(String.format("%3s", node.e)).append(EOL);
        asTreeString(sb, node.left, k + 1);
    }
}
