"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiPicker = EmojiPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const EmojiSearch_1 = __importDefault(require("./EmojiSearch"));
const EmojiTabs_1 = __importDefault(require("./EmojiTabs"));
const useEmojiPicker_1 = require("../../hooks/useEmojiPicker");
const theme_1 = require("../../theme");
const SkinToneSelector_1 = require("./SkinToneSelector");
const styles_1 = require("./styles");
const CATEGORY_MARGIN_V = 8;
const CATEGORY_PADDING_H = 12;
const EMOJI_BUTTON_PADDING = 4;
const EMOJI_GRID_PADDING_H = 4;
const NO_RESULTS_PADDING = 30;
const NO_RESULTS_FONT_SIZE = 16;
const EmojiHeaderItem = react_1.default.memo(function EmojiHeaderItem({ category, categoryTitleColor, categoryDividerColor, categoryHeaderStyle, categoryContainerStyle, categoryNameMap, renderCategoryHeader, }) {
    const titleStyle = (0, react_1.useMemo)(() => [
        styles_1.styles.categoryTitle,
        {
            color: categoryTitleColor,
            borderBottomColor: categoryDividerColor,
        },
        categoryHeaderStyle,
    ], [categoryDividerColor, categoryHeaderStyle, categoryTitleColor]);
    const containerStyle = (0, react_1.useMemo)(() => [
        styles_1.styles.categoryContainer,
        {
            marginVertical: CATEGORY_MARGIN_V,
            paddingHorizontal: CATEGORY_PADDING_H,
        },
        categoryContainerStyle,
    ], [categoryContainerStyle]);
    const displayName = (categoryNameMap === null || categoryNameMap === void 0 ? void 0 : categoryNameMap[category]) || category;
    if (renderCategoryHeader) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: renderCategoryHeader({
                category,
                displayName,
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: titleStyle, children: displayName }) }));
});
const EmojiCell = react_1.default.memo(function EmojiCell({ emoji, selectedSkinTone, dynamicFontSize, emojiButtonBackground, emojiButtonStyle, buttonWidth, onEmojiSelect, }) {
    const handlePress = (0, react_1.useCallback)(() => {
        onEmojiSelect(emoji.emoji);
    }, [emoji.emoji, onEmojiSelect]);
    const displayEmoji = emoji.skin_tones && selectedSkinTone
        ? emoji.emoji + selectedSkinTone
        : emoji.emoji;
    const buttonStyle = (0, react_1.useMemo)(() => [
        styles_1.styles.emojiButton,
        {
            width: buttonWidth,
            padding: EMOJI_BUTTON_PADDING,
            backgroundColor: emojiButtonBackground,
        },
        emojiButtonStyle,
    ], [buttonWidth, emojiButtonBackground, emojiButtonStyle]);
    const textStyle = (0, react_1.useMemo)(() => [styles_1.styles.emojiText, { fontSize: dynamicFontSize }], [dynamicFontSize]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: buttonStyle, onPress: handlePress, accessibilityRole: "button", accessibilityLabel: `${emoji.description} emoji`, accessibilityHint: "Double tap to select this emoji", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: textStyle, children: displayEmoji }) }));
});
const EmojiRow = react_1.default.memo(function EmojiRow({ emojis, columns, selectedSkinTone, dynamicFontSize, emojiButtonBackground, emojiButtonStyle, onEmojiSelect, }) {
    const rowStyle = (0, react_1.useMemo)(() => [styles_1.styles.emojiGrid, { paddingHorizontal: EMOJI_GRID_PADDING_H }], []);
    const buttonWidth = (0, react_1.useMemo)(() => `${100 / columns}%`, [columns]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: emojis.map((emoji) => ((0, jsx_runtime_1.jsx)(EmojiCell, { emoji: emoji, selectedSkinTone: selectedSkinTone, dynamicFontSize: dynamicFontSize, emojiButtonBackground: emojiButtonBackground, emojiButtonStyle: emojiButtonStyle, buttonWidth: buttonWidth, onEmojiSelect: onEmojiSelect }, emoji.emoji))) }));
});
const EmojiNoResults = react_1.default.memo(function EmojiNoResults({ color, noResultsStyle, }) {
    const textStyle = (0, react_1.useMemo)(() => [
        styles_1.styles.noResultsText,
        { fontSize: NO_RESULTS_FONT_SIZE, color },
        noResultsStyle,
    ], [color, noResultsStyle]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles_1.styles.noResultsContainer, { padding: NO_RESULTS_PADDING }], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: textStyle, children: "No emojis found" }) }));
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
FlatListComponent = react_native_1.FlatList, TabFlatListComponent = react_native_1.FlatList, 
// Custom renders
renderCustomTabs, renderCustomSearch, renderCustomSkinToneSelector, renderCategoryHeader, 
// FlatList performance
initialNumToRender = 30, maxToRenderPerBatch = 20, updateCellsBatchingPeriod, windowSize, removeClippedSubviews, }) {
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
    // Memoize theme-dependent styles to avoid recreating on every render
    const themedStyles = (0, react_1.useMemo)(() => ({
        background: theme.colors.background,
        categoryTitle: theme.colors.categoryTitle,
        categoryDivider: theme.colors.categoryDivider,
        noResults: theme.colors.noResults,
        emojiButtonBackground: theme.colors.emojiButtonBackground,
        skinToneButtonBorder: theme.colors.skinToneButtonBorder,
        accent: theme.colors.accent,
    }), [theme]);
    const includeEmojiSet = (0, react_1.useMemo)(() => (includeEmojis === null || includeEmojis === void 0 ? void 0 : includeEmojis.length) ? new Set(includeEmojis) : null, [includeEmojis]);
    const excludeEmojiSet = (0, react_1.useMemo)(() => (excludeEmojis === null || excludeEmojis === void 0 ? void 0 : excludeEmojis.length) ? new Set(excludeEmojis) : null, [excludeEmojis]);
    const includeCategorySet = (0, react_1.useMemo)(() => (includeCategories === null || includeCategories === void 0 ? void 0 : includeCategories.length) ? new Set(includeCategories) : null, [includeCategories]);
    const excludeCategorySet = (0, react_1.useMemo)(() => (excludeCategories === null || excludeCategories === void 0 ? void 0 : excludeCategories.length) ? new Set(excludeCategories) : null, [excludeCategories]);
    // Filter emojis based on include/exclude lists (only if filtering is needed)
    const filteredEmojis = (0, react_1.useMemo)(() => {
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
    const { searchQuery, setSearchQuery: handleSearch, activeCategory, setActiveCategory, selectedSkinTone, setSelectedSkinTone, emojiSections, flatListData, updateRecentEmojis, getModifiedEmoji, } = (0, useEmojiPicker_1.useEmojiPicker)({
        emojis: filteredEmojis,
        showHistoryTab,
        maxRecentEmojis,
        defaultSkinTone,
        columns,
        categoryOrder,
    });
    const flatListRef = (0, react_1.useRef)(null);
    const dynamicFontSize = (0, react_1.useMemo)(() => Math.min(40, Math.max(16, 28 * (6 / columns))), [columns]);
    const categories = (0, react_1.useMemo)(() => emojiSections.map(section => section.title), [emojiSections]);
    const categoryHeaderIndexes = (0, react_1.useMemo)(() => {
        const indexes = new Map();
        flatListData.forEach((item, index) => {
            if (item.type === 'header') {
                indexes.set(item.category, index);
            }
        });
        return indexes;
    }, [flatListData]);
    const categoryHeaderIndexesRef = (0, react_1.useRef)(categoryHeaderIndexes);
    (0, react_1.useEffect)(() => {
        categoryHeaderIndexesRef.current = categoryHeaderIndexes;
    }, [categoryHeaderIndexes]);
    // Handle emoji selection
    const handleEmojiSelect = (0, react_1.useCallback)((emoji) => {
        const finalEmoji = getModifiedEmoji(emoji);
        updateRecentEmojis(emoji);
        onEmojiSelect(finalEmoji);
    }, [onEmojiSelect, getModifiedEmoji, updateRecentEmojis]);
    const handleCategoryPress = (0, react_1.useCallback)((category) => {
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
    const contentContainerStyles = (0, react_1.useMemo)(() => [
        styles_1.styles.contentContainer,
        { backgroundColor: themedStyles.background },
        containerStyle
    ], [containerStyle, themedStyles.background]);
    const listStyles = (0, react_1.useMemo)(() => [
        styles_1.styles.scrollView,
        { backgroundColor: themedStyles.background }
    ], [themedStyles.background]);
    const emptyState = (0, react_1.useMemo)(() => {
        if (!isSearchMode || emojiSections.length !== 0) {
            return null;
        }
        return ((0, jsx_runtime_1.jsx)(EmojiNoResults, { color: themedStyles.noResults, noResultsStyle: noResultsStyle }));
    }, [emojiSections.length, isSearchMode, noResultsStyle, themedStyles.noResults]);
    // Render individual FlatList items (can be header or emoji row)
    const renderItem = (0, react_1.useCallback)(({ item }) => {
        if (item.type === 'header') {
            return ((0, jsx_runtime_1.jsx)(EmojiHeaderItem, { category: item.category, categoryTitleColor: themedStyles.categoryTitle, categoryDividerColor: themedStyles.categoryDivider, categoryHeaderStyle: categoryHeaderStyle, categoryContainerStyle: categoryContainerStyle, categoryNameMap: categoryNameMap, renderCategoryHeader: renderCategoryHeader }));
        }
        return ((0, jsx_runtime_1.jsx)(EmojiRow, { emojis: item.emojis, columns: columns, selectedSkinTone: selectedSkinTone, dynamicFontSize: dynamicFontSize, emojiButtonBackground: themedStyles.emojiButtonBackground, emojiButtonStyle: emojiButtonStyle, onEmojiSelect: handleEmojiSelect }));
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: contentContainerStyles, children: [showSearchBar && (renderCustomSearch ? (renderCustomSearch({
                onSearch: handleSearch,
                searchQuery,
            })) : ((0, jsx_runtime_1.jsx)(EmojiSearch_1.default, { onSearch: handleSearch, debounceMs: searchDebounceMs, minChars: searchMinChars, placeholderText: searchPlaceholder, searchBarStyle: searchBarStyle, searchInputStyle: searchInputStyle, showSearchIcon: showSearchIcon, SearchIconComponent: icons === null || icons === void 0 ? void 0 : icons.search, ClearIconComponent: icons === null || icons === void 0 ? void 0 : icons.clearSearch }))), showSkinToneSelector && ((0, jsx_runtime_1.jsx)(SkinToneSelector_1.SkinToneSelector, { selectedSkinTone: selectedSkinTone, onSkinToneChange: setSelectedSkinTone, skinToneSelectorStyle: skinToneSelectorStyle, skinToneButtonStyle: skinToneButtonStyle, renderCustomSkinToneSelector: renderCustomSkinToneSelector })), !isSearchMode && showTabs && (renderCustomTabs ? (renderCustomTabs({
                categories,
                activeCategory,
                onCategoryPress: handleCategoryPress,
            })) : ((0, jsx_runtime_1.jsx)(EmojiTabs_1.default, { categories: categories, activeCategory: activeCategory, onCategoryPress: handleCategoryPress, tabIconColors: tabIconColors, tabsContainerStyle: tabsContainerStyle, tabStyle: tabStyle, activeTabStyle: activeTabStyle, FlatListComponent: TabFlatListComponent, categoryIconComponents: icons === null || icons === void 0 ? void 0 : icons.categories }))), (0, jsx_runtime_1.jsx)(FlatListComponent, { ref: flatListRef, data: flatListData, renderItem: renderItem, ListEmptyComponent: emptyState, keyExtractor: (item) => item.id, style: listStyles, showsVerticalScrollIndicator: false, maxToRenderPerBatch: maxToRenderPerBatch, initialNumToRender: initialNumToRender, updateCellsBatchingPeriod: updateCellsBatchingPeriod, windowSize: windowSize, removeClippedSubviews: removeClippedSubviews, onScrollToIndexFailed: (info) => {
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
function EmojiPicker(props) {
    const { darkMode = false, theme } = props;
    // Always wrap in theme provider since EmojiPickerInternal uses the theme context
    return ((0, jsx_runtime_1.jsx)(theme_1.EmojiPickerThemeProvider, { darkMode: darkMode, theme: theme, children: (0, jsx_runtime_1.jsx)(EmojiPickerInternal, Object.assign({}, props)) }));
}
//# sourceMappingURL=EmojiPicker.js.map