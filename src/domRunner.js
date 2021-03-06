/**
 * @fileoverview Implements DomRunner
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

/**
 * Node Type Value
 */
var NODE = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3
};

/**
 * DomRunner
 * @exports DomRunner
 * @constructor
 * @class
 * @param {HTMLElement} node A root node that it has nodes to iterate(not iterate itself and its any siblings)
 */
function DomRunner(node) {
    this._root = node;
    this._current = node;
}


/**
 * next
 * Iterate next node
 * @returns {HTMLElement} next node
 */
DomRunner.prototype.next = function() {
    var current = this._current,
        node;

    if (this._current) {
        node = this._getNextNode(current);

        while (this._isNeedNextSearch(node, current)) {
            current = current.parentNode;
            node = current.nextSibling;
        }

        this._current = node;
    }

    return this._current;
};

/**
 * getNode
 * Return current node
 * @returns {HTMLElement} current node
 */
DomRunner.prototype.getNode = function() {
    return this._current;
};

/**
 * getNodeText
 * Get current node's text content
 * @returns {string} text
 */
DomRunner.prototype.getNodeText = function() {
    var node = this.getNode(),
        text;

    if (node.nodeType === NODE.TEXT_NODE) {
        text = node.nodeValue;
    } else {
        text = node.textContent || node.innerText;
    }

    return text;
};

/**
 * _isNeedNextSearch
 * Check if there is next node to iterate
 * @private
 * @param {HTMLElement} node next node
 * @param {HTMLElement} current next node
 * @returns {boolean} result
 */
DomRunner.prototype._isNeedNextSearch = function(node, current) {
    return !node && current !== this._root && current.parentNode !== this._root;
};

/**
 * _getNextNode
 * Return available next node
 * @private
 * @param {HTMLElement} current current node
 * @returns {node} next node
 */
DomRunner.prototype._getNextNode = function(current) {
    return current.firstChild || current.nextSibling;
};

DomRunner.NODE_TYPE = NODE;

module.exports = DomRunner;

