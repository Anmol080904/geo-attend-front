import React from 'react';

export default function TermsOfService() {
  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Terms of Service</h1>
        <p style={lastUpdatedStyle}>Last updated: June 1, 2025</p>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>1. Acceptance of Terms</h2>
          <p style={textStyle}>
            By using our Geo-Location-Based Attendance App, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>2. Use of the Service</h2>
          <p style={textStyle}>
            The app is intended to track employee attendance based on geolocation. You may not misuse the app or attempt to manipulate location data.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>3. User Responsibilities</h2>
          <p style={textStyle}>
            You are responsible for keeping your login credentials secure and for all activity under your account.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>4. Modification of Terms</h2>
          <p style={textStyle}>
            We reserve the right to update these Terms at any time. Continued use of the app means you accept any changes.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={sectionTitleStyle}>5. Contact</h2>
          <p style={textStyle}>
            For any questions, please contact us at <a href="mailto:support@geoattend.com" style={linkStyle}>support@geoattend.com</a>.
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