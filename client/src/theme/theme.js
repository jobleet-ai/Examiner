const baseTokens = {
  primary: {
    blue: '#2563EB',
    teal: '#14B8A6',
    yellow: '#FACC15',
    orange: '#F97316',
  },
  secondary: {
    purple: '#9333EA',
    blue: '#3B82F6',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  gradients: {
    primary: 'linear-gradient(to right, #2563EB, #14B8A6)',
    yellowButton: 'linear-gradient(to right, #FACC15, #EAB308)',
    yellowOrangeButton: 'linear-gradient(to right, #FACC15, #F97316)',
    blueBox: 'linear-gradient(to bottom right, #3B82F6, #9333EA)',
    purpleBox: 'linear-gradient(to bottom right, #9333EA, #7C3AED)',
    yellowBox: 'linear-gradient(to bottom right, #FACC15, #F97316)',
    orangeBox: 'linear-gradient(to bottom right, #F97316, #EA580C)',
    yellowOrangeSection: 'linear-gradient(to bottom right, #FBBF24, #F97316)',
    yellowOrangeWarm: 'linear-gradient(to bottom right, #FEF3C7, #FED7AA)',
    text: 'linear-gradient(to right, #2563EB, #14B8A6)',
    textClip: 'linear-gradient(to right, #2563EB, #14B8A6) bg-clip-text text-transparent',
  },
  badge: {
    yellow: {
      background: '#FEF3C7',
      text: '#92400E',
      border: '#FCD34D',
    },
    blue: {
      background: '#DBEAFE',
      text: '#1E40AF',
      border: '#93C5FD',
    },
  },
  hover: {
    yellowButton: '#EAB308',
    border: '#2563EB',
    shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transition: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    transform: 'transform 0.3s ease',
  },
};

const lightTheme = {
  ...baseTokens,
  mode: 'light',
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    blue: '#EFF6FF',
    yellow: '#FFFBEB',
    orange: '#FFF7ED',
    gradient: {
      blueToWhite: 'linear-gradient(to bottom, #EFF6FF, #FFFFFF)',
      yellowToWhite: 'linear-gradient(to bottom, #FFFBEB, #FFFFFF)',
      yellowToOrange: 'linear-gradient(to bottom, #FEF3C7, #FED7AA)',
    },
  },
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#6B7280',
    light: '#9CA3AF',
    white: '#FFFFFF',
  },
  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    yellow: '#FCD34D',
    blue: '#3B82F6',
  },
  card: {
    background: '#FFFFFF',
    border: '#E5E7EB',
    borderHover: '#FACC15',
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    shadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    background: '#111827',
    text: '#D1D5DB',
    textLight: '#9CA3AF',
    border: '#1F2937',
  },
};

const darkTheme = {
  ...baseTokens,
  mode: 'dark',
  background: {
    primary: '#0F172A',
    secondary: '#020617',
    blue: '#172554',
    yellow: '#422006',
    orange: '#431407',
    gradient: {
      blueToWhite: 'linear-gradient(180deg, #1D1F2B 0%, #0F172A 100%)',
      yellowToWhite: 'linear-gradient(180deg, #422006 0%, #1C1917 100%)',
      yellowToOrange: 'linear-gradient(180deg, #713F12 0%, #7C2D12 100%)',
    },
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#E2E8F0',
    tertiary: '#CBD5F5',
    light: '#9CA3AF',
    white: '#FFFFFF',
  },
  border: {
    light: '#1E293B',
    medium: '#334155',
    dark: '#475569',
    yellow: '#FACC15',
    blue: '#60A5FA',
  },
  card: {
    background: '#1E293B',
    border: '#334155',
    borderHover: '#FACC15',
    shadow: '0 10px 25px -5px rgba(15, 23, 42, 0.8)',
    shadowHover: '0 20px 40px -10px rgba(15, 23, 42, 0.9)',
  },
  footer: {
    background: '#020617',
    text: '#CBD5F5',
    textLight: '#94A3B8',
    border: '#0F172A',
  },
  badge: {
    yellow: {
      background: '#713F12',
      text: '#FCD34D',
      border: '#D97706',
    },
    blue: {
      background: '#1E3A8A',
      text: '#BFDBFE',
      border: '#60A5FA',
    },
  },
  hover: {
    yellowButton: '#FACC15',
    border: '#60A5FA',
    shadow: '0 25px 50px -12px rgba(8, 47, 73, 0.6)',
  },
  gradients: {
    ...baseTokens.gradients,
    primary: 'linear-gradient(120deg, #1D4ED8, #0EA5E9)',
    blueBox: 'linear-gradient(135deg, #1D4ED8, #4C1D95)',
    purpleBox: 'linear-gradient(135deg, #7C3AED, #581C87)',
    yellowBox: 'linear-gradient(135deg, #FACC15, #EA580C)',
    orangeBox: 'linear-gradient(135deg, #FB923C, #C2410C)',
    yellowOrangeSection: 'linear-gradient(135deg, #713F12, #7C2D12)',
    yellowOrangeWarm: 'linear-gradient(135deg, #422006, #78350F)',
    text: 'linear-gradient(120deg, #38BDF8, #C084FC)',
    textClip: 'linear-gradient(120deg, #38BDF8, #C084FC) bg-clip-text text-transparent',
  },
};

export const themeModes = {
  light: lightTheme,
  dark: darkTheme,
};

export const defaultThemeMode = 'light';

export const theme = themeModes[defaultThemeMode];

export default themeModes;

