"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlValidator = void 0;
class UrlValidator {
    static isValidUrl(url) {
        return this.urlPattern.test(url);
    }
}
exports.UrlValidator = UrlValidator;
UrlValidator.urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
);
