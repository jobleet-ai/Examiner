import React from "react";

const Home = () => {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            AI Exam Platform That
            <span className="text-indigo-600"> Understands </span>
            Your Learning
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Verify student knowledge, identify weaknesses, and generate
            personalized tests to help students improve continuously —
            across every class, board, and competitive exam.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
              Start Free Assessment
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
              For Teachers
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            How the AI Learning Loop Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-12 text-center">
            {[
              { title: "Take Test", desc: "Topic-wise or full syllabus exams" },
              { title: "AI Analysis", desc: "Detects strengths & weaknesses" },
              { title: "Adaptive Test", desc: "AI generates tests for weak areas" },
              { title: "Improve", desc: "Track progress & mastery" }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-indigo-600 text-xl font-bold mb-2">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Built to Improve, Not Just Test
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              "AI-powered weakness detection",
              "Personalized adaptive exams",
              "Topic & concept-level analysis",
              "Supports all boards & exams",
              "Student performance analytics",
              "Teacher insights dashboard"
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <h3 className="font-semibold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Who Is This For?</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Students",
                desc: "Identify weaknesses and improve with smart tests"
              },
              {
                title: "Teachers",
                desc: "Create exams and track real learning gaps"
              },
              {
                title: "Institutes",
                desc: "Deliver personalized preparation at scale"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">
          Start Improving Learning with AI
        </h2>
        <p className="text-gray-600 mt-4">
          Move beyond marks. Focus on mastery.
        </p>
        <button className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Get Started
        </button>
      </section>

    </div>
  );
};

export default Home;
