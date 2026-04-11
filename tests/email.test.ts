import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Resend before importing email module
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}));

import { sendLeadEmail } from '../src/lib/email';
import type { LeadData } from '../src/lib/pdf';

const mockData: LeadData = {
  firstName: 'John',
  lastName: 'Smith',
  businessName: 'Smith Auto LLC',
  email: 'john@smithauto.com',
  service: 'Business Consulting',
  message: 'Need help scaling.',
};

const mockPdfBytes = new Uint8Array([37, 80, 68, 70]); // %PDF

describe('sendLeadEmail', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test_key';
    vi.clearAllMocks();
  });

  it('resolves without throwing when API key is present', async () => {
    await expect(sendLeadEmail(mockData, mockPdfBytes)).resolves.not.toThrow();
  });

  it('throws if RESEND_API_KEY is missing', async () => {
    delete process.env.RESEND_API_KEY;
    await expect(sendLeadEmail(mockData, mockPdfBytes)).rejects.toThrow('RESEND_API_KEY environment variable is not set');
  });
});
