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
  [null, null], // <-- value is `null`
  [null, null], // <-- value is `null`
])('', (value, _value?) => {
  expect(value).toBeNull()
});

test.each([
  [null],
  [null, null], // Causes Jest to time out
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
