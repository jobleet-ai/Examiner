import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';

const RecruitmentArchitectureDiagram = () => {
  const [zoom, setZoom] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const theme = useTheme();
  const palette = {
    screen: theme.background.gradient.blueToWhite,
    headerBg: theme.card.background,
    headerBorder: theme.border.light,
    panelBg: theme.card.background,
    candidateShell: theme.background.yellow,
    recruiterShell: theme.background.blue,
    scoringShell: theme.background.secondary,
    infraShell: theme.background.primary,
    uiBlock: theme.badge.yellow.background,
    serviceBlock: theme.background.blue,
    serviceAltBlock: theme.background.primary,
    gatewayBlock: theme.secondary.blue,
    dbBlock: theme.badge.blue.background,
    cacheBlock: theme.badge.yellow.background,
    queueBlock: theme.background.orange,
    highlightBlock: theme.background.orange,
    stroke: theme.border.medium,
    text: theme.text.primary,
    caption: theme.text.secondary,
    legendBg: theme.card.background,
    sidebarBg: theme.card.background
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  const componentInfo = {
    'Candidate Flow': {
      description: 'End-to-end flow for candidates applying and taking tests',
      components: [
        'Candidate Portal - User interface for job applications',
        'Job Service - Manages job postings and applications',
        'Resume Service - Handles resume uploads and parsing',
        'Test Orchestrator - Manages test sessions and timing'
      ]
    },
    'Recruiter Flow': {
      description: 'Dashboard and analytics for recruiters',
      components: [
        'Recruiter Dashboard - Admin interface for managing recruitment',
        'Analytics Service - Provides insights and reporting'
      ]
    },
    'Scoring and Queue': {
      description: 'Asynchronous processing of test submissions',
      components: [
        'Submission Queue - Message broker for test submissions',
        'Scoring Workers - Processes and scores test results'
      ]
    },
    'Infrastructure': {
      description: 'Cross-cutting concerns for security and monitoring',
      components: [
        'API Gateway - Single entry point for all requests',
        'Auth Service - Handles authentication and authorization',
        'Monitoring - Observability and alerting'
      ]
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col"
      style={{ background: palette.screen }}
    >
      {/* Header */}
      <div
        className="shadow-sm border-b px-6 py-4"
        style={{
          backgroundColor: palette.headerBg,
          borderColor: palette.headerBorder
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: palette.text }}>
              Recruitment System Architecture
            </h1>
            <p className="text-sm mt-1" style={{ color: palette.caption }}>
              End-to-end platform for candidate assessment and recruitment
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: theme.background.blue,
                color: theme.primary.blue
              }}
            >
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">Info</span>
            </button>
            <div
              className="flex items-center gap-2 rounded-lg p-1"
              style={{ backgroundColor: theme.background.secondary }}
            >
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-3 text-sm font-medium" style={{ color: palette.text }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 hover:bg-white rounded transition-colors ml-1"
                title="Reset Zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Diagram Area */}
        <div className="flex-1 overflow-auto p-6">
          <div 
            className="inline-block min-w-full"
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              transition: 'transform 0.2s ease'
            }}
          >
            <svg
              width="1400"
              height="1000"
              viewBox="0 0 1400 1000"
              className="rounded-lg shadow-lg"
              style={{ backgroundColor: palette.panelBg }}
            >
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill={palette.stroke} />
                </marker>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feOffset dx="2" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Candidate Flow Section */}
              <g id="candidate-flow">
                <rect
                  x="50"
                  y="50"
                  width="600"
                  height="400"
                  fill={palette.candidateShell}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="8"
                  filter="url(#shadow)"
                />
                <text x="70" y="80" fontSize="18" fontWeight="bold" fill={palette.text}>
                  Candidate Flow
                </text>
                
                {/* Candidate Portal */}
                <rect
                  x="80"
                  y="110"
                  width="160"
                  height="60"
                  fill={palette.uiBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="160" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Candidate Portal
                </text>
                
                {/* API Gateway */}
                <rect
                  x="340"
                  y="110"
                  width="140"
                  height="60"
                  fill={palette.gatewayBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="410" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  API Gateway
                </text>
                
                {/* Job Service */}
                <rect
                  x="340"
                  y="210"
                  width="140"
                  height="60"
                  fill={palette.serviceBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="410" y="245" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Job Service
                </text>
                
                {/* PostgreSQL */}
                <ellipse
                  cx="570"
                  cy="240"
                  rx="70"
                  ry="30"
                  fill={palette.dbBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                />
                <text x="570" y="245" fontSize="12" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  PostgreSQL
                </text>
                <text x="570" y="260" fontSize="10" textAnchor="middle" fill={palette.caption}>
                  Jobs DB
                </text>
                
                {/* Resume Service */}
                <rect
                  x="80"
                  y="210"
                  width="140"
                  height="60"
                  fill={palette.serviceBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="150" y="245" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Resume Service
                </text>
                
                {/* S3 Storage */}
                <ellipse
                  cx="150"
                  cy="320"
                  rx="70"
                  ry="30"
                  fill={palette.cacheBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                />
                <text x="150" y="325" fontSize="12" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  S3 Storage
                </text>
                
                {/* Resume Parser */}
                <rect
                  x="280"
                  y="290"
                  width="140"
                  height="60"
                  fill={palette.serviceBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="350" y="325" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Resume Parser
                </text>
                
                {/* Parsed Resume DB */}
                <ellipse
                  cx="520"
                  cy="320"
                  rx="80"
                  ry="30"
                  fill={palette.dbBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                />
                <text x="520" y="320" fontSize="11" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Parsed Resume
                </text>
                <text x="520" y="335" fontSize="10" textAnchor="middle" fill={palette.caption}>
                  Metadata DB
                </text>
                
                {/* Test Orchestrator */}
                <rect
                  x="80"
                  y="370"
                  width="160"
                  height="60"
                  fill={palette.serviceAltBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="160" y="405" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Test Orchestrator
                </text>
                
                {/* Redis */}
                <ellipse
                  cx="330"
                  cy="400"
                  rx="80"
                  ry="30"
                  fill={palette.cacheBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                />
                <text x="330" y="400" fontSize="11" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Redis
                </text>
                <text x="330" y="415" fontSize="10" textAnchor="middle" fill={palette.caption}>
                  Session + TTL
                </text>
                
                {/* Test Bank Service */}
                <rect
                  x="460"
                  y="370"
                  width="150"
                  height="60"
                  fill={palette.serviceBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                  rx="6"
                />
                <text x="535" y="405" fontSize="14" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Test Bank Service
                </text>
                
                {/* Questions DB */}
                <ellipse
                  cx="535"
                  cy="480"
                  rx="70"
                  ry="30"
                  fill={palette.dbBlock}
                  stroke={palette.stroke}
                  strokeWidth="2"
                />
                <text x="535" y="485" fontSize="12" fontWeight="600" textAnchor="middle" fill={palette.text}>
                  Questions DB
                </text>
                
                {/* Arrows for Candidate Flow */}
                <line x1="240" y1="140" x2="340" y2="140" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="290" y="130" fontSize="10" fill="#666">Apply for Job</text>
                
                <line x1="410" y1="170" x2="410" y2="210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="480" y1="240" x2="500" y2="240" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="160" y1="170" x2="160" y2="210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="170" y="195" fontSize="10" fill="#666">Upload Resume</text>
                
                <line x1="150" y1="270" x2="150" y2="290" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="220" y1="240" x2="280" y2="310" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="420" y1="320" x2="440" y2="320" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="160" y1="170" x2="160" y2="370" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="170" y="270" fontSize="10" fill="#666">Start Test</text>
                
                <line x1="240" y1="400" x2="250" y2="400" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="240" y1="400" x2="460" y2="400" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="535" y1="430" x2="535" y2="450" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              </g>

              {/* Recruiter Flow Section */}
              <g id="recruiter-flow">
                <rect x="700" y="50" width="450" height="250" fill="#e8f5f7" stroke="#b2dfdb" strokeWidth="2" rx="8" filter="url(#shadow)"/>
                <text x="720" y="80" fontSize="18" fontWeight="bold" fill="#333">Recruiter Flow</text>
                
                {/* Recruiter Dashboard */}
                <rect x="730" y="110" width="160" height="60" fill="#e0f7fa" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="810" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="#333">Recruiter Dashboard</text>
                
                {/* Analytics Service */}
                <rect x="730" y="210" width="160" height="60" fill="#e3f2fd" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="810" y="245" fontSize="14" fontWeight="600" textAnchor="middle" fill="#333">Analytics Service</text>
                
                {/* Analytics Store */}
                <ellipse cx="1020" cy="240" rx="90" ry="35" fill="#e8f5e9" stroke="#333" strokeWidth="2"/>
                <text x="1020" y="235" fontSize="11" fontWeight="600" textAnchor="middle" fill="#333">Analytics Store</text>
                <text x="1020" y="250" fontSize="9" textAnchor="middle" fill="#666">ClickHouse/BigQuery</text>
                
                {/* Arrows */}
                <line x1="810" y1="110" x2="410" y2="150" stroke="#333" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                
                <line x1="810" y1="170" x2="810" y2="210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="820" y="195" fontSize="10" fill="#666">View Applicants</text>
                
                <line x1="890" y1="240" x2="930" y2="240" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              </g>

              {/* Scoring and Queue Section */}
              <g id="scoring-queue">
                <rect x="700" y="350" width="450" height="250" fill="#f5f5f5" stroke="#ccc" strokeWidth="2" rx="8" filter="url(#shadow)"/>
                <text x="720" y="380" fontSize="18" fontWeight="bold" fill="#333">Scoring and Queue</text>
                
                {/* Submission Queue */}
                <rect x="730" y="410" width="180" height="60" fill="#fff3e0" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="820" y="435" fontSize="13" fontWeight="600" textAnchor="middle" fill="#333">Submission Queue</text>
                <text x="820" y="455" fontSize="10" textAnchor="middle" fill="#666">Kafka/RabbitMQ</text>
                
                {/* Scoring Workers */}
                <rect x="730" y="510" width="160" height="60" fill="#f8f9fa" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="810" y="545" fontSize="14" fontWeight="600" textAnchor="middle" fill="#333">Scoring Workers</text>
                
                {/* Results DB */}
                <ellipse cx="1000" cy="540" rx="70" ry="30" fill="#e8f5e9" stroke="#333" strokeWidth="2"/>
                <text x="1000" y="545" fontSize="12" fontWeight="600" textAnchor="middle" fill="#333">Results DB</text>
                
                {/* Arrows */}
                <line x1="160" y1="430" x2="730" y2="440" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="820" y1="470" x2="820" y2="510" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="890" y1="540" x2="930" y2="540" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                <line x1="810" y1="510" x2="810" y2="270" stroke="#333" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
              </g>

              {/* Infrastructure Section */}
              <g id="infrastructure">
                <rect x="50" y="650" width="600" height="300" fill="#fafafa" stroke="#ddd" strokeWidth="2" rx="8" filter="url(#shadow)"/>
                <text x="70" y="680" fontSize="18" fontWeight="bold" fill="#333">Infrastructure & Security</text>
                
                {/* Auth Service */}
                <rect x="80" y="710" width="160" height="60" fill="#e8eaf6" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="160" y="735" fontSize="13" fontWeight="600" textAnchor="middle" fill="#333">Auth Service</text>
                <text x="160" y="755" fontSize="10" textAnchor="middle" fill="#666">JWT/RBAC</text>
                
                {/* Monitoring */}
                <rect x="280" y="710" width="160" height="60" fill="#e8f5e9" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="360" y="735" fontSize="13" fontWeight="600" textAnchor="middle" fill="#333">Monitoring</text>
                <text x="360" y="755" fontSize="10" textAnchor="middle" fill="#666">+ Logging</text>
                
                {/* Alerting */}
                <rect x="280" y="810" width="160" height="60" fill="#fff3e0" stroke="#333" strokeWidth="2" rx="6"/>
                <text x="360" y="835" fontSize="13" fontWeight="600" textAnchor="middle" fill="#333">Alerting/Tracing</text>
                
                {/* Arrows */}
                <line x1="410" y1="170" x2="160" y2="710" stroke="#333" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                
                <line x1="410" y1="170" x2="360" y2="710" stroke="#333" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                
                <line x1="360" y1="770" x2="360" y2="810" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              </g>

              {/* Legend */}
              <g id="legend">
                <text x="800" y="700" fontSize="16" fontWeight="bold" fill="#333">Legend</text>
                <rect x="800" y="720" width="40" height="20" fill="#fef6e4" stroke="#333" strokeWidth="1" rx="3"/>
                <text x="850" y="735" fontSize="12" fill="#666">User Interface</text>
                
                <rect x="800" y="750" width="40" height="20" fill="#e3f2fd" stroke="#333" strokeWidth="1" rx="3"/>
                <text x="850" y="765" fontSize="12" fill="#666">Services</text>
                
                <ellipse cx="820" cy="790" rx="20" ry="10" fill="#e8f5e9" stroke="#333" strokeWidth="1"/>
                <text x="850" y="795" fontSize="12" fill="#666">Databases</text>
                
                <rect x="800" y="810" width="40" height="20" fill="#d1e7ff" stroke="#333" strokeWidth="1" rx="3"/>
                <text x="850" y="825" fontSize="12" fill="#666">Gateway</text>
                
                <line x1="800" y1="845" x2="840" y2="845" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <text x="850" y="850" fontSize="12" fill="#666">Data Flow</text>
                
                <line x1="800" y1="870" x2="840" y2="870" stroke="#333" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                <text x="850" y="875" fontSize="12" fill="#666">Reference</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Info Sidebar */}
        {showInfo && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">System Components</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {Object.entries(componentInfo).map(([section, info]) => (
              <div key={section} className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{section}</h3>
                <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                <ul className="space-y-2">
                  {info.components.map((component, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{component}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Architecture Highlights</h3>
              <ul className="space-y-2 text-xs text-blue-800">
                <li>• Microservices architecture</li>
                <li>• Event-driven processing</li>
                <li>• Scalable worker pools</li>
                <li>• Real-time session management</li>
                <li>• Comprehensive analytics</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentArchitectureDiagram;