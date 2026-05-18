import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Theme context for the emoji picker
 */
import { createContext, useContext, useMemo } from 'react';
import { lightTheme, darkTheme } from './defaultThemes';
const ThemeContext = createContext(undefined);
/**
 * Deep merge helper for theme objects
 */
function mergeTheme(base, override) {
    if (!override)
        return base;
    return {
        colors: Object.assign(Object.assign({}, base.colors), override.colors),
        opacity: Object.assign(Object.assign({}, base.opacity), override.opacity),
    };
}
/**
 * Theme provider component
 */
export function EmojiPickerThemeProvider({ children, theme: customTheme, darkMode = false, }) {
    const theme = useMemo(() => {
        const baseTheme = darkMode ? darkTheme : lightTheme;
        return mergeTheme(baseTheme, customTheme);
    }, [customTheme, darkMode]);
    const value = useMemo(() => ({
        theme,
        isDarkMode: darkMode,
    }), [darkMode, theme]);
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
}
/**
 * Hook to access theme in components
 */
export function useEmojiPickerTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Return default light theme if no provider
        return {
            theme: lightTheme,
            isDarkMode: false,
        };
    }
    return context;
}
//# sourceMappingURL=ThemeContext.js.map