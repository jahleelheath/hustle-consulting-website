import { useState } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  service: string;
  message: string;
}

const SERVICES = [
  'Business Consulting',
  'AI Strategy',
  'App Development',
  'Web Development',
  "Not sure yet — let's talk",
];

const inputStyle: React.CSSProperties = {
  background: 'rgba(245,240,227,0.03)',
  border: '1px solid rgba(245,240,227,0.1)',
  color: '#F5F0E3',
  padding: '14px 16px',
  fontSize: '13px',
  fontFamily: 'Georgia, serif',
  outline: 'none',
  width: '100%',
  transition: 'all 0.3s',
};

const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  fontWeight: 800,
  letterSpacing: '3px',
  textTransform: 'uppercase' as const,
  color: 'rgba(245,240,227,0.4)',
  marginBottom: '8px',
  display: 'block',
  fontFamily: 'Arial Black, Arial, sans-serif',
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', businessName: '', email: '', service: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '48px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '16px', color: '#C0392B' }}>✓</div>
        <h3 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', color: '#C0392B', fontFamily: 'Oswald, Arial Black, sans-serif' }}>
          Submission Received
        </h3>
        <p style={{ fontSize: '13px', color: 'rgba(245,240,227,0.5)', lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>
          We've received your info and will reach out to{' '}
          <strong style={{ color: '#F5F0E3' }}>{form.email}</strong> within 24 hours to schedule your free discovery call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="form-name-grid" style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input style={inputStyle} value={form.firstName} onChange={set('firstName')} placeholder="John" required />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input style={inputStyle} value={form.lastName} onChange={set('lastName')} placeholder="Smith" required />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Business Name</label>
        <input style={inputStyle} value={form.businessName} onChange={set('businessName')} placeholder="Your Business LLC" required />
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="john@yourbusiness.com" required />
      </div>

      <div>
        <label style={labelStyle}>What do you need help with?</label>
        <select
          style={{ ...inputStyle, color: form.service ? '#F5F0E3' : 'rgba(245,240,227,0.35)', cursor: 'pointer', appearance: 'none' }}
          value={form.service}
          onChange={set('service')}
          required
        >
          <option value="" disabled>Select a service</option>
          {SERVICES.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Tell us about your business</label>
        <textarea
          style={{ ...inputStyle, height: '110px', resize: 'none' }}
          value={form.message}
          onChange={set('message')}
          placeholder="What you do, where you're at, what you're trying to achieve..."
          required
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: '11px', color: '#C0392B', fontFamily: 'Georgia, serif' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="form-submit-btn"
        style={{
          width: '100%',
          padding: '18px',
          background: status === 'loading' ? 'rgba(192,57,43,0.6)' : '#C0392B',
          color: '#fff',
          fontSize: '11px',
          fontWeight: 900,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          fontFamily: 'Arial Black, Arial, sans-serif',
          boxShadow: '0 0 30px rgba(192,57,43,0.35)',
          marginTop: '4px',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Submit & Book a Discovery Call →'}
      </button>

      <p style={{ fontSize: '9px', color: 'rgba(245,240,227,0.2)', letterSpacing: '1px', lineHeight: 1.6, textAlign: 'center', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
        We'll review your submission and reach out within 24 hours to schedule your free call.
      </p>
    </form>
  );
}
