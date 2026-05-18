/**
 * Theme types for the emoji picker
 */
export interface EmojiPickerTheme {
    colors: {
        background: string;
        backgroundSecondary: string;
        modalBackground: string;
        headerBackground: string;
        searchBackground: string;
        tabBackground: string;
        tabActiveBackground: string;
        emojiButtonBackground: string;
        skinToneButtonBorder: string;
        text: string;
        textSecondary: string;
        textTertiary: string;
        headerTitle: string;
        categoryTitle: string;
        placeholder: string;
        noResults: string;
        border: string;
        borderLight: string;
        headerBorder: string;
        tabsBorder: string;
        categoryDivider: string;
        accent: string;
        accentSecondary: string;
        icon: string;
        iconActive: string;
        closeIcon: string;
        modalOverlay: string;
    };
    opacity: {
        modalOverlay: number;
    };
}
export type PartialTheme = {
    colors?: Partial<EmojiPickerTheme['colors']>;
    opacity?: Partial<EmojiPickerTheme['opacity']>;
};
//# sourceMappingURL=types.d.ts.map