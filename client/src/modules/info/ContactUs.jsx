import React from 'react';

// Placeholder for basic styling. In a real app, this would be imported from a CSS/Styled-Components/Tailwind file.
const containerStyle = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif'
};
const sectionStyle = {
  padding: '20px 0',
  borderBottom: '1px solid #eee'
};
const subHeaderStyle = {
  color: '#007BFF', // Joblient Primary Color
  borderBottom: '2px solid #007BFF',
  paddingBottom: '5px',
  marginBottom: '15px'
};
const contactDetailStyle = {
  marginTop: '10px',
  lineHeight: '1.6'
};

const ContactUs = () => {
  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <header>
        <h1 style={{ textAlign: 'center', color: '#333' }}>📧 Contact Joblient</h1>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1em' }}>
          Whether you're a job seeker looking for support, an employer with a partnership inquiry, or a user with general feedback, we're here to help you connect with your next opportunity.
        </p>
      </header>

      <hr style={{ margin: '30px 0' }} />

      {/* Primary Contact Options Section */}
      <section style={sectionStyle}>
        <h2 style={subHeaderStyle}>🎯 How Can We Help You?</h2>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {/* 1. Job Seekers */}
          <div style={{ flex: '1 1 300px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>1. For Job Seekers</h3>
            <p>If you have questions about your application, account login, or need technical assistance:</p>
            <div style={contactDetailStyle}>
              <p><strong>Self-Help:</strong> <a href="#">Visit our comprehensive FAQ/Help Center</a></p>
              <p><strong>Email Support:</strong> <a href="mailto:support@joblient.com">support@joblient.com</a></p>
              <p style={{ fontSize: '0.9em', color: '#888' }}>*Expected Response Time: 1-2 business days.</p>
            </div>
          </div>

          {/* 2. Employers & Recruiters */}
          <div style={{ flex: '1 1 300px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>2. For Employers & Recruiters</h3>
            <p>For job posting, employer branding, or bulk recruiting solutions:</p>
            <div style={contactDetailStyle}>
              <p><strong>Sales:</strong> <a href="#">Schedule a personalized Demo</a></p>
              <p><strong>Direct Email:</strong> <a href="mailto:employers@joblient.com">employers@joblient.com</a></p>
              {/* <p><strong>Phone:</strong> (555) 555-JOB</p> */}
            </div>
          </div>

          {/* 3. General Inquiries */}
          <div style={{ flex: '1 1 300px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>3. General Inquiries & Feedback</h3>
            <p>For media requests, corporate questions, or general website feedback:</p>
            <div style={contactDetailStyle}>
              <p><strong>Email:</strong> <a href="mailto:info@joblient.com">info@joblient.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ margin: '30px 0' }} />

   
      {/* <section style={{ ...sectionStyle, borderBottom: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
            <h2 style={subHeaderStyle}>📍 Our Global Headquarters</h2>
            <address>
              <strong>Joblient, Inc.</strong><br />
              123 Opportunity Lane, Suite 456<br />
              Tech City, CA 90210<br />
              USA
            </address>
            <p style={{ marginTop: '10px', fontSize: '0.85em', color: '#888' }}>
              *Please use this address for official mail only.
            </p>
          </div>

 
          <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
            <h2 style={subHeaderStyle}>📱 Connect with Us</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="#">LinkedIn</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#">X (formerly Twitter)</a>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <a href="#">Facebook</a>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ContactUs;