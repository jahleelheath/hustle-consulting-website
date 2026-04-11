import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/lib/pdf', () => ({
  generateLeadPDF: vi.fn().mockResolvedValue(new Uint8Array([37, 80, 68, 70])),
}));

vi.mock('../src/lib/email', () => ({
  sendLeadEmail: vi.fn().mockResolvedValue(undefined),
}));

import { handleContactPost } from '../src/pages/api/contact';

describe('handleContactPost', () => {
  it('returns 400 if required fields are missing', async () => {
    const result = await handleContactPost({ firstName: '', lastName: '', businessName: '', email: '', service: '', message: '' });
    expect(result.status).toBe(400);
    expect(result.body.error).toContain('required');
  });

  it('returns 400 for invalid email', async () => {
    const result = await handleContactPost({ firstName: 'John', lastName: 'Smith', businessName: 'Biz', email: 'not-an-email', service: 'Consulting', message: 'Hi' });
    expect(result.status).toBe(400);
    expect(result.body.error).toContain('email');
  });

  it('returns 200 with valid data', async () => {
    const result = await handleContactPost({ firstName: 'John', lastName: 'Smith', businessName: 'Smith LLC', email: 'john@smith.com', service: 'Business Consulting', message: 'I need help growing.' });
    expect(result.status).toBe(200);
    expect(result.body.success).toBe(true);
  });
});
