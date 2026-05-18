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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const icons_1 = require("../../assets/icons");
const theme_1 = require("../../theme");
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
function EmojiTabsInner({ categories, activeCategory, onCategoryPress, tabIconColors = {}, tabsContainerStyle, tabStyle, activeTabStyle, FlatListComponent = react_native_1.FlatList, categoryIconComponents, }) {
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
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
    const themedColors = (0, react_1.useMemo)(() => ({
        tabsBorder: theme.colors.tabsBorder,
        tabBackground: theme.colors.tabBackground,
        tabActiveBackground: theme.colors.tabActiveBackground,
        icon: theme.colors.icon,
    }), [theme]);
    // Get the color for a category, using custom color if provided or default color as fallback
    const getCategoryColor = (0, react_1.useCallback)((category) => {
        return tabIconColors[category] || DEFAULT_ICON_COLORS[category] || themedColors.icon;
    }, [tabIconColors, themedColors.icon]);
    // Create dynamic category icons with custom colors
    const getCategoryIcon = (0, react_1.useCallback)((category) => {
        const color = getCategoryColor(category);
        // Use custom icon component if provided
        if (categoryIconComponents === null || categoryIconComponents === void 0 ? void 0 : categoryIconComponents[category]) {
            const CustomIcon = categoryIconComponents[category];
            return (0, jsx_runtime_1.jsx)(CustomIcon, { size: ICON_SIZE, color: color });
        }
        switch (category) {
            case 'Recently Used':
                return (0, jsx_runtime_1.jsx)(icons_1.HistoryIcon, { size: ICON_SIZE, color: color });
            case 'Smileys & Emotion':
                return (0, jsx_runtime_1.jsx)(icons_1.MoodSmileIcon, { size: ICON_SIZE, color: color });
            case 'People & Body':
                return (0, jsx_runtime_1.jsx)(icons_1.UserIcon, { size: ICON_SIZE, color: color });
            case 'Animals & Nature':
                return (0, jsx_runtime_1.jsx)(icons_1.LeafIcon, { size: ICON_SIZE, color: color });
            case 'Food & Drink':
                return (0, jsx_runtime_1.jsx)(icons_1.PizzaIcon, { size: ICON_SIZE, color: color });
            case 'Travel & Places':
                return (0, jsx_runtime_1.jsx)(icons_1.CarIcon, { size: ICON_SIZE, color: color });
            case 'Activities':
                return (0, jsx_runtime_1.jsx)(icons_1.DeviceGamepadIcon, { size: ICON_SIZE, color: color });
            case 'Objects':
                return (0, jsx_runtime_1.jsx)(icons_1.BulbIcon, { size: ICON_SIZE, color: color });
            case 'Symbols':
                return (0, jsx_runtime_1.jsx)(icons_1.HashIcon, { size: ICON_SIZE, color: color });
            case 'Flags':
                return (0, jsx_runtime_1.jsx)(icons_1.FlagIcon, { size: ICON_SIZE, color: color });
            default:
                return (0, jsx_runtime_1.jsx)(icons_1.HashIcon, { size: ICON_SIZE, color: color });
        }
    }, [getCategoryColor, categoryIconComponents]);
    // Memoize style arrays
    const containerStyle = (0, react_1.useMemo)(() => [
        styles.container,
        {
            height: CONTAINER_HEIGHT,
            borderBottomWidth: BORDER_WIDTH,
            borderBottomColor: themedColors.tabsBorder,
        },
        tabsContainerStyle
    ], [themedColors.tabsBorder, tabsContainerStyle]);
    const defaultTabStyle = (0, react_1.useMemo)(() => [
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
    const defaultActiveTabStyle = (0, react_1.useMemo)(() => [
        styles.tabButtonActive,
        { backgroundColor: themedColors.tabActiveBackground },
        activeTabStyle
    ], [themedColors.tabActiveBackground, activeTabStyle]);
    const renderItem = (0, react_1.useCallback)(({ item }) => {
        const isActive = activeCategory === item;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => onCategoryPress(item), style: [
                defaultTabStyle,
                isActive && defaultActiveTabStyle
            ], activeOpacity: 0.6, accessibilityRole: "tab", accessibilityLabel: `${item} category`, accessibilityState: { selected: isActive }, accessibilityHint: "Double tap to view this emoji category", children: getCategoryIcon(item) }));
    }, [activeCategory, onCategoryPress, getCategoryIcon, defaultActiveTabStyle, defaultTabStyle]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: (0, jsx_runtime_1.jsx)(FlatListComponent, Object.assign({ data: categories, renderItem: renderItem, keyExtractor: (item) => item, horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: [
                styles.tabsContent,
                { paddingHorizontal: CONTENT_PADDING_H }
            ] }, react_native_1.Platform.select({
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
exports.EmojiTabs = react_1.default.memo(EmojiTabsInner);
const styles = react_native_1.StyleSheet.create({
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
exports.default = exports.EmojiTabs;
//# sourceMappingURL=EmojiTabs.js.map