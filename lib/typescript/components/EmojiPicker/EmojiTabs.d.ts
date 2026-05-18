import React from 'react';
import { ViewStyle } from 'react-native';
import type { IconComponent } from './types';
interface EmojiTabsProps {
    categories: string[];
    activeCategory: string | null;
    onCategoryPress: (category: string) => void;
    tabIconColors?: Record<string, string>;
    tabsContainerStyle?: ViewStyle;
    tabStyle?: ViewStyle;
    activeTabStyle?: ViewStyle;
    FlatListComponent?: React.ElementType;
    categoryIconComponents?: Record<string, IconComponent>;
}
declare function EmojiTabsInner({ categories, activeCategory, onCategoryPress, tabIconColors, tabsContainerStyle, tabStyle, activeTabStyle, FlatListComponent, categoryIconComponents, }: EmojiTabsProps): React.JSX.Element;
export declare const EmojiTabs: React.MemoExoticComponent<typeof EmojiTabsInner>;
export default EmojiTabs;
//# sourceMappingURL=EmojiTabs.d.ts.map