"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmojiPickerRenderer = useEmojiPickerRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const styles_1 = require("../components/EmojiPicker/styles");
function useEmojiPickerRenderer({ onEmojiSelect, getModifiedEmoji, updateRecentEmojis, selectedSkinTone, emojiSections, searchQuery, showSearchBar = true, columns = 6, categoryHeaderStyle, categoryContainerStyle, emojiButtonStyle, noResultsStyle, categoryNameMap, renderCategoryHeader, }) {
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
    const CATEGORY_MARGIN_V = 8;
    const CATEGORY_PADDING_H = 12;
    const EMOJI_BUTTON_PADDING = 4;
    const EMOJI_GRID_PADDING_H = 4;
    const NO_RESULTS_PADDING = 30;
    const NO_RESULTS_FONT_SIZE = 16;
    const themedStyles = (0, react_1.useMemo)(() => ({
        categoryTitle: theme.colors.categoryTitle,
        categoryDivider: theme.colors.categoryDivider,
        noResults: theme.colors.noResults,
        emojiButtonBackground: theme.colors.emojiButtonBackground,
    }), [theme]);
    const isSearchMode = !!searchQuery && showSearchBar;
    const handleEmojiSelect = (0, react_1.useCallback)((emoji) => {
        const finalEmoji = getModifiedEmoji(emoji);
        updateRecentEmojis(emoji);
        onEmojiSelect(finalEmoji);
    }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);
    const renderItem = (0, react_1.useCallback)(({ item }) => {
        if (item.type === 'header') {
            const titleStyle = [
                styles_1.styles.categoryTitle,
                {
                    color: themedStyles.categoryTitle,
                    borderBottomColor: themedStyles.categoryDivider,
                },
                categoryHeaderStyle,
            ];
            const displayName = (categoryNameMap === null || categoryNameMap === void 0 ? void 0 : categoryNameMap[item.category]) || item.category;
            if (renderCategoryHeader) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                        styles_1.styles.categoryContainer,
                        { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
                        categoryContainerStyle,
                    ], children: renderCategoryHeader({ category: item.category, displayName }) }));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    styles_1.styles.categoryContainer,
                    { marginVertical: CATEGORY_MARGIN_V, paddingHorizontal: CATEGORY_PADDING_H },
                    categoryContainerStyle,
                ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: titleStyle, children: displayName }) }));
        }
        const dynamicFontSize = Math.min(40, Math.max(16, 28 * (6 / columns)));
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles_1.styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }], children: item.emojis.map((emoji, index) => {
                const displayEmoji = (emoji.skin_tones && selectedSkinTone)
                    ? emoji.emoji + selectedSkinTone
                    : emoji.emoji;
                return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: [
                        styles_1.styles.emojiButton,
                        {
                            width: `${100 / columns}%`,
                            padding: EMOJI_BUTTON_PADDING,
                            backgroundColor: themedStyles.emojiButtonBackground,
                        },
                        emojiButtonStyle,
                    ], onPress: () => handleEmojiSelect(emoji.emoji), accessibilityRole: "button", accessibilityLabel: `${emoji.description} emoji`, accessibilityHint: "Double tap to select this emoji", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [styles_1.styles.emojiText, { fontSize: dynamicFontSize }], children: displayEmoji }) }, `${emoji.emoji}-${index}`));
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
    const renderEmptyComponent = (0, react_1.useCallback)(() => {
        if (isSearchMode && emojiSections.length === 0) {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles_1.styles.noResultsContainer, { padding: NO_RESULTS_PADDING }], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                        styles_1.styles.noResultsText,
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