/*
  makeOperation: Return an interval operation for the given logic flags.

  An interval operation is a function that accepts two interval sets and
  returns an interval set.

  An interval set is a sorted array with an even number of elements, where
  each pair of elements form a closed interval.

  The logic flags may each be zero or 1, and they are:
  - lForR: Only keep values from the left interval set that are strictly
           outside (0) or inside (1) the right interval set
  - rForL: Only keep values from the right interval set that are strictly
           outside (0) or inside (1) the left interval set
*/

function makeOperation(lForR, rForL) {
  return function (left, right) {
    let i = 0;
    let result = [];

    for (let j = 0; j < right.length; j++) {
      for (; i < left.length && left[i] <= right[j]; i++) {
        if (j % 2 === lForR) push(result, left[i]);
      }
      if (i % 2 === rForL) push(result, right[j]);
    }

    if (!lForR) for(; i < left.length; i++) push(result, left[i]);
    return result;
  };
}

function push(interval, bound) {
  const l = interval.length;
  if (l % 2 === 0 && bound === interval[l - 1]) {
    interval.splice(-1);
  } else {
    interval.push(bound);
  }
}

export const union = makeOperation(0, 0);
export const inter = makeOperation(1, 1);
export const diff = makeOperation(0, 1);