import { hashUrlToHistoryUrl } from '../hashUrlToHistoryUrl';

export {};

// type ForEach = (value: string, key: string, parent: URLSearchParams) => void;

describe('', () => {
  it('should create a Location object', () => {
    const href = 'http://example.com';
    const hashUrl = new URL(href);
  //   expect(hashUrl).toStrictEqual({});
  //   // const hashUrl2: URL = {
  //   //   hash: '',
  //   //   host: 'bexample.com',
  //   //   hostname: '',
  //   //   href,
  //   //   origin: '',
  //   //   password: '',
  //   //   port: '80',
  //   //   pathname: '/',
  //   //   protocol: 'http:',
  //   //   search: '',
  //   //   searchParams: {
  //   //     append: () => void 0,
  //   //     delete: () => void 0,
  //   //     get: (key: string) => key,
  //   //     getAll: key => [key],
  //   //     has: key => Boolean(key),
  //   //     set: () => void 0,
  //   //     sort: () => [],
  //   //     forEach: (_fn: ForEach, _thisArg?: any) => void 0,
  //   //   },
  //   //   toJSON: () => '',
  //   //   username: '',
  //   // };
  //
    const historyUrl = hashUrlToHistoryUrl(hashUrl);
  //
  //   console.log('historyUrl:', historyUrl);
  //
    expect(historyUrl.href).toStrictEqual(href);
  });

  // it('should', () => {
  //   const url = 'http://example.com';
  //   const location = new URL('http://example.com');
  //
  //   const expected = {
  //     hash: '',
  //     host: 'bexample.com',
  //     href: url,
  //     pathname: '/',
  //     protocol: 'http:',
  //     search: '',
  //     searchParams: {},
  //   };
  //
  //   expect(location).toStrictEqual(expected);
  // });
});
