import { Router } from 'express';
import { UrlCheckerService } from '../services/urlCheckerService';
import { UrlController } from '../controllers/urlController';

const router = Router();

const urls = [
  { url: "https://does-not-work.perfume.new", priority: 1 },
  { url: "https://gitlab.com", priority: 4 },
  { url: "https://github.com", priority: 4 },
  { url: "https://doesnt-work.github.com", priority: 4 },
  { url: "http://app.scnt.me", priority: 3 },
  { url: "https://offline.scentronix.com", priority: 2 }
];

const urlCheckerService = new UrlCheckerService(urls);
const urlController = new UrlController(urlCheckerService);

router.get('/reachable', urlController.getReachableUrls.bind(urlController));
router.get('/reachable/:priority', urlController.getUrlsByPriority.bind(urlController));

export default router;