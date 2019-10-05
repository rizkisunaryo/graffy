import { encodeUrl } from '@graffy/common';
import makeStream from '@graffy/stream';

export default function GraffyClient(baseUrl) {
  return function(store) {
    store.on('read', query => {
      if (!fetch) throw Error('client.fetch.unavailable');
      const url = `${baseUrl}?q=${encodeUrl(query)}`;
      return fetch(url).then(res => res.json());
    });

    store.on('watch', query => {
      if (!EventSource) throw Error('client.sse.unavailable');
      const url = `${baseUrl}?q=${encodeUrl(query)}`;
      const source = new EventSource(url);

      return makeStream((push, end) => {
        source.onmessage = ({ data }) => {
          data = JSON.parse(data);
          // console.log('<<<', debug(data));
          push(data);
        };

        source.onerror = e => {
          // eslint-disable-next-line no-console
          if (console && console.error) console.error(e);
          end(e);
        };

        return () => {
          source.close();
        };
      });
    });
  };
}
