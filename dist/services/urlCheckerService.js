"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlCheckerService = void 0;
const axios_1 = __importDefault(require("axios"));
class UrlCheckerService {
    constructor(urls) {
        this.urls = urls;
    }
    async checkUrl(url) {
        try {
            const response = await axios_1.default.get(url, { timeout: 5000 });
            return response.status >= 200 && response.status < 300;
        }
        catch {
            return false;
        }
    }
    async getReachableUrls() {
        const checkPromises = this.urls.map(async (urlItem) => {
            const isReachable = await this.checkUrl(urlItem.url);
            return { ...urlItem, reachable: isReachable };
        });
        const results = await Promise.all(checkPromises);
        return results
            .filter(item => item.reachable)
            .sort((a, b) => a.priority - b.priority);
    }
    async getUrlsByPriority(priority) {
        const filteredUrls = this.urls.filter(urlItem => urlItem.priority === priority);
        const checkPromises = filteredUrls.map(async (urlItem) => {
            const isReachable = await this.checkUrl(urlItem.url);
            return { ...urlItem, reachable: isReachable };
        });
        const results = await Promise.all(checkPromises);
        return results.filter(item => item.reachable);
    }
}
exports.UrlCheckerService = UrlCheckerService;
