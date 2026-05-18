var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback, useMemo, useEffect } from 'react';
import { createMMKV } from 'react-native-mmkv';
import { groupEmojisByCategory, searchEmojis } from '../utils/emojiUtils';
const storage = createMMKV();
const STORAGE_KEY = 'emoji_picker_recent_emojis';
export function useEmojiPicker({ emojis = [], showHistoryTab = true, maxRecentEmojis = 6, defaultSkinTone = '', columns = 6, categoryOrder, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [recentEmojis, setRecentEmojis] = useState([]);
    const [selectedSkinTone, setSelectedSkinTone] = useState(defaultSkinTone);
    // Load recently used emojis on mount
    useEffect(() => {
        const loadRecentEmojis = () => __awaiter(this, void 0, void 0, function* () {
            if (!showHistoryTab)
                return;
            try {
                const recentEmojisJson = storage.getString(STORAGE_KEY);
                if (recentEmojisJson) {
                    const parsed = JSON.parse(recentEmojisJson);
                    setRecentEmojis(parsed.slice(0, maxRecentEmojis));
                }
            }
            catch (error) {
                console.error('Failed to load recent emojis:', error);
            }
        });
        loadRecentEmojis();
    }, [showHistoryTab, maxRecentEmojis]);
    // Handle search
    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
    }, []);
    // Handle skin tone change
    const handleSkinToneChange = useCallback((tone) => {
        setSelectedSkinTone(tone);
    }, []);
    // Group emojis by category, including recently used
    const rawEmojiSections = useMemo(() => {
        if (!(emojis === null || emojis === void 0 ? void 0 : emojis.length))
            return [];
        const processedEmojis = searchQuery
            ? searchEmojis(emojis, searchQuery)
            : emojis;
        const categories = groupEmojisByCategory(processedEmojis);
        if (recentEmojis.length > 0 && !searchQuery && showHistoryTab) {
            return [
                { title: 'Recently Used', data: recentEmojis },
                ...categories
            ];
        }
        return categories;
    }, [emojis, searchQuery, recentEmojis, showHistoryTab]);
    // Apply category ordering if specified
    const emojiSections = useMemo(() => {
        if (!categoryOrder || categoryOrder.length === 0) {
            return rawEmojiSections;
        }
        const sectionMap = new Map(rawEmojiSections.map(section => [section.title, section]));
        const ordered = [];
        categoryOrder.forEach(categoryName => {
            const section = sectionMap.get(categoryName);
            if (section) {
                ordered.push(section);
                sectionMap.delete(categoryName);
            }
        });
        sectionMap.forEach(section => {
            ordered.push(section);
        });
        return ordered;
    }, [rawEmojiSections, categoryOrder]);
    // Flatten data for FlatList
    const flatListData = useMemo(() => {
        const items = [];
        const EMOJIS_PER_ROW = columns;
        emojiSections.forEach((section, sectionIndex) => {
            items.push({
                type: 'header',
                category: section.title,
                id: `header-${sectionIndex}`
            });
            const emojis = section.data;
            for (let i = 0; i < emojis.length; i += EMOJIS_PER_ROW) {
                const rowEmojis = emojis.slice(i, i + EMOJIS_PER_ROW);
                items.push({
                    type: 'emojiRow',
                    emojis: rowEmojis,
                    id: `row-${sectionIndex}-${i}`
                });
            }
        });
        return items;
    }, [emojiSections, columns]);
    // Handle emoji selection with recently used tracking
    const updateRecentEmojis = useCallback((emoji) => {
        const selectedEmojiData = emojis.find(e => e.emoji === emoji);
        if (selectedEmojiData && showHistoryTab) {
            setRecentEmojis(prevRecent => {
                const filteredRecent = prevRecent.filter(e => e.emoji !== emoji);
                const newRecent = [selectedEmojiData, ...filteredRecent].slice(0, maxRecentEmojis);
                const saveRecentEmojis = (data) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        storage.set(STORAGE_KEY, JSON.stringify(data));
                    }
                    catch (error) {
                        console.error('Failed to save recent emojis:', error);
                    }
                });
                saveRecentEmojis(newRecent);
                return newRecent;
            });
        }
    }, [emojis, showHistoryTab, maxRecentEmojis]);
    // Helper to get final emoji with skin tone
    const getModifiedEmoji = useCallback((emoji) => {
        const emojiDataObj = emojis.find(e => e.emoji === emoji);
        if ((emojiDataObj === null || emojiDataObj === void 0 ? void 0 : emojiDataObj.skin_tones) && selectedSkinTone) {
            return emoji + selectedSkinTone;
        }
        return emoji;
    }, [emojis, selectedSkinTone]);
    // Set first category as active by default, and update if current category disappears
    useEffect(() => {
        if (emojiSections.length > 0) {
            // Check if current active category still exists
            const categoryExists = emojiSections.some(section => section.title === activeCategory);
            // If no active category or current one doesn't exist, set to first category
            if (!activeCategory || !categoryExists) {
                setActiveCategory(emojiSections[0].title);
            }
        }
    }, [emojiSections, activeCategory]);
    return {
        searchQuery,
        setSearchQuery: handleSearch,
        activeCategory,
        setActiveCategory,
        recentEmojis,
        selectedSkinTone,
        setSelectedSkinTone: handleSkinToneChange,
        emojiSections,
        flatListData,
        updateRecentEmojis,
        getModifiedEmoji,
    };
}
//# sourceMappingURL=useEmojiPicker.js.map