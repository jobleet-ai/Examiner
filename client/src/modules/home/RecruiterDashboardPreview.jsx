import { Cpu } from "lucide-react";

const RecruiterDashboardPreview = () => {
  const candidates = [
    { name: "Sarah Chen", score: 94, status: "Verified", signals: ["Top 1%", "Anti-Cheat Pass"], color: "from-green-500 to-emerald-600" },
    { name: "Marcus Wright", score: 88, status: "Verified", signals: ["Strong Logic", "Code Integrity"], color: "from-blue-500 to-indigo-600" },
    { name: "Elena Rossi", score: 82, status: "Flagged", signals: ["Tab Switched", "AI Detected"], color: "from-amber-500 to-orange-600" }
  ];

  return (
    <div className="relative group">
      {/* Decorative background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Jobleet AI Recommendation</h4>
            <p className="text-xl font-extrabold text-gray-900">Senior Full-Stack Engineer</p>
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse"></div>
            <div className="h-3 w-3 rounded-full bg-amber-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        <div className="space-y-4">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${candidate.color} flex items-center justify-center text-white font-bold`}>
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{candidate.name}</div>
                  <div className="flex gap-2 mt-1">
                    {candidate.signals.map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-white border border-gray-200 rounded-full font-bold text-gray-500 uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-black ${candidate.status === 'Flagged' ? 'text-amber-500' : 'text-indigo-600'}`}>
                  {candidate.score}%
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {candidate.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Overlay */}
        <div className="mt-6 p-4 bg-indigo-600 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">Jobleet AI Recommendation</span>
          </div>
          <p className="text-sm font-medium">
            3 candidates meet the 85% validation threshold. 1 candidate flagged for integrity review.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboardPreview;