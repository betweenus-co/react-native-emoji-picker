import { EmojiData } from '../types/emoji';
export interface UseEmojiPickerProps {
    emojis: EmojiData[];
    showHistoryTab?: boolean;
    maxRecentEmojis?: number;
    defaultSkinTone?: string;
    columns?: number;
    categoryOrder?: string[];
}
export declare function useEmojiPicker({ emojis, showHistoryTab, maxRecentEmojis, defaultSkinTone, columns, categoryOrder, }: UseEmojiPickerProps): {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string | null;
    setActiveCategory: import("react").Dispatch<import("react").SetStateAction<string | null>>;
    recentEmojis: EmojiData[];
    selectedSkinTone: string;
    setSelectedSkinTone: (tone: string) => void;
    emojiSections: {
        title: string;
        data: EmojiData[];
    }[];
    flatListData: any[];
    updateRecentEmojis: (emoji: string) => void;
    getModifiedEmoji: (emoji: string) => string;
};
//# sourceMappingURL=useEmojiPicker.d.ts.map