import { throwError, throwCustomError, resolveValue , MyAwesomeError, rejectCustomError} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(resolveValue('Resolved')).resolves.toBe("Resolved")
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedError = "Hehhehhe"
    expect(() => throwError(providedError)).toThrow(providedError)
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow("Oops!")
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow("This is my awesome custom error!")
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow();
  });
});
