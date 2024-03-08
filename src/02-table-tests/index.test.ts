import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 'Invalid', b: 'Invalid', action: Action.Exponentiate, expected: null },
  { a: 3, b: 2, action: 'Invalid', expected: null },
];

describe.each(testCases)(
  '$a $action $b',
  ({ a, b, action, expected }) => {
    test(`returns ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    });
  },
  3000,
);
