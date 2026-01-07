
const PrivacyPolicy = () => {
  const companyValues = [
    { icon: '🚀', title: 'Empowerment', description: 'Giving job seekers the tools and confidence to reach their potential.' },
    { icon: '🤝', title: 'Integrity', description: 'Maintaining trust and transparency in all employer-candidate relationships.' },
    { icon: '💡', title: 'Innovation', description: 'Continuously refining our platform to meet the evolving needs of the modern job market.' },
    { icon: '🌍', title: 'Inclusion', description: 'Building a platform that connects talent from all backgrounds with opportunities.' },
  ];
    return (
        <div className="space-y-8 pt-8">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-blue-700">🔒 Joblient Privacy Policy</h1>
                <p className="text-sm text-gray-500 mt-2">Last updated: November 2, 2025</p>
            </header>

            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
                
                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">1. Introduction</h2>
                    <p>This Privacy Policy describes how <strong>Joblient, Inc.</strong> (\"we,\" \"us,\" or \"our\") collects, uses, and shares information about you through our website and application (collectively, the \"Service\"), which is built using the React.js framework. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">2. Information We Collect</h2>
                    <h3 className='text-xl font-semibold mt-4'>A. Information You Provide to Us</h3>
                    <ul className='list-disc pl-6 space-y-1'>
                        <li><strong>Identifiers:</strong> Name, email address, phone number, and password (encrypted).</li>
                        <li><strong>Job Seeker Profile Data:</strong> Resume, work navigate, education, skills, career interests.</li>
                        <li><strong>Employer Data:</strong> Company name, contact person, billing information, and job descriptions.</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4'>B. Information We Collect Automatically (Usage Data)</h3>
                    <ul className='list-disc pl-6 space-y-1'>
                        <li><strong>Technical Data:</strong> IP address, browser type and version, device identifier.</li>
                        <li><strong>Usage Data:</strong> Pages viewed, time spent on pages, referral sources, and the sequence of clicks (user flow).</li>
                        <li><strong>Performance Metrics (React Specific):</strong> Component loading times, interaction latency, and state change events.</li>
                    </ul>

                    <h3 className='text-xl font-semibold mt-4'>C. Cookies and Tracking Technologies</h3>
                    <p>We use Cookies, Web Storage, and similar tracking technologies to track activity on our Service.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">3. How We Use Your Information</h2>
                    <ul className='list-disc pl-6 space-y-1'>
                        <li>To Provide and Maintain the Service: Processing job applications and ensuring account functionality.</li>
                        <li>To Improve the Service: Analyzing usage data to identify bugs and areas for feature enhancement.</li>
                        <li>To Personalize the Experience: Delivering relevant job recommendations to seekers and matching candidates to employers.</li>
                        <li>To Communicate with You: Sending service announcements, technical notices, and security alerts.</li>
                    </ul>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">4. Disclosure of Your Information</h2>
                    <p>We may share your information:</p>
                    <ul className='list-disc pl-6 space-y-1'>
                        <li>With Employers/Job Seekers: When a job seeker applies for a job, their profile is shared.</li>
                        <li>With Service Providers: For hosting, payment processing, and analytics (e.g., Google Analytics).</li>
                        <li>For Legal Reasons: To comply with any court order, law, or legal process.</li>
                    </ul>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">8. Contact Information</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className='list-none space-y-1 pt-2'>
                        <li><strong>Email:</strong> <a href="mailto:privacy@joblient.com" className='text-blue-500 hover:underline'>privacy@joblient.com</a></li>
                        {/* <li><strong>Mail:</strong> Joblient Privacy Officer, 123 Opportunity Lane, Tech City, CA 90210, USA</li> */}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;