// src/utils/urlValidator.ts
export class UrlValidator {
  private static urlPattern = new RegExp(
    '^https?:\\/\\/' + // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}' + // domain name and extension
    '|localhost|' + // or localhost
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // or IPv4
    '\\[?[a-fA-F\\d:]+\\]?)' + // or IPv6
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', 'i' // fragment locator
  );

  public static isValidUrl(url: string): boolean {
    return this.urlPattern.test(url);
  }
}
