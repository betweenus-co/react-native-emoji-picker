import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEmojiPickerTheme } from '../theme';
import { styles } from '../components/EmojiPicker/styles';
export function useEmojiPickerRenderer({ onEmojiSelect, getModifiedEmoji, updateRecentEmojis, selectedSkinTone, emojiSections, searchQuery, showSearchBar = true, columns = 6, categoryHeaderStyle, categoryContainerStyle, emojiButtonStyle, noResultsStyle, categoryNameMap, renderCategoryHeader, }) {
    const { theme } = useEmojiPickerTheme();
    const CATEGORY_MARGIN_V = 8;
    const CATEGORY_PADDING_H = 12;
    const EMOJI_BUTTON_PADDING = 4;
    const EMOJI_GRID_PADDING_H = 4;
    const NO_RESULTS_PADDING = 30;
    const NO_RESULTS_FONT_SIZE = 16;
    const themedStyles = useMemo(() => ({
        categoryTitle: theme.colors.categoryTitle,
        categoryDivider: theme.colors.categoryDivider,
        noResults: theme.colors.noResults,
        emojiButtonBackground: theme.colors.emojiButtonBackground,
    }), [theme]);
    const isSearchMode = !!searchQuery && showSearchBar;
    const handleEmojiSelect = useCallback((emoji) => {
        const finalEmoji = getModifiedEmoji(emoji);
        updateRecentEmojis(emoji);
        onEmojiSelect(finalEmoji);
    }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);
    const renderItem = useCallback(({ item }) => {
        if (item.type === 'header') {
            const titleStyle = [
                styles.categoryTitle,
                {
                    color: themedStyles.categoryTitle,
                    borderBottomColor: themedStyles.categoryDivider,
                },
                categoryHeaderStyle,
            ];
            const displayName = (categoryNameMap === null || categoryNameMap === void 0 ? void 0 : categoryNameMap[item.category]) || item.category;
            if (renderCategoryHeader) {
                return (_jsx(View, { style: [
                        styles.categoryContainer,
                        { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
                        categoryContainerStyle,
                    ], children: renderCategoryHeader({ category: item.category, displayName }) }));
            }
            return (_jsx(View, { style: [
                    styles.categoryContainer,
                    { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
                    categoryContainerStyle,
                ], children: _jsx(Text, { style: titleStyle, children: displayName }) }));
        }
        const dynamicFontSize = Math.min(40, Math.max(16, 28 * (6 / columns)));
        return (_jsx(View, { style: [styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }], children: item.emojis.map((emoji, index) => {
                const displayEmoji = (emoji.skin_tones && selectedSkinTone)
                    ? emoji.emoji + selectedSkinTone
                    : emoji.emoji;
                return (_jsx(TouchableOpacity, { style: [
                        styles.emojiButton,
                        {
                            width: `${100 / columns}%`,
                            padding: EMOJI_BUTTON_PADDING,
                            backgroundColor: themedStyles.emojiButtonBackground,
                        },
                        emojiButtonStyle,
                    ], onPress: () => handleEmojiSelect(emoji.emoji), accessibilityRole: "button", accessibilityLabel: `${emoji.description} emoji`, accessibilityHint: "Double tap to select this emoji", children: _jsx(Text, { style: [styles.emojiText, { fontSize: dynamicFontSize }], children: displayEmoji }) }, `${emoji.emoji}-${index}`));
            }) }));
    }, [
        handleEmojiSelect,
        themedStyles,
        categoryHeaderStyle,
        categoryNameMap,
        categoryContainerStyle,
        columns,
        selectedSkinTone,
        emojiButtonStyle,
        renderCategoryHeader,
    ]);
    const renderEmptyComponent = useCallback(() => {
        if (isSearchMode && emojiSections.length === 0) {
            return (_jsx(View, { style: [styles.noResultsContainer, { padding: NO_RESULTS_PADDING }], children: _jsx(Text, { style: [
                        styles.noResultsText,
                        { fontSize: NO_RESULTS_FONT_SIZE, color: themedStyles.noResults },
                        noResultsStyle,
                    ], children: "No emojis found" }) }));
        }
        return null;
    }, [isSearchMode, emojiSections.length, themedStyles.noResults, noResultsStyle]);
    return {
        renderItem,
        renderEmptyComponent,
    };
}
//# sourceMappingURL=useEmojiPickerRenderer.js.map