import type { APIRoute } from 'astro';
import { generateLeadPDF, type LeadData } from '../../lib/pdf';
import { sendLeadEmail } from '../../lib/email';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Exported for unit testing
export async function handleContactPost(data: LeadData): Promise<{ status: number; body: any }> {
  const { firstName, lastName, businessName, email, service, message } = data;

  if (!firstName || !lastName || !businessName || !email || !service || !message) {
    return { status: 400, body: { error: 'All fields are required.' } };
  }

  if (!isValidEmail(email)) {
    return { status: 400, body: { error: 'Invalid email address.' } };
  }

  try {
    const pdfBytes = await generateLeadPDF(data);
    await sendLeadEmail(data, pdfBytes);
    return { status: 200, body: { success: true } };
  } catch (err: any) {
    console.error('Core Logic Error:', err);
    return { status: 500, body: { error: err.message || 'Server error occurred.' } };
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await handleContactPost(body as LeadData);
    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to process request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
