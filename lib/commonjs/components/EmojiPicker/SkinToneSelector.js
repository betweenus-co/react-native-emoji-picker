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
exports.SkinToneSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const constants_1 = require("./constants");
const styles_1 = require("./styles");
function SkinToneSelectorInner({ selectedSkinTone, onSkinToneChange, skinToneSelectorStyle, skinToneButtonStyle, renderCustomSkinToneSelector, }) {
    const { theme } = (0, theme_1.useEmojiPickerTheme)();
    // Default layout values
    const BUTTON_SIZE = 24;
    const BUTTON_BORDER_RADIUS = 12;
    const themedStyles = (0, react_1.useMemo)(() => ({
        skinToneButtonBorder: theme.colors.skinToneButtonBorder,
        accent: theme.colors.accent,
    }), [theme]);
    if (renderCustomSkinToneSelector) {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderCustomSkinToneSelector({
                selectedSkinTone,
                onSkinToneChange,
                skinTones: constants_1.SKIN_TONES,
            }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [styles_1.styles.skinToneSelector, skinToneSelectorStyle], children: constants_1.SKIN_TONES.map((tone) => {
            const isSelected = selectedSkinTone === tone.modifier;
            return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => onSkinToneChange(tone.modifier), style: [
                    styles_1.styles.skinToneButton,
                    {
                        backgroundColor: tone.color,
                        width: BUTTON_SIZE,
                        height: BUTTON_SIZE,
                        borderRadius: BUTTON_BORDER_RADIUS,
                        borderColor: themedStyles.skinToneButtonBorder
                    },
                    isSelected && [
                        styles_1.styles.skinToneButtonActive,
                        { borderColor: themedStyles.accent }
                    ],
                    skinToneButtonStyle
                ], accessibilityRole: "button", accessibilityLabel: `${tone.name} skin tone`, accessibilityState: { selected: isSelected }, accessibilityHint: "Double tap to select this skin tone for emojis" }, tone.name));
        }) }));
}
exports.SkinToneSelector = react_1.default.memo(SkinToneSelectorInner);
//# sourceMappingURL=SkinToneSelector.js.map