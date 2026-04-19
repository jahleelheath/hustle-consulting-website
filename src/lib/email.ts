import { Resend } from 'resend';
import type { LeadData } from './pdf';

export async function sendLeadEmail(data: LeadData, pdfBytes: Uint8Array): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY environment variable is not set');

  const resend = new Resend(apiKey);

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #F5F0E3; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(245,240,227,0.1);">
      <div style="background: #C0392B; padding: 24px; margin-bottom: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; color: #fff; letter-spacing: 4px; text-transform: uppercase;">H.U.S.T.L.E Consulting LLC</h1>
        <p style="margin: 8px 0 0; font-size: 11px; color: rgba(255,255,255,0.7); letter-spacing: 2px;">NEW LEAD — ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
        ${[
          ['Name', `${data.firstName} ${data.lastName}`],
          ['Business', data.businessName],
          ['Email', data.email],
          ['Service', data.service],
        ].map(([label, value]) => `
          <tr style="border-bottom: 1px solid rgba(245,240,227,0.08);">
            <td style="padding: 16px 0; font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #C0392B; width: 140px;">${label}</td>
            <td style="padding: 16px 0; font-size: 15px; font-weight: bold; color: #F5F0E3;">${value}</td>
          </tr>
        `).join('')}
      </table>
      
      <div style="padding: 24px; background: rgba(245,240,227,0.03); border-left: 4px solid #C0392B;">
        <p style="font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #C0392B; margin: 0 0 12px 0;">Client Message</p>
        <p style="font-size: 14px; color: rgba(245,240,227,0.8); line-height: 1.7; margin: 0;">${data.message}</p>
      </div>
      
      <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(245,240,227,0.1); text-align: center;">
        <p style="font-size: 9px; font-weight: 800; letter-spacing: 3px; color: #C0392B; text-transform: uppercase; margin: 0;">Changing the world one hustle at a time</p>
        <p style="font-size: 9px; color: rgba(245,240,227,0.3); margin: 8px 0 0 0;">© 2026 H.U.S.T.L.E Consulting LLC. All rights reserved.</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'H.U.S.T.L.E Website <onboarding@resend.dev>',
    to: ['hustleconsultingllc@gmail.com'],
    subject: `New Lead: ${data.firstName} ${data.lastName} — ${data.service}`,
    html: htmlBody,
    attachments: [
      {
        filename: `lead-${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}.pdf`,
        content: Buffer.from(pdfBytes),
      },
    ],
  });

  if (error) {
    console.error('Resend rejection:', error);
    throw new Error(`Resend error: ${error.message}`);
  }
}
