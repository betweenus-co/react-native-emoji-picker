import React from 'react';
import { ViewStyle } from 'react-native';
import { SKIN_TONES } from './constants';
interface SkinToneSelectorProps {
    selectedSkinTone: string;
    onSkinToneChange: (tone: string) => void;
    skinToneSelectorStyle?: ViewStyle;
    skinToneButtonStyle?: ViewStyle;
    renderCustomSkinToneSelector?: (props: {
        selectedSkinTone: string;
        onSkinToneChange: (tone: string) => void;
        skinTones: typeof SKIN_TONES;
    }) => React.ReactNode;
}
declare function SkinToneSelectorInner({ selectedSkinTone, onSkinToneChange, skinToneSelectorStyle, skinToneButtonStyle, renderCustomSkinToneSelector, }: SkinToneSelectorProps): React.JSX.Element;
export declare const SkinToneSelector: React.MemoExoticComponent<typeof SkinToneSelectorInner>;
export {};
//# sourceMappingURL=SkinToneSelector.d.ts.map