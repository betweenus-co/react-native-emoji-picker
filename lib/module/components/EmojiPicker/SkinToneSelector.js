import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useEmojiPickerTheme } from '../../theme';
import { SKIN_TONES } from './constants';
import { styles } from './styles';
function SkinToneSelectorInner({ selectedSkinTone, onSkinToneChange, skinToneSelectorStyle, skinToneButtonStyle, renderCustomSkinToneSelector, }) {
    const { theme } = useEmojiPickerTheme();
    // Default layout values
    const BUTTON_SIZE = 24;
    const BUTTON_BORDER_RADIUS = 12;
    const themedStyles = useMemo(() => ({
        skinToneButtonBorder: theme.colors.skinToneButtonBorder,
        accent: theme.colors.accent,
    }), [theme]);
    if (renderCustomSkinToneSelector) {
        return (_jsx(_Fragment, { children: renderCustomSkinToneSelector({
                selectedSkinTone,
                onSkinToneChange,
                skinTones: SKIN_TONES,
            }) }));
    }
    return (_jsx(View, { style: [styles.skinToneSelector, skinToneSelectorStyle], children: SKIN_TONES.map((tone) => {
            const isSelected = selectedSkinTone === tone.modifier;
            return (_jsx(TouchableOpacity, { onPress: () => onSkinToneChange(tone.modifier), style: [
                    styles.skinToneButton,
                    {
                        backgroundColor: tone.color,
                        width: BUTTON_SIZE,
                        height: BUTTON_SIZE,
                        borderRadius: BUTTON_BORDER_RADIUS,
                        borderColor: themedStyles.skinToneButtonBorder
                    },
                    isSelected && [
                        styles.skinToneButtonActive,
                        { borderColor: themedStyles.accent }
                    ],
                    skinToneButtonStyle
                ], accessibilityRole: "button", accessibilityLabel: `${tone.name} skin tone`, accessibilityState: { selected: isSelected }, accessibilityHint: "Double tap to select this skin tone for emojis" }, tone.name));
        }) }));
}
export const SkinToneSelector = React.memo(SkinToneSelectorInner);
//# sourceMappingURL=SkinToneSelector.js.map