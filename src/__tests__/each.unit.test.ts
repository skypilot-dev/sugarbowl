/* eslint-disable semi */

import { expect } from '@jest/globals';

test.each([
  null,
])('value is null', value => {
  expect(value).toBeNull();
});

test.each([
  [null],
])('value is null', value => {
  expect(value).toBeNull()
})

test.each([
  [null], // <-- value is `null`
  [null, null], // <-- value is `null`
])('', (value, _value?) => {
  expect(value).toBeNull()
});

test.each([
  [1],
  [1, 2], // Causes Jest to time out
  1,
])('', (...values) => {
  expect(values).toBeNull()
});

test.each([
  null,
  [null], // <-- value is `[null]`
])('value is null', value => {
  expect(value).toBeNull()
})

test.each([
  [null], // <-- value is `[null]`
  null,
])('value is null', value => {
  expect(value).toBeNull()
})
