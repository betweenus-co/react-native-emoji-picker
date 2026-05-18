"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmojiSectionsWithRecents = exports.saveRecentlyUsedEmoji = exports.getRecentlyUsedEmojis = exports.searchEmojis = exports.groupEmojisByCategory = void 0;
const react_native_mmkv_1 = require("react-native-mmkv");
const storage = (0, react_native_mmkv_1.createMMKV)();
// Standard category order
const EMOJI_CATEGORIES_ORDER = [
    'Smileys & Emotion',
    'People & Body',
    'Animals & Nature',
    'Food & Drink',
    'Travel & Places',
    'Activities',
    'Objects',
    'Symbols',
    'Flags',
];
// Simple sort function for categories
const sortCategories = (a, b) => {
    const indexA = EMOJI_CATEGORIES_ORDER.indexOf(a);
    const indexB = EMOJI_CATEGORIES_ORDER.indexOf(b);
    if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
    }
    if (indexA !== -1)
        return -1;
    if (indexB !== -1)
        return 1;
    return a.localeCompare(b);
};
const groupEmojisByCategory = (emojis) => {
    // Group emojis by category
    const categorized = emojis.reduce((acc, emoji) => {
        const category = emoji.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(emoji);
        return acc;
    }, {});
    // Convert to array format for SectionList
    const result = Object.keys(categorized)
        .sort(sortCategories)
        .map(category => ({
        title: category,
        data: categorized[category]
    }));
    return result;
};
exports.groupEmojisByCategory = groupEmojisByCategory;
const searchEmojis = (emojis, query) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm)
        return emojis;
    return emojis.filter((emoji) => {
        return (emoji.description.toLowerCase().includes(searchTerm) ||
            emoji.aliases.some((alias) => alias.toLowerCase().includes(searchTerm)) ||
            emoji.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
            emoji.emoji.includes(searchTerm));
    });
};
exports.searchEmojis = searchEmojis;
// Storage key for recent emojis
const RECENT_EMOJIS_KEY = 'recentEmojis';
const MAX_RECENT_EMOJIS = 30;
const getRecentlyUsedEmojis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stored = storage.getString(RECENT_EMOJIS_KEY);
        return stored ? JSON.parse(stored) : [];
    }
    catch (e) {
        console.error('Failed to load recent emojis:', e);
        return [];
    }
});
exports.getRecentlyUsedEmojis = getRecentlyUsedEmojis;
const saveRecentlyUsedEmoji = (emoji) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get current recents
        const current = yield (0, exports.getRecentlyUsedEmojis)();
        // Remove if already exists (to avoid duplicates)
        const filtered = current.filter(e => e !== emoji);
        // Add to beginning and limit size
        const updated = [emoji, ...filtered].slice(0, MAX_RECENT_EMOJIS);
        // Save to storage
        storage.set(RECENT_EMOJIS_KEY, JSON.stringify(updated));
    }
    catch (e) {
        console.error('Failed to save recent emoji:', e);
    }
});
exports.saveRecentlyUsedEmoji = saveRecentlyUsedEmoji;
const createEmojiSectionsWithRecents = (emojis) => __awaiter(void 0, void 0, void 0, function* () {
    // Get recently used emojis
    const recentEmojiCodes = yield (0, exports.getRecentlyUsedEmojis)();
    // Early return if no recents and no emojis
    if (!recentEmojiCodes.length && !emojis.length) {
        return [];
    }
    // If we have recents, create a "Recent" section
    let sections = [];
    if (recentEmojiCodes.length) {
        // Find the full emoji data for each recent emoji code
        const recentEmojis = recentEmojiCodes
            .map(code => emojis.find(emoji => emoji.emoji === code))
            .filter(Boolean);
        if (recentEmojis.length) {
            sections.push({
                title: 'Recently Used',
                data: recentEmojis,
            });
        }
    }
    // Add the regular categorized emojis
    return [...sections, ...(0, exports.groupEmojisByCategory)(emojis)];
});
exports.createEmojiSectionsWithRecents = createEmojiSectionsWithRecents;
//# sourceMappingURL=emojiUtils.js.map