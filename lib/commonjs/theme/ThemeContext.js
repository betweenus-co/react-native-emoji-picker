"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiPickerThemeProvider = EmojiPickerThemeProvider;
exports.useEmojiPickerTheme = useEmojiPickerTheme;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Theme context for the emoji picker
 */
const react_1 = require("react");
const defaultThemes_1 = require("./defaultThemes");
const ThemeContext = (0, react_1.createContext)(undefined);
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
function EmojiPickerThemeProvider({ children, theme: customTheme, darkMode = false, }) {
    const theme = (0, react_1.useMemo)(() => {
        const baseTheme = darkMode ? defaultThemes_1.darkTheme : defaultThemes_1.lightTheme;
        return mergeTheme(baseTheme, customTheme);
    }, [customTheme, darkMode]);
    const value = (0, react_1.useMemo)(() => ({
        theme,
        isDarkMode: darkMode,
    }), [darkMode, theme]);
    return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: value, children: children }));
}
/**
 * Hook to access theme in components
 */
function useEmojiPickerTheme() {
    const context = (0, react_1.useContext)(ThemeContext);
    if (context === undefined) {
        // Return default light theme if no provider
        return {
            theme: defaultThemes_1.lightTheme,
            isDarkMode: false,
        };
    }
    return context;
}
//# sourceMappingURL=ThemeContext.js.map