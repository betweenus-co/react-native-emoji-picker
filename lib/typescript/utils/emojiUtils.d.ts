import { EmojiData } from '../types/emoji';
export declare const groupEmojisByCategory: (emojis: EmojiData[]) => {
    title: string;
    data: EmojiData[];
}[];
export declare const searchEmojis: (emojis: EmojiData[], query: string) => EmojiData[];
export declare const getRecentlyUsedEmojis: () => Promise<string[]>;
export declare const saveRecentlyUsedEmoji: (emoji: string) => Promise<void>;
export declare const createEmojiSectionsWithRecents: (emojis: EmojiData[]) => Promise<Array<{
    title: string;
    data: EmojiData[];
}>>;
//# sourceMappingURL=emojiUtils.d.ts.map