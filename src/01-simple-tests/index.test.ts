import { simpleCalculator, Action, RawCalculatorInput } from './index';

function genInput(a: unknown, b: unknown, action: unknown): RawCalculatorInput {
  return {
      a,
      b,
      action
  };
}

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = genInput(1, 2, Action.Add)
    expect(simpleCalculator(input)).toBe(3);
  });

  test('should subtract two numbers', () => {
    const input = genInput(1, 2, Action.Subtract)
    expect(simpleCalculator(input)).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const input = genInput(1, 2, Action.Multiply)
    expect(simpleCalculator(input)).toBe(2);
  });

  test('should divide two numbers', () => {
    const input = genInput(1, 2, Action.Divide)
    expect(simpleCalculator(input)).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    const input = genInput(2, 10, Action.Exponentiate)
    expect(simpleCalculator(input)).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const input = genInput(2, 10, "Invalid")
    expect(simpleCalculator(input)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = genInput("Invalid", "Invalid", Action.Add)
    expect(simpleCalculator(input)).toBe(null);
  });
});
