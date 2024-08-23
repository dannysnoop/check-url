// src/__tests__/urlCheckerService.test.ts
import { UrlCheckerService } from '../services/urlCheckerService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UrlCheckerService', () => {
  it('should return reachable URLs ordered by priority', async () => {
    const urls = [
      { url: "https://does-not-work.perfume.new", priority: 1 },
      { url: "https://gitlab.com", priority: 4 },
    ];

    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://gitlab.com") {
        return Promise.resolve({ status: 200 });
      } else {
        return Promise.reject(new Error('Network Error'));
      }
    });

    const service = new UrlCheckerService(urls);
    const result = await service.getReachableUrls();

    expect(result).toEqual([{ url: "https://gitlab.com", priority: 4, reachable: true }]);
  });

  it('should return reachable URLs for a given priority', async () => {
    const urls = [
      { url: "https://gitlab.com", priority: 4 },
      { url: "https://github.com", priority: 4 },
    ];

    mockedAxios.get.mockResolvedValue({ status: 200 });

    const service = new UrlCheckerService(urls);
    const result = await service.getUrlsByPriority(4);

    expect(result.length).toBe(2);
    expect(result).toEqual([
      { url: "https://gitlab.com", priority: 4, reachable: true },
      { url: "https://github.com", priority: 4, reachable: true }
    ]);
  });
});