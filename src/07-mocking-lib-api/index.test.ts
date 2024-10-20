// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const axiosClient = axios.create({
      baseURL,
    });
    expect(axiosClient.getUri()).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi('/posts/1')?.then((response) =>
      expect(response.config.url).toBe('/posts/1'),
    );
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi('/posts/1');
    expect(response.id).toBe(1);
  });
});
