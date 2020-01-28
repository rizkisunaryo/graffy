import { merge, slice, finalize } from '@graffy/common';

export default function({ final } = {}) {
  return store => {
    const cache = [];

    store.on('read', [], async (query, options, next) => {
      if (options.skipCache) return next(query);
      const { known, unknown } = slice(cache, query);
      if (!unknown) return known;

      if (final) return finalize(known, unknown);

      const nextValue = await next(unknown);
      merge(cache, nextValue);
      return merge(known || [], nextValue);
    });

    store.on('write', [], async (change, options, next) => {
      const appliedChange = final ? change : await next(change);
      merge(cache, appliedChange);
      return appliedChange;
    });
  };
}
