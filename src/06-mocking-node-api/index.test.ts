// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let callback: typeof jest.fn;
  const timeOut = 2000;

  beforeEach(() => {
    callback = jest.fn();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeOut);

    jest.advanceTimersByTime(timeOut);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeOut);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeOut - 1);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  let callback: typeof jest.fn;
  const interval = 1000;
  const times = 4;

  beforeEach(() => {
    callback = jest.fn();
    jest.clearAllMocks();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval * times);

    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = 'this/mock/path';
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join').mockReturnValue(mockPath);

    await readFileAsynchronously(mockPath);

    expect(path.join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    await expect(readFileAsynchronously(mockPath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'File Content!';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(fileContent);

    await expect(readFileAsynchronously(mockPath)).resolves.toBe(fileContent);
  });
});
