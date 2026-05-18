import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { FlatListItem, Section } from '../components/EmojiPicker/types';
export interface UseEmojiPickerRendererProps {
    onEmojiSelect: (emoji: string) => void;
    getModifiedEmoji: (emoji: string) => string;
    updateRecentEmojis: (emoji: string) => void;
    selectedSkinTone: string;
    emojiSections: Section[];
    searchQuery: string;
    columns?: number;
    showSearchBar?: boolean;
    categoryHeaderStyle?: TextStyle;
    categoryContainerStyle?: ViewStyle;
    emojiButtonStyle?: ViewStyle;
    noResultsStyle?: TextStyle;
    categoryNameMap?: Record<string, string>;
    renderCategoryHeader?: (props: {
        category: string;
        displayName: string;
    }) => React.ReactNode;
}
export declare function useEmojiPickerRenderer({ onEmojiSelect, getModifiedEmoji, updateRecentEmojis, selectedSkinTone, emojiSections, searchQuery, showSearchBar, columns, categoryHeaderStyle, categoryContainerStyle, emojiButtonStyle, noResultsStyle, categoryNameMap, renderCategoryHeader, }: UseEmojiPickerRendererProps): {
    renderItem: ({ item }: {
        item: FlatListItem;
    }) => React.JSX.Element;
    renderEmptyComponent: () => React.JSX.Element | null;
};
//# sourceMappingURL=useEmojiPickerRenderer.d.ts.map