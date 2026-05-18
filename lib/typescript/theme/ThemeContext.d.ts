/**
 * Theme context for the emoji picker
 */
import React from 'react';
import { EmojiPickerTheme, PartialTheme } from './types';
interface ThemeContextValue {
    theme: EmojiPickerTheme;
    isDarkMode: boolean;
}
interface EmojiPickerThemeProviderProps {
    children: React.ReactNode;
    theme?: PartialTheme;
    darkMode?: boolean;
}
/**
 * Theme provider component
 */
export declare function EmojiPickerThemeProvider({ children, theme: customTheme, darkMode, }: EmojiPickerThemeProviderProps): React.JSX.Element;
/**
 * Hook to access theme in components
 */
export declare function useEmojiPickerTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map