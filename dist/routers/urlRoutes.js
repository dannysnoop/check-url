"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const urlCheckerService_1 = require("../services/urlCheckerService");
const router = express_1.default.Router();
const urls = [
    { url: "https://does-not-work.perfume.new", priority: 1 },
    { url: "https://gitlab.com", priority: 4 },
    { url: "https://github.com", priority: 4 },
    { url: "https://doesnt-work.github.com", priority: 4 },
    { url: "http://app.scnt.me", priority: 3 },
    { url: "https://offline.scentronix.com", priority: 2 }
];
const urlCheckerService = new urlCheckerService_1.UrlCheckerService(urls);
router.get('/reachable', async (req, res) => {
    const reachableUrls = await urlCheckerService.getReachableUrls();
    res.json(reachableUrls);
});
router.get('/reachable/:priority', async (req, res) => {
    const priority = parseInt(req.params.priority, 10);
    if (isNaN(priority)) {
        return res.status(400).json({ error: 'Invalid priority' });
    }
    const reachableUrls = await urlCheckerService.getUrlsByPriority(priority);
    res.json(reachableUrls);
});
exports.default = router;
