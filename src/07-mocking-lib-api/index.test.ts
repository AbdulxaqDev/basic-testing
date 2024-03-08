// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const mockResponse = {
    data: [
      {
        user: 'John',
      },
    ],
  };

  const mockRelativePath = '/posts/1';

  test('should create instance with provided base url', async () => {
    const createMock = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi('/posts/1');

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(createMock).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockImplementationOnce(
      () =>
        ({
          get: jest
            .fn((relativePath) => {
              expect(relativePath).toBe(mockRelativePath);
              return new Promise((resolve) => resolve(mockResponse));
            })
            .mockResolvedValue(mockResponse),
        } as unknown as AxiosInstance),
    );

    await expect(throttledGetDataFromApi(mockRelativePath)).resolves.toBe(
      mockResponse.data,
    );

    jest.advanceTimersByTime(THROTTLE_TIME);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as AxiosInstance);

    await expect(throttledGetDataFromApi(mockRelativePath)).resolves.toBe(
      mockResponse.data,
    );

    jest.advanceTimersByTime(THROTTLE_TIME);
  });
});
