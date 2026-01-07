// --- New Terms of Service Component ---
const TermsService= () => {
    return (
        <div className="space-y-8 pt-8">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-blue-700">📄 Joblient Terms of Service</h1>
                <p className="text-sm text-gray-500 mt-2">Effective Date: November 2, 2025</p>
            </header>

            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 text-gray-700 leading-relaxed">
                
                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">1. Acceptance of Terms</h2>
                    <p>By accessing or using the Joblient platform (the \"Service\"), you agree to be bound by these Terms of Service (\"Terms\"). If you disagree with any part of the terms, then you may not access the Service.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">2. User Accounts</h2>
                    <p>When you create an account with us, you guarantee that you are above the age of 18, and that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">3. Content and Conduct</h2>
                    <h3 className='text-xl font-semibold mt-4'>A. Job Seekers</h3>
                    <p>You are responsible for all content (resumes, application materials, profile data) that you upload, post, or otherwise submit to the Service. You agree not to upload misleading, offensive, or infringing material.</p>

                    <h3 className='text-xl font-semibold mt-4'>B. Employers</h3>
                    <p>Employers agree that all job postings must be legitimate, legal, and accurately describe the available employment opportunity. Joblient reserves the right to remove any posting that violates these Terms or our community standards.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">4. Termination</h2>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">5. Governing Law</h2>
                    <p>These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.</p>
                </section>

                <section className='space-y-3'>
                    <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2">6. Contact Information</h2>
                    <p>For any questions regarding these Terms of Service, please contact us at:</p>
                    <ul className='list-none space-y-1 pt-2'>
                        <li><strong>Email:</strong> <a href="mailto:terms@joblient.com" className='text-blue-500 hover:underline'>terms@joblient.com</a></li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default TermsService;