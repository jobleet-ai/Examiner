import React from 'react';
// Assuming a CSS file or styled components for actual styling
// For simplicity, using inline styles here

const containerStyle = {
  maxWidth: '1000px',
  margin: '40px auto',
  padding: '20px',
  fontFamily: 'Roboto, sans-serif',
  color: '#333',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '40px',
  color: '#0056b3',
};

const sectionStyle = {
  marginBottom: '40px',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const valueItemStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  backgroundColor: '#fff',
  textAlign: 'center',
  flex: '1 1 250px', // Responsive sizing
};

const AboutUs = () => {
  const companyValues = [
    { icon: '🚀', title: 'Empowerment', description: 'Giving job seekers the tools and confidence to reach their potential.' },
    { icon: '🤝', title: 'Integrity', description: 'Maintaining trust and transparency in all employer-candidate relationships.' },
    { icon: '💡', title: 'Innovation', description: 'Continuously refining our platform to meet the evolving needs of the modern job market.' },
    { icon: '🌍', title: 'Inclusion', description: 'Building a platform that connects talent from all backgrounds with opportunities.' },
  ];

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>About Jobleet: Your Future Starts Here</h1>
        <p style={{ fontSize: '1.2em', color: '#666' }}>
          We are dedicated to revolutionizing the way talent connects with opportunity.
        </p>
      </header>

      {/* Mission Section */}
      <section style={sectionStyle}>
        <h2 style={{ color: '#007BFF', borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>
          Our Mission
        </h2>
        <p style={{ lineHeight: '1.6', fontSize: '1.1em' }}>
          Jobleet was founded on a simple premise: to <span className='font-bold'>streamline the hiring process</span> by intelligently matching the right candidates with the right roles. We aim to move beyond simple keyword matching, utilizing <span className='font-bold'>advanced AI and behavioral data</span> to ensure long-term, successful employment partnerships. We believe finding a job shouldn't feel like a job itself.
        </p>
      </section>

      {/* Values Section */}
      <section style={sectionStyle}>
        <h2 style={{ color: '#007BFF', borderBottom: '2px solid #007BFF', paddingBottom: '10px' }}>
          Our Core Values
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-around' }}>
          {companyValues.map((value, index) => (
            <div key={index} style={valueItemStyle}>
              <span style={{ fontSize: '2.5em', display: 'block', marginBottom: '10px' }}>{value.icon}</span>
              <h3>{value.title}</h3>
              <p style={{ fontSize: '0.9em', color: '#555' }}>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Jobleet Difference Section */}
      <section className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-3 mb-4">The Joblient Difference</h2>
        <ul className="space-y-3 list-disc pl-5 text-gray-700">
          <li>
            <strong className="text-blue-500">AI-Powered Matching:</strong> We use proprietary algorithms to analyze not just skills, but culture fit and growth potential.
          </li>
          <li>
            <strong className="text-blue-500">Candidate Focus:</strong> Our tools are designed to highlight what makes <em className='italic'>you</em> unique, not just your resume.
          </li>
          <li>
            <strong className="text-blue-500">Employer Efficiency:</strong> We cut down on screening time by delivering only highly relevant candidates.
          </li>
        </ul>
      </section>      

      {/* Call to Action / Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #eee', marginTop: '40px' }}>
        <p>Ready to join the future of recruiting? </p>
        <a href="#" style={{ textDecoration: 'none', backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '10px' }}>
          Explore Open Roles Today
        </a>
      </footer>
    </div>
  );
};

export default AboutUs;