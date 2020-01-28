import { empty } from '../finalize';
import { query } from '../query';
import { graph, page } from '../graph';

it('should generate empty results', () => {
  expect(
    empty(
      query({
        postCount: 1,
        posts: [{ first: 20 }, { title: 1 }],
        users: { 1: { name: 1 }, 2: { name: 1 } },
      }),
      0,
    ),
  ).toEqual(
    graph(
      {
        postCount: null,
        posts: page({}),
        users: { 1: { name: null }, 2: { name: null } },
      },
      0,
    ),
  );
});
