import React, { useState } from 'react';

export default function LeaveApplication() {
  const [formData, setFormData] = useState({
    username: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Personal Leave',
    'Emergency Leave',
    'Maternity/Paternity Leave',
    'Bereavement Leave'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await fetch('https://geo-attend-backend.onrender.com/leave-apply/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          start_date: formData.startDate,
          end_date: formData.endDate,
          reason: formData.reason
        }),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          username: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
          emergencyContact: ''
        });
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (err) {
      setError('Failed to submit leave application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={styles.successContainer}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Application Submitted Successfully!</h2>
          <p style={styles.successMessage}>Your leave application has been submitted and is now pending approval. You will receive an email notification once it has been reviewed.</p>
          <button
            onClick={() => setSuccess(false)}
            style={styles.successButton}
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.scrollContainer}>
        <div style={styles.mainCard}>
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.headerIcon}>📋</div>
              <div style={styles.headerText}>
                <h1 style={styles.title}>Employee Leave Application</h1>
                <p style={styles.subtitle}>Submit your leave request for management approval</p>
              </div>
            </div>
          </div>

          <div style={styles.formContainer}>
            {error && (
              <div style={styles.errorAlert}>
                <span style={styles.errorIcon}>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Employee Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Leave Type *</label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    style={styles.select}
                    required
                  >
                    <option value="">Select leave type</option>
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>End Date *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              {formData.startDate && formData.endDate && (
                <div style={styles.daysCounter}>
                  <div style={styles.daysContent}>
                    <span style={styles.daysIcon}>📅</span>
                    <span style={styles.daysText}>
                      Total Leave Duration: <strong>{calculateDays()} day{calculateDays() !== 1 ? 's' : ''}</strong>
                    </span>
                  </div>
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.label}>Reason for Leave *</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="4"
                  style={styles.textarea}
                  placeholder="Please provide a detailed explanation for your leave request..."
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Emergency Contact (Optional)</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Emergency contact number or email"
                />
              </div>

              <div style={styles.submitSection}>
                <button
                  type="submit"
                  disabled={loading}
                  style={loading ? styles.submitButtonLoading : styles.submitButton}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <div style={styles.spinner}></div>
                      Processing Application...
                    </>
                  ) : (
                    <>
                      <span style={styles.buttonIcon}>📤</span>
                      Submit Leave Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div style={styles.infoPanel}>
            <h3 style={styles.infoPanelTitle}>
              <span style={styles.infoPanelIcon}>ℹ️</span>
              Application Guidelines
            </h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <div style={styles.infoItemIcon}>⏰</div>
                <div style={styles.infoItemContent}>
                  <h4 style={styles.infoItemTitle}>Advance Notice</h4>
                  <p style={styles.infoItemText}>Submit applications at least 3 business days in advance</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoItemIcon}>🚨</div>
                <div style={styles.infoItemContent}>
                  <h4 style={styles.infoItemTitle}>Emergency Leave</h4>
                  <p style={styles.infoItemText}>Can be submitted retrospectively with proper documentation</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoItemIcon}>📧</div>
                <div style={styles.infoItemContent}>
                  <h4 style={styles.infoItemTitle}>Notifications</h4>
                  <p style={styles.infoItemText}>Email updates will be sent for approval status changes</p>
                </div>
              </div>
              <div style={styles.infoItem}>
                <div style={styles.infoItemIcon}>🏢</div>
                <div style={styles.infoItemContent}>
                  <h4 style={styles.infoItemTitle}>Support</h4>
                  <p style={styles.infoItemText}>Contact HR department for any application queries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, #4fb477 0%, #3b5b9b 100%)`,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '0',
    margin: '0'
  },
  scrollContainer: {
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '20px',
    boxSizing: 'border-box'
  },
  mainCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    maxWidth: '900px',
    margin: '0 auto',
    overflow: 'hidden',
    minHeight: 'fit-content'
  },
  header: {
    background: `linear-gradient(135deg, #122C34 0%, #2A4494 100%)`,
    padding: '30px 40px',
    color: 'white'
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  headerIcon: {
    fontSize: '48px',
    opacity: '0.9'
  },
  headerText: {
    flex: 1
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '16px',
    margin: '0',
    opacity: '0.85',
    fontWeight: '400'
  },
  formContainer: {
    padding: '40px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#122C34',
    paddingLeft: '4px'
  },
   input: {
    padding: '14px 16px',
    border: `2px solid #EEE0CB`,
    borderRadius: '10px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#fafafa',
    color: '#122C34',
    '::placeholder': {
      color: '#6B7280', // grey placeholder
      opacity: 1,
    },
  },
  select: {
    padding: '14px 16px',
    border: `2px solid #EEE0CB`,
    borderRadius: '10px',
    fontSize: '14px',
    backgroundColor: '#fafafa',
    transition: 'all 0.3s ease',
    outline: 'none',
    color: '#122C34',
    '::placeholder': {
      color: '#6B7280', // grey placeholder
      opacity: 1,
    },
  },
   textarea: {
    padding: '14px 16px',
    border: `2px solid #EEE0CB`,
    borderRadius: '10px',
    fontSize: '14px',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#fafafa',
    fontFamily: 'inherit',
    color: '#122C34',
    '::placeholder': {
      color: '#6B7280', // grey placeholder
      opacity: 1,
    },
  },
  daysCounter: {
    background: `linear-gradient(135deg, #4FB477 10%, rgba(79, 180, 119, 0.1) 90%)`,
    border: `2px solid #4FB477`,
    padding: '16px 20px',
    borderRadius: '12px',
    margin: '5px 0'
  },
  daysContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  daysIcon: {
    fontSize: '20px'
  },
  daysText: {
    fontSize: '16px',
    color: '#122C34',
    fontWeight: '500'
  },
  submitSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px'
  },
  submitButton: {
    background: `linear-gradient(135deg, #2A4494 0%, #122C34 100%)`,
    color: 'white',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    minWidth: '240px',
    boxShadow: '0 6px 16px rgba(42, 68, 148, 0.3)'
  },
  submitButtonLoading: {
    background: '#6B7280',
    color: 'white',
    border: 'none',
    padding: '16px 40px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'not-allowed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    minWidth: '240px'
  },
  buttonIcon: {
    fontSize: '18px'
  },
  spinner: {
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    animation: 'spin 1s linear infinite'
  },
  infoPanel: {
    backgroundColor: '#EEE0CB',
    padding: '30px 40px',
    borderTop: `3px solid #4FB477`
  },
  infoPanelTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#122C34',
    margin: '0 0 25px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  infoPanelIcon: {
    fontSize: '24px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)'
  },
  infoItemIcon: {
    fontSize: '24px',
    flexShrink: 0
  },
  infoItemContent: {
    flex: 1
  },
  infoItemTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#122C34',
    margin: '0 0 6px 0'
  },
  infoItemText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0',
    lineHeight: '1.4'
  },
  errorAlert: {
    backgroundColor: '#fff5f5',
    border: '2px solid #fed7d7',
    color: '#e53e3e',
    padding: '16px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  errorIcon: {
    fontSize: '18px'
  },
  successContainer: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, #4FB477 0%, #EEE0CB 100%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  successCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    padding: '60px 40px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center'
  },
  successIcon: {
    fontSize: '64px',
    color: '#4FB477',
    marginBottom: '24px',
    display: 'block'
  },
  successTitle: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#122C34',
    margin: '0 0 16px 0'
  },
  successMessage: {
    fontSize: '16px',
    color: '#6B7280',
    margin: '0 0 32px 0',
    lineHeight: '1.5'
  },
  successButton: {
    background: `linear-gradient(135deg, #4FB477 0%, #2A4494 100%)`,
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 16px rgba(79, 180, 119, 0.3)'
  }
};