import { describe, it, expect } from 'vitest';
import { generateLeadPDF } from '../src/lib/pdf';

const mockData = {
  firstName: 'John',
  lastName: 'Smith',
  businessName: 'Smith Auto LLC',
  email: 'john@smithauto.com',
  service: 'Business Consulting',
  message: 'We need help scaling our operations with some long text to verify line wrapping logic works correctly in the PDF generator. Testing testing one two three.',
};

describe('generateLeadPDF', () => {
  it('returns a Uint8Array', async () => {
    const result = await generateLeadPDF(mockData);
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('returns a non-empty PDF (at least 1KB)', async () => {
    const result = await generateLeadPDF(mockData);
    expect(result.length).toBeGreaterThan(1000);
  });

  it('starts with PDF magic bytes', async () => {
    const result = await generateLeadPDF(mockData);
    const header = String.fromCharCode(...result.slice(0, 5));
    expect(header).toBe('%PDF-');
  });
});
