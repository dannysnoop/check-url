import { UrlValidator } from '../utils/urlValidator';

describe('UrlValidator', () => {
  it('should return true for a valid URL', () => {
    expect(UrlValidator.isValidUrl('https://example.com')).toBe(true);
  });

  it('should return false for an invalid URL', () => {
    expect(UrlValidator.isValidUrl('invalid-url')).toBe(false);
  });

  it('should return true for a URL with query parameters', () => {
    expect(UrlValidator.isValidUrl('https://example.com?query=test')).toBe(true);
  });

  it('should return false for a URL with invalid characters', () => {
    expect(UrlValidator.isValidUrl('https://example$.com')).toBe(false);
  });
});