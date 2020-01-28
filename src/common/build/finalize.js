import { isRange, isBranch } from '../node';
import { slice, merge, setVersion } from '../graph';

export function empty(query, version = Date.now()) {
  const result = [];
  for (const node of query) {
    const { key, end, children } = node;
    const resultNode = { key, version };

    if (isRange(node)) {
      resultNode.end = end;
    } else if (isBranch(node)) {
      resultNode.children = empty(children, version);
    } else {
      resultNode.end = key;
    }
    result.push(resultNode);
  }
  return result;
}

export default function finalize(graph, query, version = Date.now()) {
  const { unknown } = slice(graph, query);
  if (unknown) merge(graph, empty(query, 0));
  return setVersion(graph, version);
}
