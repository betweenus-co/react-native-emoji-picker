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
exports.EmojiSearch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const icons_1 = require("../../assets/icons");
const theme_1 = require("../../theme");
function EmojiSearchInner({ onSearch, debounceMs = 150, minChars = 2, placeholderText = "Search emojis...", searchBarStyle, searchInputStyle, showSearchIcon = true, containerStyle, SearchIconComponent, ClearIconComponent, }) {
    const [inputValue, setInputValue] = (0, react_1.useState)('');
    const timeoutRef = (0, react_1.useRef)(null);
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
    // Default layout values
    const CONTAINER_PADDING_H = 16;
    const CONTAINER_PADDING_V = 8;
    const SEARCH_HEIGHT = 40;
    const SEARCH_BORDER_RADIUS = 10;
    const SEARCH_PADDING_H = 12;
    const ICON_SIZE = 18;
    const ICON_MARGIN = 8;
    const CLEAR_ICON_SIZE = 16;
    const INPUT_FONT_SIZE = 16;
    const CLEAR_BUTTON_PADDING = 4;
    // Memoize theme colors
    const themedColors = (0, react_1.useMemo)(() => ({
        placeholder: theme.colors.placeholder,
        searchIcon: theme.colors.icon,
        clearIcon: theme.colors.icon,
        background: theme.colors.background,
        searchBackground: theme.colors.searchBackground,
        text: theme.colors.text,
    }), [theme]);
    const handleChange = (0, react_1.useCallback)((text) => {
        // Update local input immediately
        setInputValue(text);
        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Debounce the parent callback
        timeoutRef.current = setTimeout(() => {
            onSearch(text.length >= minChars ? text : '');
        }, debounceMs);
    }, [debounceMs, minChars, onSearch]);
    const handleClear = (0, react_1.useCallback)(() => {
        setInputValue('');
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        onSearch('');
    }, [onSearch]);
    // Cleanup on unmount
    (0, react_1.useEffect)(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            styles.container,
            {
                paddingHorizontal: CONTAINER_PADDING_H,
                paddingVertical: CONTAINER_PADDING_V,
                backgroundColor: themedColors.background,
            },
            containerStyle
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                styles.searchContainer,
                {
                    height: SEARCH_HEIGHT,
                    borderRadius: SEARCH_BORDER_RADIUS,
                    paddingHorizontal: SEARCH_PADDING_H,
                    backgroundColor: themedColors.searchBackground,
                },
                searchBarStyle
            ], children: [showSearchIcon && (() => {
                    const SearchIcon = SearchIconComponent !== null && SearchIconComponent !== void 0 ? SearchIconComponent : icons_1.SearchIcon;
                    return ((0, jsx_runtime_1.jsx)(SearchIcon, { size: ICON_SIZE, color: themedColors.searchIcon, style: [styles.searchIcon, { marginRight: ICON_MARGIN }] }));
                })(), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { style: [
                        styles.input,
                        {
                            height: SEARCH_HEIGHT,
                            fontSize: INPUT_FONT_SIZE,
                            color: themedColors.text,
                        },
                        searchInputStyle
                    ], value: inputValue, onChangeText: handleChange, placeholder: placeholderText, placeholderTextColor: themedColors.placeholder, returnKeyType: "search", autoCapitalize: "none", autoCorrect: false, accessibilityLabel: "Search emojis", accessibilityRole: "search" }), inputValue.length > 0 && ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: handleClear, style: [styles.clearButton, { padding: CLEAR_BUTTON_PADDING }], accessibilityRole: "button", accessibilityLabel: "Clear search", accessibilityHint: "Double tap to clear the search field", children: (() => {
                        const ClearIcon = ClearIconComponent !== null && ClearIconComponent !== void 0 ? ClearIconComponent : icons_1.XIcon;
                        return (0, jsx_runtime_1.jsx)(ClearIcon, { size: CLEAR_ICON_SIZE, color: themedColors.clearIcon });
                    })() }))] }) }));
}
exports.EmojiSearch = react_1.default.memo(EmojiSearchInner);
const styles = react_native_1.StyleSheet.create({
    container: {
    // All styling now via props and theme
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // All styling now via props and theme
    },
    searchIcon: {
    // All styling now via props and theme
    },
    input: Object.assign({ flex: 1 }, react_native_1.Platform.select({
        web: {
            outlineStyle: 'solid',
            outlineWidth: 0,
        },
    })),
    clearButton: {
    // All styling now via props and theme
    },
});
exports.default = exports.EmojiSearch;
//# sourceMappingURL=EmojiSearch.js.map