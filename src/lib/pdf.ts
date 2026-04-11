import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface LeadData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  service: string;
  message: string;
}

export async function generateLeadPDF(data: LeadData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await doc.embedFont(StandardFonts.Helvetica);

  const black = rgb(0.04, 0.04, 0.04);
  const red = rgb(0.75, 0.22, 0.17);
  const cream = rgb(0.96, 0.94, 0.89);
  const grey = rgb(0.45, 0.45, 0.45);

  // Background
  page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.04, 0.04, 0.04) });

  // Header bar
  page.drawRectangle({ x: 0, y: height - 80, width, height: 80, color: red });

  // Company name in header
  page.drawText('H.U.S.T.L.E CONSULTING LLC', {
    x: 40, y: height - 45,
    size: 18, font: boldFont, color: cream,
  });
  page.drawText('New Lead Submission', {
    x: 40, y: height - 65,
    size: 10, font: regularFont, color: rgb(1, 0.85, 0.8),
  });

  // Date top right
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  page.drawText(dateStr, {
    x: width - 40 - boldFont.widthOfTextAtSize(dateStr, 10),
    y: height - 50,
    size: 10, font: regularFont, color: rgb(1, 0.85, 0.8),
  });

  // Red left accent bar
  page.drawRectangle({ x: 40, y: 40, width: 3, height: height - 140, color: red });

  let y = height - 120;
  const leftX = 60;

  const drawField = (label: string, value: string) => {
    page.drawText(label.toUpperCase(), { x: leftX, y, size: 8, font: boldFont, color: red });
    y -= 18;
    page.drawText(value || '—', { x: leftX, y, size: 13, font: boldFont, color: cream });
    y -= 32;
  };

  const drawDivider = () => {
    page.drawLine({ start: { x: leftX, y }, end: { x: width - 40, y }, thickness: 0.5, color: rgb(0.2, 0.2, 0.2) });
    y -= 20;
  };

  drawField('Client Name', `${data.firstName} ${data.lastName}`);
  drawDivider();
  drawField('Business', data.businessName);
  drawDivider();
  drawField('Email', data.email);
  drawDivider();
  drawField('Service Requested', data.service);
  drawDivider();

  // Message (multiline)
  page.drawText('MESSAGE', { x: leftX, y, size: 8, font: boldFont, color: red });
  y -= 18;

  const words = data.message.split(' ');
  let line = '';
  const maxWidth = width - leftX - 40;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (regularFont.widthOfTextAtSize(test, 12) > maxWidth) {
      page.drawText(line, { x: leftX, y, size: 12, font: regularFont, color: cream });
      y -= 18;
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x: leftX, y, size: 12, font: regularFont, color: cream });
  }

  // Footer
  page.drawText('hustleconsultingllc@gmail.com  ·  Changing the world one hustle at a time', {
    x: 40, y: 30,
    size: 8, font: regularFont, color: grey,
  });

  return doc.save();
}
