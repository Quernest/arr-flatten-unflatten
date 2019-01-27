"use strict";

/**
 * wraps each list item in braces
 * @param {Array|number|string} idxs - sequential index list or a single element
 */
function wrap(idxs = [] | 0) {
  if (Array.isArray(idxs)) {
    let braced = [];

    for (let i = 0; i < idxs.length; i++) {
      braced.push("[" + idxs[i] + "]");
    }

    return braced.join("");
  }

  return "[" + idxs + "]";
}

/**
 * flatten function for the single or multidimensional array
 * @param {Array} input - single or multidimensional array
 * @returns {Object} json-like
 */
function flatten(input = []) {
  let flat = [...input];
  /**
   * json-like output
   * @example [2, 3, [4, 3, 2]] converts to { [0]: 2, [1]: 3, [2][0]: 4, [2][1]: 3, [2][2]: 2 }
   */
  let json = {};
  /**
   * previous iteration element
   */
  let prev = [];
  /**
   * store of array paths (indexes)
   */
  let idxs = [];
  /**
   * iterator
   */
  let i = -1;

  while (++i < flat.length) {
    /**
     * @constant curr is current element of list
     * it can be array or any value inside the array
     */
    const curr = flat[i];

    if (Array.isArray(curr)) {
      /**
       * @constant ridx is index of current array element
       * inside input array
       * it is the first deep level
       */
      const ridx = input.indexOf(curr);

      /**
       * @constant cidx is index of current array element
       * inside previous array
       * this is needed to determine the positions
       * of nested arrays
       */
      const cidx = prev.indexOf(curr);

      /**
       * if input array contains current element
       * push element index (array position) to
       * the idxs array
       */
      if (ridx > -1) {
        // clear store if it is a new root element
        idxs = [];

        // pushing...
        idxs.push(ridx);
      }

      /**
       * if previous element contains current element
       * thet means it is nested array and we need to
       * push all idxs of nested arrays to the idxs
       */
      if (cidx > -1) {
        idxs.push(cidx);
      }

      /**
       * as a result, the array of idxs will
       * correspond to the path to the specific element
       * in the original array
       */
      let j = 0;
      /**
       * cache for better for-loop performance
       */
      let cache = curr.length;

      for (j; j < cache; j++) {
        // skip non-array elements
        if (!Array.isArray(curr[j])) {
          /**
           * create a property of the object that
           * corresponds to the path to the element
           * of array
           */
          json[wrap([...idxs, j])] = curr[j];
        }
      }

      // splice array in current position for deeping
      flat.splice(i, 1, ...flat[i--]);

      // update previous value
      prev = curr;
    } else {
      /**
       * if at the first level of nesting
       * a number comes across we process it
       * in a similar way
       */
      let j = 0;
      /**
       * cache for better for-loop performance
       */
      let cache = input.length;

      for (j; j < cache; j++) {
        if (input[j] === curr) {
          json[wrap(j)] = curr;
        }
      }
    }
  }

  return json;
}

module.exports = flatten;
