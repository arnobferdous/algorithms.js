/**
 * Copyright (C) 2014 Felipe Ribeiro
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
'use strict';

var Stack = require('../../data_structures/stack'),
    depthFirstSearch = require('../../algorithms/graph/depth_first_search');

/**
 * Sorts the edges of the DAG topologically
 *
 *  (node1) -> (node2) -> (node4)
 *     \-> (node3)^
 *
 * Meaning that:
 * - "node2" and "node3" depend on "node1"
 * - "node4" depend on node2
 * - "node2" depend on "node3"
 *
 * @param {Graph}
 * @return Stack
 */
var topologicalSort = function (graph) {
  var stack = new Stack();
  var firstHit = {};
  var time = 0;

  graph.vertices.forEach(function (node) {
    if (!firstHit[node]) {
      depthFirstSearch(graph, node, {
        allowTraversal: function (node, neighbor) {
          return !firstHit[neighbor];
        },
        enterVertex: function (node) {
          firstHit[node] = ++time;
        },
        leaveVertex: function (node) {
          stack.push(node);
        }
      });
    }
  });

  return stack;
};

module.exports = topologicalSort;
