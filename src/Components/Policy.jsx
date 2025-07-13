import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Privacy Policy</h1>
        <p style={lastUpdatedStyle}>Last updated: June 1, 2025</p>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>1. Information We Collect</h2>
          <p style={textStyle}>
            We collect your location data to mark attendance accurately. We may also collect login information and device details to ensure secure access.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>2. How We Use Your Data</h2>
          <p style={textStyle}>
            Location data is used solely to verify attendance within company-defined geofences. We do not sell or share your personal data with third parties.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>3. Data Storage and Security</h2>
          <p style={textStyle}>
            Your data is stored securely and encrypted where applicable. We implement industry-standard safeguards to protect your information.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>4. Your Rights</h2>
          <p style={textStyle}>
            You have the right to access, update, or delete your data by contacting us. We will process such requests in accordance with applicable laws.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>5. Contact Us</h2>
          <p style={textStyle}>
            If you have any questions, email us at <a href="mailto:privacy@geoattend.com" style={linkStyle}>privacy@geoattend.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

const pageStyle = {
  background: 'linear-gradient(135deg, #122C34 25%, #cdc5b4f2 100%)',
  minHeight: '100vh',
  padding: '40px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  boxSizing: 'border-box',
};

const cardStyle = {
  backgroundColor: 'var(--white, #ffffff)',
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '800px',
  width: 'calc(100% - 80px)',
  maxHeight: 'calc(100vh - 80px)',
  margin: '0 auto',
  boxShadow: '0 20px 25px -5px rgba(18, 44, 52, 0.1), 0 10px 10px -5px rgba(18, 44, 52, 0.04)',
  border: '1px solid rgba(18, 44, 52, 0.08)',
  position: 'relative',
  overflow: 'auto',
  boxSizing: 'border-box',
};

const titleStyle = {
  fontSize: '36px',
  fontWeight: '700',
  marginBottom: '8px',
  color: 'var(--primary-dark-teal, #122C34)',
  textAlign: 'center',
  letterSpacing: '-0.025em',
};

const lastUpdatedStyle = {
  color: 'var(--text-gray, #6B7280)',
  textAlign: 'center',
  marginBottom: '40px',
  fontSize: '14px',
  fontWeight: '500',
};

const sectionStyle = {
  marginBottom: '32px',
  paddingLeft: '8px',
  borderLeft: '3px solid var(--primary-green, #4FB477)',
  paddingBottom: '8px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '12px',
  color: 'var(--primary-blue, #2A4494)',
  marginLeft: '12px',
};

const textStyle = {
  color: 'var(--text-gray, #6B7280)',
  lineHeight: '1.6',
  fontSize: '16px',
  marginLeft: '12px',
  marginBottom: '0',
};

const linkStyle = {
  color: 'var(--primary-blue, #2A4494)',
  textDecoration: 'none',
  fontWeight: '500',
  borderBottom: '1px solid transparent',
  transition: 'border-bottom-color 0.2s ease',
};