import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import themeModes, { defaultThemeMode } from './theme';

const STORAGE_KEY = 'joblient-theme-mode';

const ThemeContext = createContext({
  theme: themeModes[defaultThemeMode],
  mode: defaultThemeMode,
  setMode: () => {},
  toggleMode: () => {},
});

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const mergeDeep = (base = {}, override = {}) => {
  const result = Array.isArray(base) ? [...base] : { ...base };

  if (!isPlainObject(override)) {
    return result;
  }

  Object.entries(override).forEach(([key, value]) => {
    if (isPlainObject(value)) {
      result[key] = mergeDeep(base?.[key], value);
    } else {
      result[key] = value;
    }
  });

  return result;
};

const toCssVarName = (pathSegments) =>
  `--${pathSegments
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase()
    )
    .join('-')}`;

const setCSSVariables = (obj, path = []) => {
  if (!isPlainObject(obj)) return;

  Object.entries(obj).forEach(([key, value]) => {
    const nextPath = [...path, key];

    if (isPlainObject(value)) {
      setCSSVariables(value, nextPath);
    } else if (typeof value === 'string' || typeof value === 'number') {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty(
          toCssVarName(nextPath),
          value
        );
      }
    }
  });
};

const resolveMode = (mode) =>
  mode && themeModes[mode] ? mode : defaultThemeMode;

const readStoredMode = () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && themeModes[stored]) return stored;
  if (window.matchMedia?.('(prefers-color-scheme: dark)')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : null;
  }
  return null;
};

export const ThemeProvider = ({ children, value, initialMode }) => {
  const [mode, setModeState] = useState(() => resolveMode(initialMode) ?? readStoredMode() ?? defaultThemeMode);

  const safeSetMode = useCallback((nextMode) => {
    setModeState((prev) => {
      if (typeof nextMode === 'function') {
        return resolveMode(nextMode(prev));
      }
      return resolveMode(nextMode);
    });
  }, []);

  const toggleMode = useCallback(() => {
    safeSetMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [safeSetMode]);

  const baseTheme = useMemo(
    () => themeModes[mode] ?? themeModes[defaultThemeMode],
    [mode]
  );

  const mergedTheme = useMemo(
    () => mergeDeep(baseTheme, value || {}),
    [baseTheme, value]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = `joblient-${mode}`;
    document.documentElement.classList.toggle('dark', mode === 'dark');
    setCSSVariables(mergedTheme);
  }, [mergedTheme, mode]);

  const contextValue = useMemo(
    () => ({
      theme: mergedTheme,
      mode,
      setMode: safeSetMode,
      toggleMode,
    }),
    [mergedTheme, mode, safeSetMode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export const useTheme = () => useThemeContext().theme;

export const useThemeMode = () => {
  const { mode, setMode, toggleMode } = useThemeContext();
  return { mode, setMode, toggleMode };
};

export default ThemeProvider;

