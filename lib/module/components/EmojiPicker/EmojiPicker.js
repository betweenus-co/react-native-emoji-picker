import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import EmojiSearch from './EmojiSearch';
import EmojiTabs from './EmojiTabs';
import { useEmojiPicker } from '../../hooks/useEmojiPicker';
import { EmojiPickerThemeProvider, useEmojiPickerTheme } from '../../theme';
import { SkinToneSelector } from './SkinToneSelector';
import { styles } from './styles';
const CATEGORY_MARGIN_V = 8;
const CATEGORY_PADDING_H = 12;
const EMOJI_BUTTON_PADDING = 4;
const EMOJI_GRID_PADDING_H = 4;
const NO_RESULTS_PADDING = 30;
const NO_RESULTS_FONT_SIZE = 16;
const EmojiHeaderItem = React.memo(function EmojiHeaderItem({ category, categoryTitleColor, categoryDividerColor, categoryHeaderStyle, categoryContainerStyle, categoryNameMap, renderCategoryHeader, }) {
    const titleStyle = useMemo(() => [
        styles.categoryTitle,
        {
            color: categoryTitleColor,
            borderBottomColor: categoryDividerColor,
        },
        categoryHeaderStyle,
    ], [categoryDividerColor, categoryHeaderStyle, categoryTitleColor]);
    const containerStyle = useMemo(() => [
        styles.categoryContainer,
        {
            marginVertical: CATEGORY_MARGIN_V,
            paddingHorizontal: CATEGORY_PADDING_H,
        },
        categoryContainerStyle,
    ], [categoryContainerStyle]);
    const displayName = (categoryNameMap === null || categoryNameMap === void 0 ? void 0 : categoryNameMap[category]) || category;
    if (renderCategoryHeader) {
        return (_jsx(View, { style: containerStyle, children: renderCategoryHeader({
                category,
                displayName,
            }) }));
    }
    return (_jsx(View, { style: containerStyle, children: _jsx(Text, { style: titleStyle, children: displayName }) }));
});
const EmojiCell = React.memo(function EmojiCell({ emoji, selectedSkinTone, dynamicFontSize, emojiButtonBackground, emojiButtonStyle, buttonWidth, onEmojiSelect, }) {
    const handlePress = useCallback(() => {
        onEmojiSelect(emoji.emoji);
    }, [emoji.emoji, onEmojiSelect]);
    const displayEmoji = emoji.skin_tones && selectedSkinTone
        ? emoji.emoji + selectedSkinTone
        : emoji.emoji;
    const buttonStyle = useMemo(() => [
        styles.emojiButton,
        {
            width: buttonWidth,
            padding: EMOJI_BUTTON_PADDING,
            backgroundColor: emojiButtonBackground,
        },
        emojiButtonStyle,
    ], [buttonWidth, emojiButtonBackground, emojiButtonStyle]);
    const textStyle = useMemo(() => [styles.emojiText, { fontSize: dynamicFontSize }], [dynamicFontSize]);
    return (_jsx(TouchableOpacity, { style: buttonStyle, onPress: handlePress, accessibilityRole: "button", accessibilityLabel: `${emoji.description} emoji`, accessibilityHint: "Double tap to select this emoji", children: _jsx(Text, { style: textStyle, children: displayEmoji }) }));
});
const EmojiRow = React.memo(function EmojiRow({ emojis, columns, selectedSkinTone, dynamicFontSize, emojiButtonBackground, emojiButtonStyle, onEmojiSelect, }) {
    const rowStyle = useMemo(() => [styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }], []);
    const buttonWidth = useMemo(() => `${100 / columns}%`, [columns]);
    return (_jsx(View, { style: rowStyle, children: emojis.map((emoji) => (_jsx(EmojiCell, { emoji: emoji, selectedSkinTone: selectedSkinTone, dynamicFontSize: dynamicFontSize, emojiButtonBackground: emojiButtonBackground, emojiButtonStyle: emojiButtonStyle, buttonWidth: buttonWidth, onEmojiSelect: onEmojiSelect }, emoji.emoji))) }));
});
const EmojiNoResults = React.memo(function EmojiNoResults({ color, noResultsStyle, }) {
    const textStyle = useMemo(() => [
        styles.noResultsText,
        { fontSize: NO_RESULTS_FONT_SIZE, color },
        noResultsStyle,
    ], [color, noResultsStyle]);
    return (_jsx(View, { style: [styles.noResultsContainer, { padding: NO_RESULTS_PADDING }], children: _jsx(Text, { style: textStyle, children: "No emojis found" }) }));
});
// Internal content component (uses theme from context)
function EmojiPickerInternal({ onEmojiSelect, emojis, onClose, 
// Feature toggles
showHistoryTab = true, showSearchBar = true, showTabs = true, showSkinToneSelector = false, showSearchIcon = true, 
// Category filtering and ordering
excludeCategories, includeCategories, categoryOrder, categoryNameMap, 
// Emoji filtering
excludeEmojis, includeEmojis, 
// Layout
columns = 6, 
// Behavior
maxRecentEmojis = 20, defaultSkinTone = '', searchDebounceMs = 150, searchMinChars = 2, animationType = 'fade', 
// Styles
containerStyle, searchBarStyle, searchInputStyle, tabsContainerStyle, tabStyle, activeTabStyle, categoryHeaderStyle, categoryContainerStyle, emojiButtonStyle, skinToneSelectorStyle, skinToneButtonStyle, noResultsStyle, 
// Custom text/colors
searchPlaceholder, tabIconColors, 
// Theme
darkMode = false, theme: customTheme, 
// Icon overrides
icons, 
// Custom scroll components
FlatListComponent = FlatList, TabFlatListComponent = FlatList, 
// Custom renders
renderCustomTabs, renderCustomSearch, renderCustomSkinToneSelector, renderCategoryHeader, 
// FlatList performance
initialNumToRender = 30, maxToRenderPerBatch = 20, updateCellsBatchingPeriod, windowSize, removeClippedSubviews, }) {
    const { theme } = useEmojiPickerTheme();
    // Memoize theme-dependent styles to avoid recreating on every render
    const themedStyles = useMemo(() => ({
        background: theme.colors.background,
        categoryTitle: theme.colors.categoryTitle,
        categoryDivider: theme.colors.categoryDivider,
        noResults: theme.colors.noResults,
        emojiButtonBackground: theme.colors.emojiButtonBackground,
        skinToneButtonBorder: theme.colors.skinToneButtonBorder,
        accent: theme.colors.accent,
    }), [theme]);
    const includeEmojiSet = useMemo(() => (includeEmojis === null || includeEmojis === void 0 ? void 0 : includeEmojis.length) ? new Set(includeEmojis) : null, [includeEmojis]);
    const excludeEmojiSet = useMemo(() => (excludeEmojis === null || excludeEmojis === void 0 ? void 0 : excludeEmojis.length) ? new Set(excludeEmojis) : null, [excludeEmojis]);
    const includeCategorySet = useMemo(() => (includeCategories === null || includeCategories === void 0 ? void 0 : includeCategories.length) ? new Set(includeCategories) : null, [includeCategories]);
    const excludeCategorySet = useMemo(() => (excludeCategories === null || excludeCategories === void 0 ? void 0 : excludeCategories.length) ? new Set(excludeCategories) : null, [excludeCategories]);
    // Filter emojis based on include/exclude lists (only if filtering is needed)
    const filteredEmojis = useMemo(() => {
        // Skip filtering if no filters are provided
        const hasFilters = (includeEmojis && includeEmojis.length > 0) ||
            (excludeEmojis && excludeEmojis.length > 0) ||
            (includeCategories && includeCategories.length > 0) ||
            (excludeCategories && excludeCategories.length > 0);
        if (!hasFilters) {
            return emojis;
        }
        let filtered = emojis;
        // Apply emoji filtering
        if (includeEmojiSet) {
            filtered = filtered.filter(emoji => includeEmojiSet.has(emoji.emoji));
        }
        else if (excludeEmojiSet) {
            filtered = filtered.filter(emoji => !excludeEmojiSet.has(emoji.emoji));
        }
        // Apply category filtering
        if (includeCategorySet) {
            filtered = filtered.filter(emoji => includeCategorySet.has(emoji.category));
        }
        else if (excludeCategorySet) {
            filtered = filtered.filter(emoji => !excludeCategorySet.has(emoji.category));
        }
        return filtered;
    }, [emojis, includeEmojiSet, excludeEmojiSet, includeCategorySet, excludeCategorySet]);
    const { searchQuery, setSearchQuery: handleSearch, activeCategory, setActiveCategory, selectedSkinTone, setSelectedSkinTone, emojiSections, flatListData, updateRecentEmojis, getModifiedEmoji, } = useEmojiPicker({
        emojis: filteredEmojis,
        showHistoryTab,
        maxRecentEmojis,
        defaultSkinTone,
        columns,
        categoryOrder,
    });
    const flatListRef = useRef(null);
    const dynamicFontSize = useMemo(() => Math.min(40, Math.max(16, 28 * (6 / columns))), [columns]);
    const categories = useMemo(() => emojiSections.map(section => section.title), [emojiSections]);
    const categoryHeaderIndexes = useMemo(() => {
        const indexes = new Map();
        flatListData.forEach((item, index) => {
            if (item.type === 'header') {
                indexes.set(item.category, index);
            }
        });
        return indexes;
    }, [flatListData]);
    const categoryHeaderIndexesRef = useRef(categoryHeaderIndexes);
    useEffect(() => {
        categoryHeaderIndexesRef.current = categoryHeaderIndexes;
    }, [categoryHeaderIndexes]);
    // Handle emoji selection
    const handleEmojiSelect = useCallback((emoji) => {
        const finalEmoji = getModifiedEmoji(emoji);
        updateRecentEmojis(emoji);
        onEmojiSelect(finalEmoji);
    }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);
    const handleCategoryPress = useCallback((category) => {
        var _a;
        setActiveCategory(category);
        const headerIndex = categoryHeaderIndexesRef.current.get(category);
        if (((_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex) && headerIndex !== undefined) {
            flatListRef.current.scrollToIndex({
                index: headerIndex,
                animated: true,
                viewPosition: 0
            });
        }
    }, [setActiveCategory]);
    // Boolean to track if we're in search mode
    const isSearchMode = !!searchQuery && showSearchBar;
    const contentContainerStyles = useMemo(() => [
        styles.contentContainer,
        { backgroundColor: themedStyles.background },
        containerStyle
    ], [containerStyle, themedStyles.background]);
    const listStyles = useMemo(() => [
        styles.scrollView,
        { backgroundColor: themedStyles.background }
    ], [themedStyles.background]);
    const emptyState = useMemo(() => {
        if (!isSearchMode || emojiSections.length !== 0) {
            return null;
        }
        return (_jsx(EmojiNoResults, { color: themedStyles.noResults, noResultsStyle: noResultsStyle }));
    }, [emojiSections.length, isSearchMode, noResultsStyle, themedStyles.noResults]);
    // Render individual FlatList items (can be header or emoji row)
    const renderItem = useCallback(({ item }) => {
        if (item.type === 'header') {
            return (_jsx(EmojiHeaderItem, { category: item.category, categoryTitleColor: themedStyles.categoryTitle, categoryDividerColor: themedStyles.categoryDivider, categoryHeaderStyle: categoryHeaderStyle, categoryContainerStyle: categoryContainerStyle, categoryNameMap: categoryNameMap, renderCategoryHeader: renderCategoryHeader }));
        }
        return (_jsx(EmojiRow, { emojis: item.emojis, columns: columns, selectedSkinTone: selectedSkinTone, dynamicFontSize: dynamicFontSize, emojiButtonBackground: themedStyles.emojiButtonBackground, emojiButtonStyle: emojiButtonStyle, onEmojiSelect: handleEmojiSelect }));
    }, [
        handleEmojiSelect,
        themedStyles.categoryTitle,
        themedStyles.categoryDivider,
        themedStyles.emojiButtonBackground,
        categoryHeaderStyle,
        categoryNameMap,
        categoryContainerStyle,
        columns,
        selectedSkinTone,
        emojiButtonStyle,
        renderCategoryHeader,
        dynamicFontSize,
    ]);
    return (_jsxs(View, { style: contentContainerStyles, children: [showSearchBar && (renderCustomSearch ? (renderCustomSearch({
                onSearch: handleSearch,
                searchQuery,
            })) : (_jsx(EmojiSearch, { onSearch: handleSearch, debounceMs: searchDebounceMs, minChars: searchMinChars, placeholderText: searchPlaceholder, searchBarStyle: searchBarStyle, searchInputStyle: searchInputStyle, showSearchIcon: showSearchIcon, SearchIconComponent: icons === null || icons === void 0 ? void 0 : icons.search, ClearIconComponent: icons === null || icons === void 0 ? void 0 : icons.clearSearch }))), showSkinToneSelector && (_jsx(SkinToneSelector, { selectedSkinTone: selectedSkinTone, onSkinToneChange: setSelectedSkinTone, skinToneSelectorStyle: skinToneSelectorStyle, skinToneButtonStyle: skinToneButtonStyle, renderCustomSkinToneSelector: renderCustomSkinToneSelector })), !isSearchMode && showTabs && (renderCustomTabs ? (renderCustomTabs({
                categories,
                activeCategory,
                onCategoryPress: handleCategoryPress,
            })) : (_jsx(EmojiTabs, { categories: categories, activeCategory: activeCategory, onCategoryPress: handleCategoryPress, tabIconColors: tabIconColors, tabsContainerStyle: tabsContainerStyle, tabStyle: tabStyle, activeTabStyle: activeTabStyle, FlatListComponent: TabFlatListComponent, categoryIconComponents: icons === null || icons === void 0 ? void 0 : icons.categories }))), _jsx(FlatListComponent, { ref: flatListRef, data: flatListData, renderItem: renderItem, ListEmptyComponent: emptyState, keyExtractor: (item) => item.id, style: listStyles, showsVerticalScrollIndicator: false, maxToRenderPerBatch: maxToRenderPerBatch, initialNumToRender: initialNumToRender, updateCellsBatchingPeriod: updateCellsBatchingPeriod, windowSize: windowSize, removeClippedSubviews: removeClippedSubviews, onScrollToIndexFailed: (info) => {
                    const listRef = flatListRef.current;
                    if (!(listRef === null || listRef === void 0 ? void 0 : listRef.scrollToIndex)) {
                        return;
                    }
                    if (listRef.scrollToOffset) {
                        listRef.scrollToOffset({
                            offset: info.averageItemLength * info.index,
                            animated: false
                        });
                    }
                    setTimeout(() => {
                        var _a;
                        (_a = listRef.scrollToIndex) === null || _a === void 0 ? void 0 : _a.call(listRef, {
                            index: info.index,
                            animated: true,
                            viewPosition: 0
                        });
                    }, 500);
                } })] }));
}
// Public component with optional theme provider (for standalone use)
export function EmojiPicker(props) {
    const { darkMode = false, theme } = props;
    // Always wrap in theme provider since EmojiPickerInternal uses the theme context
    return (_jsx(EmojiPickerThemeProvider, { darkMode: darkMode, theme: theme, children: _jsx(EmojiPickerInternal, Object.assign({}, props)) }));
}
//# sourceMappingURL=EmojiPicker.js.map