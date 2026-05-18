import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { MoodSmileIcon, UserIcon, LeafIcon, PizzaIcon, CarIcon, DeviceGamepadIcon, BulbIcon, HashIcon, FlagIcon, HistoryIcon } from '../../assets/icons';
import { useEmojiPickerTheme } from '../../theme';
// Default colors for category icons
const DEFAULT_ICON_COLORS = {
    'Recently Used': '#9333ea',
    'Smileys & Emotion': '#6366f1',
    'People & Body': '#ec4899',
    'Animals & Nature': '#10b981',
    'Food & Drink': '#f59e0b',
    'Travel & Places': '#3b82f6',
    'Activities': '#8b5cf6',
    'Objects': '#ef4444',
    'Symbols': '#6b7280',
    'Flags': '#0ea5e9',
};
function EmojiTabsInner({ categories, activeCategory, onCategoryPress, tabIconColors = {}, tabsContainerStyle, tabStyle, activeTabStyle, FlatListComponent = FlatList, categoryIconComponents, }) {
    const { theme } = useEmojiPickerTheme();
    // Default layout values
    const CONTAINER_HEIGHT = 56;
    const BORDER_WIDTH = 1;
    const ICON_SIZE = 22;
    const BUTTON_WIDTH = 44;
    const BUTTON_HEIGHT = 44;
    const BUTTON_BORDER_RADIUS = 10;
    const BUTTON_MARGIN_H = 4;
    const CONTENT_PADDING_H = 12;
    // Memoize theme colors
    const themedColors = useMemo(() => ({
        tabsBorder: theme.colors.tabsBorder,
        tabBackground: theme.colors.tabBackground,
        tabActiveBackground: theme.colors.tabActiveBackground,
        icon: theme.colors.icon,
    }), [theme]);
    // Get the color for a category, using custom color if provided or default color as fallback
    const getCategoryColor = useCallback((category) => {
        return tabIconColors[category] || DEFAULT_ICON_COLORS[category] || themedColors.icon;
    }, [tabIconColors, themedColors.icon]);
    // Create dynamic category icons with custom colors
    const getCategoryIcon = useCallback((category) => {
        const color = getCategoryColor(category);
        // Use custom icon component if provided
        if (categoryIconComponents === null || categoryIconComponents === void 0 ? void 0 : categoryIconComponents[category]) {
            const CustomIcon = categoryIconComponents[category];
            return _jsx(CustomIcon, { size: ICON_SIZE, color: color });
        }
        switch (category) {
            case 'Recently Used':
                return _jsx(HistoryIcon, { size: ICON_SIZE, color: color });
            case 'Smileys & Emotion':
                return _jsx(MoodSmileIcon, { size: ICON_SIZE, color: color });
            case 'People & Body':
                return _jsx(UserIcon, { size: ICON_SIZE, color: color });
            case 'Animals & Nature':
                return _jsx(LeafIcon, { size: ICON_SIZE, color: color });
            case 'Food & Drink':
                return _jsx(PizzaIcon, { size: ICON_SIZE, color: color });
            case 'Travel & Places':
                return _jsx(CarIcon, { size: ICON_SIZE, color: color });
            case 'Activities':
                return _jsx(DeviceGamepadIcon, { size: ICON_SIZE, color: color });
            case 'Objects':
                return _jsx(BulbIcon, { size: ICON_SIZE, color: color });
            case 'Symbols':
                return _jsx(HashIcon, { size: ICON_SIZE, color: color });
            case 'Flags':
                return _jsx(FlagIcon, { size: ICON_SIZE, color: color });
            default:
                return _jsx(HashIcon, { size: ICON_SIZE, color: color });
        }
    }, [getCategoryColor, categoryIconComponents]);
    // Memoize style arrays
    const containerStyle = useMemo(() => [
        styles.container,
        {
            height: CONTAINER_HEIGHT,
            borderBottomWidth: BORDER_WIDTH,
            borderBottomColor: themedColors.tabsBorder,
        },
        tabsContainerStyle
    ], [themedColors.tabsBorder, tabsContainerStyle]);
    const defaultTabStyle = useMemo(() => [
        styles.tabButton,
        {
            width: BUTTON_WIDTH,
            height: BUTTON_HEIGHT,
            borderRadius: BUTTON_BORDER_RADIUS,
            marginHorizontal: BUTTON_MARGIN_H,
            backgroundColor: themedColors.tabBackground,
        },
        tabStyle,
    ], [themedColors.tabBackground, tabStyle]);
    const defaultActiveTabStyle = useMemo(() => [
        styles.tabButtonActive,
        { backgroundColor: themedColors.tabActiveBackground },
        activeTabStyle
    ], [themedColors.tabActiveBackground, activeTabStyle]);
    const renderItem = useCallback(({ item }) => {
        const isActive = activeCategory === item;
        return (_jsx(TouchableOpacity, { onPress: () => onCategoryPress(item), style: [
                defaultTabStyle,
                isActive && defaultActiveTabStyle
            ], activeOpacity: 0.6, accessibilityRole: "tab", accessibilityLabel: `${item} category`, accessibilityState: { selected: isActive }, accessibilityHint: "Double tap to view this emoji category", children: getCategoryIcon(item) }));
    }, [activeCategory, onCategoryPress, getCategoryIcon, defaultActiveTabStyle, defaultTabStyle]);
    return (_jsx(View, { style: containerStyle, children: _jsx(FlatListComponent, Object.assign({ data: categories, renderItem: renderItem, keyExtractor: (item) => item, horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: [
                styles.tabsContent,
                { paddingHorizontal: CONTENT_PADDING_H }
            ] }, Platform.select({
            web: {
                scrollEnabled: true,
                // @ts-ignore - web only property for mouse wheel support
                onWheel: (e) => {
                    const list = e.currentTarget;
                    if (list) {
                        list.scrollLeft += e.deltaY;
                    }
                }
            },
            default: {}
        }))) }));
}
export const EmojiTabs = React.memo(EmojiTabsInner);
const styles = StyleSheet.create({
    container: {
    // All styling now via props and theme
    },
    tabsContent: {
    // All styling now via props and theme
    },
    tabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        // All other styling now via props and theme
    },
    tabButtonActive: {
    // All styling now via props and theme
    },
});
export default EmojiTabs;
//# sourceMappingURL=EmojiTabs.js.map