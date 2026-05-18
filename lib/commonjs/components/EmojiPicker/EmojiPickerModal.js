"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiPickerModal = EmojiPickerModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const icons_1 = require("../../assets/icons");
const theme_1 = require("../../theme");
const EmojiPicker_1 = require("./EmojiPicker");
const styles_1 = require("./styles");
// Internal modal wrapper component (uses theme from context)
function EmojiPickerInternal({ onEmojiSelect, emojis, visible, onClose, 
// Feature toggles
showHistoryTab = true, showSearchBar = true, showTabs = true, showSkinToneSelector, 
// Category filtering and ordering
excludeCategories, includeCategories, categoryOrder, categoryNameMap, 
// Emoji filtering
excludeEmojis, includeEmojis, 
// Layout
columns, 
// Behavior
maxRecentEmojis, defaultSkinTone, searchDebounceMs, searchMinChars, animationType = 'fade', 
// Styles
containerStyle, searchBarStyle, searchInputStyle, tabsContainerStyle, tabStyle, activeTabStyle, categoryHeaderStyle, categoryContainerStyle, emojiButtonStyle, skinToneSelectorStyle, skinToneButtonStyle, noResultsStyle, 
// Custom text/colors
searchPlaceholder, tabIconColors, 
// Theme
darkMode = false, FlatListComponent, TabFlatListComponent, 
// Custom renders
renderCustomTabs, renderCustomSearch, renderCustomSkinToneSelector, renderCategoryHeader, 
// FlatList performance
initialNumToRender, maxToRenderPerBatch, updateCellsBatchingPeriod, windowSize, removeClippedSubviews, 
// Icon overrides
icons, 
// Modal customization
modalTitle = "Pick an emoji", modalStyle, modalHeaderStyle, modalTitleStyle, modalCloseButtonStyle, modalWidthPercentage = 0.9, modalHeightPercentage = 0.7, modalMaxWidth = 450, modalMaxHeight = 600, }) {
    const [isModalVisible, setIsModalVisible] = (0, react_1.useState)(visible);
    const animatedValue = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
    // Default modal values
    const HEADER_PADDING_H = 16;
    const HEADER_PADDING_TOP = 16;
    const HEADER_PADDING_BOTTOM = 8;
    const CLOSE_ICON_SIZE = 24;
    (0, react_1.useEffect)(() => {
        if (visible) {
            setIsModalVisible(true);
            react_native_1.Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
        else {
            react_native_1.Animated.timing(animatedValue, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setIsModalVisible(false);
            });
        }
    }, [visible]);
    // Calculate dynamic modal dimensions (updates on rotation)
    const { width, height } = (0, react_native_1.useWindowDimensions)();
    // Don't render anything if not visible
    if (!isModalVisible && !visible)
        return null;
    const modalWidth = width * modalWidthPercentage;
    const modalHeight = height * modalHeightPercentage;
    // Create a style object with the background color and dimensions
    const modalContainerStyle = [
        styles_1.styles.modalContainer,
        {
            width: modalWidth,
            height: modalHeight,
            maxWidth: modalMaxWidth,
            maxHeight: modalMaxHeight,
            backgroundColor: theme.colors.modalBackground,
        },
        modalStyle
    ];
    const headerStyles = [
        styles_1.styles.header,
        {
            paddingHorizontal: HEADER_PADDING_H,
            paddingTop: HEADER_PADDING_TOP,
            paddingBottom: HEADER_PADDING_BOTTOM,
            backgroundColor: theme.colors.headerBackground,
            borderBottomColor: theme.colors.headerBorder,
        },
        modalHeaderStyle
    ];
    const headerTitleStyles = [
        styles_1.styles.headerTitle,
        {
            color: theme.colors.headerTitle
        },
        modalTitleStyle
    ];
    const overlayOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, theme.opacity.modalOverlay],
    });
    const contentAnimation = {
        opacity: animationType === 'fade' ? animatedValue : 1,
        transform: [
            {
                translateY: animationType === 'slide'
                    ? animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [600, 0],
                    })
                    : 0
            }
        ]
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: isModalVisible, transparent: true, animationType: "none", hardwareAccelerated: true, onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles_1.styles.modalOverlay, children: [(0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
                        react_native_1.StyleSheet.absoluteFill,
                        { backgroundColor: theme.colors.modalOverlay, opacity: overlayOpacity }
                    ], children: (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { style: react_native_1.StyleSheet.absoluteFill, activeOpacity: 1, onPress: onClose }) }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [modalContainerStyle, contentAnimation], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: headerStyles, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: headerTitleStyles, children: modalTitle }), (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: onClose, style: [styles_1.styles.closeButton, modalCloseButtonStyle], accessibilityRole: "button", accessibilityLabel: "Close emoji picker", accessibilityHint: "Double tap to close the emoji picker modal", children: (() => {
                                        var _a;
                                        const CloseIcon = (_a = icons === null || icons === void 0 ? void 0 : icons.close) !== null && _a !== void 0 ? _a : icons_1.XIcon;
                                        return (0, jsx_runtime_1.jsx)(CloseIcon, { size: CLOSE_ICON_SIZE, color: theme.colors.closeIcon });
                                    })() })] }), (0, jsx_runtime_1.jsx)(EmojiPicker_1.EmojiPicker, { onEmojiSelect: onEmojiSelect, emojis: emojis, onClose: onClose, showHistoryTab: showHistoryTab, showSearchBar: showSearchBar, showTabs: showTabs, showSkinToneSelector: showSkinToneSelector, excludeCategories: excludeCategories, includeCategories: includeCategories, categoryOrder: categoryOrder, categoryNameMap: categoryNameMap, excludeEmojis: excludeEmojis, includeEmojis: includeEmojis, columns: columns, maxRecentEmojis: maxRecentEmojis, defaultSkinTone: defaultSkinTone, searchDebounceMs: searchDebounceMs, searchMinChars: searchMinChars, animationType: animationType, containerStyle: containerStyle, searchBarStyle: searchBarStyle, searchInputStyle: searchInputStyle, tabsContainerStyle: tabsContainerStyle, tabStyle: tabStyle, activeTabStyle: activeTabStyle, categoryHeaderStyle: categoryHeaderStyle, categoryContainerStyle: categoryContainerStyle, emojiButtonStyle: emojiButtonStyle, skinToneSelectorStyle: skinToneSelectorStyle, skinToneButtonStyle: skinToneButtonStyle, noResultsStyle: noResultsStyle, searchPlaceholder: searchPlaceholder, tabIconColors: tabIconColors, darkMode: darkMode, icons: icons, FlatListComponent: FlatListComponent, TabFlatListComponent: TabFlatListComponent, renderCustomTabs: renderCustomTabs, renderCustomSearch: renderCustomSearch, renderCustomSkinToneSelector: renderCustomSkinToneSelector, renderCategoryHeader: renderCategoryHeader, initialNumToRender: initialNumToRender, maxToRenderPerBatch: maxToRenderPerBatch, updateCellsBatchingPeriod: updateCellsBatchingPeriod, windowSize: windowSize, removeClippedSubviews: removeClippedSubviews })] })] }) }));
}
// Public modal wrapper component with theme provider
function EmojiPickerModal(props) {
    const { darkMode, theme } = props;
    // Always wrap in theme provider since EmojiPickerInternal uses the theme context
    return ((0, jsx_runtime_1.jsx)(theme_1.EmojiPickerThemeProvider, { darkMode: darkMode, theme: theme, children: (0, jsx_runtime_1.jsx)(EmojiPickerInternal, Object.assign({}, props)) }));
}
//# sourceMappingURL=EmojiPickerModal.js.map