// --- New Careers Component ---
const Careers = () => {
    const openRoles = [
        { title: "Senior React Developer", team: "Engineering", location: "Remote (India)", link: "#" },
        // { title: "AI/ML Matching Specialist", team: "Data Science", location: "Tech City, CA", link: "#" },
        { title: "Enterprise Sales Manager", team: "Sales", location: "Bangalore, India", link: "#" },
        { title: "UX/UI Designer", team: "Product", location: "Remote (Flexible)", link: "#" },
    ];

    const culturePoints = [
        { icon: '🌱', title: 'Growth Mindset', description: 'Continuous learning, mentorship, and budget for professional development.' },
        { icon: '🧘‍♀️', title: 'Work-Life Balance', description: 'Flexible hours, generous PTO, and mental wellness programs.' },
        { icon: '💡', title: 'Autonomy & Impact', description: 'Own your projects from concept to deployment and see your work matter.' },
        { icon: '🎉', title: 'Inclusive Community', description: 'Regular team events, diversity initiatives, and employee resource groups.' },
    ];

    return (
        <div className="space-y-12 pt-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-blue-700">Join the Joblient Team</h1>
                <p className="text-xl text-gray-600 mt-2">
                    Build the future of hiring with a team that values innovation and impact.
                </p>
            </header>

            {/* Culture Section */}
            <section className="bg-blue-50 p-8 rounded-xl shadow-inner">
                <h2 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-3 mb-6 text-center">Our Culture</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {culturePoints.map((point, index) => (
                        <div key={index} className="p-5 bg-white rounded-lg shadow-md border-t-4 border-blue-400">
                            <span className="text-3xl block mb-2">{point.icon}</span>
                            <h3 className="text-lg font-semibold text-gray-800">{point.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{point.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Open Roles Section */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-700 border-b-2 border-blue-200 pb-3 mb-6 text-center">Current Opportunities</h2>
                <div className="space-y-4">
                    {openRoles.map((role, index) => (
                        <div key={index} className="flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-green-500">
                            <div className="text-left mb-2 sm:mb-0">
                                <h4 className="text-xl font-semibold text-gray-800">{role.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="font-medium text-blue-600">{role.team}</span> | {role.location}
                                </p>
                            </div>
                            <a 
                                href={role.link} 
                                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full hover:bg-green-600 transition duration-300 flex items-center"
                            >
                                Apply Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="text-center pt-4">
                    <p className="text-gray-600">Don't see a fit? Send us your resume anyway!</p>
                    <a href="mailto:careers@joblient.com" className="text-blue-500 hover:underline font-medium">careers@joblient.com</a>
                </div>
            </section>
        </div>
    );
};

export default Careers;