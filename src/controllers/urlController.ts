import { Request, Response } from 'express';
import { UrlCheckerService } from '../services/urlCheckerService';

export class UrlController {
  constructor(private urlCheckerService: UrlCheckerService) {}

  public async getReachableUrls(req: Request, res: Response): Promise<void> {
    try {
      const urls = await this.urlCheckerService.getReachableUrls();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUrlsByPriority(req: Request, res: Response): Promise<void> {
    const priority = parseInt(req.params.priority, 10);
    if (isNaN(priority)) {
      res.status(400).json({ error: 'Invalid priority' });
      return;
    }
    try {
      const urls = await this.urlCheckerService.getUrlsByPriority(priority);
      res.json(urls);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}