import axios from 'axios';
import { UrlValidator } from '../utils/urlValidator';

export interface UrlItem {
  url: string;
  priority: number;
}

export class UrlCheckerService {
  constructor(private urls: UrlItem[]) {}

  private async checkUrl(url: string): Promise<boolean> {
    if (!UrlValidator.isValidUrl(url)) {
      return false;
    }
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response.status >= 200 && response.status < 300;
    } catch {
      return false;
    }
  }

  public async getReachableUrls(): Promise<UrlItem[]> {
    const checkPromises = this.urls.map(async (urlItem) => {
      const isReachable = await this.checkUrl(urlItem.url);
      return { ...urlItem, reachable: isReachable };
    });

    const results = await Promise.all(checkPromises);
    return results
      .filter(item => item.reachable)
      .sort((a, b) => a.priority - b.priority);
  }

  public async getUrlsByPriority(priority: number): Promise<UrlItem[]> {
    const filteredUrls = this.urls.filter(urlItem => urlItem.priority === priority);
    const checkPromises = filteredUrls.map(async (urlItem) => {
      const isReachable = await this.checkUrl(urlItem.url);
      return { ...urlItem, reachable: isReachable };
    });

    const results = await Promise.all(checkPromises);
    return results.filter(item => item.reachable);
  }
}