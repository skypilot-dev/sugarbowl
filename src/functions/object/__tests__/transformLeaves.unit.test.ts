import { transformLeaves } from '../transformLeaves';

describe('transformLeaves(obj, transform)', () => {
  it('should', () => {
    const obj = {
      arrayKey: ['string 0'],
      child: {
        objectKey: {},
        numberKey: 0,
        stringKey: 'string 1',
        subchild: {
          stringKey: 'string 2',
          subsubchild: {
            stringKey: 'string 3',
          },
        },
      },
      nullKey: null,
      numberKey: 1,
      stringKey1: 'string 4',
      stringKey2: 'string 5',
    };
    const expected = {
      arrayKey: ['string 0'],
      child: {
        objectKey: {},
        numberKey: 0,
        stringKey: 'STRING 1',
        subchild: {
          stringKey: 'STRING 2',
          subsubchild: {
            stringKey: 'STRING 3',
          },
        },
      },
      nullKey: null,
      numberKey: 1,
      stringKey1: 'STRING 4',
      stringKey2: 'STRING 5',
    };
    const actual = transformLeaves(obj, val => val.toUpperCase());
    expect(actual).toStrictEqual(expected);
  });
});
