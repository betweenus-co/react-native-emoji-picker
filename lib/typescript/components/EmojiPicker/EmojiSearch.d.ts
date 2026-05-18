import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import type { IconComponent } from './types';
interface EmojiSearchProps {
    onSearch: (text: string) => void;
    debounceMs?: number;
    minChars?: number;
    placeholderText?: string;
    searchBarStyle?: ViewStyle;
    searchInputStyle?: TextStyle;
    showSearchIcon?: boolean;
    containerStyle?: ViewStyle;
    SearchIconComponent?: IconComponent;
    ClearIconComponent?: IconComponent;
}
declare function EmojiSearchInner({ onSearch, debounceMs, minChars, placeholderText, searchBarStyle, searchInputStyle, showSearchIcon, containerStyle, SearchIconComponent, ClearIconComponent, }: EmojiSearchProps): React.JSX.Element;
export declare const EmojiSearch: React.MemoExoticComponent<typeof EmojiSearchInner>;
export default EmojiSearch;
//# sourceMappingURL=EmojiSearch.d.ts.map