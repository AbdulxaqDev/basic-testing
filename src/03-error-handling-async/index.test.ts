import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resovedValue = 'Resolved';
    await expect(resolveValue(resovedValue)).resolves.toBe(resovedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedError = 'Provided Error Message!';
    expect(() => throwError(providedError)).toThrow(providedError);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
