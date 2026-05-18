// Maximum number of recently used emojis to keep
export const MAX_RECENT_EMOJIS = 20;
// AsyncStorage key for persisting recently used emojis
export const STORAGE_KEY = 'emoji_picker_recent_emojis';
// Skin tone modifiers (Fitzpatrick scale)
export const SKIN_TONES = [
    { name: 'Default', modifier: '', color: '#FFDE00' },
    { name: 'Light', modifier: '\u{1F3FB}', color: '#F7D7C4' },
    { name: 'Medium-Light', modifier: '\u{1F3FC}', color: '#D8B094' },
    { name: 'Medium', modifier: '\u{1F3FD}', color: '#BB9167' },
    { name: 'Medium-Dark', modifier: '\u{1F3FE}', color: '#8E562E' },
    { name: 'Dark', modifier: '\u{1F3FF}', color: '#613D30' },
];
// Category constants for easier reference
export var Category;
(function (Category) {
    Category["RECENTLY_USED"] = "Recently Used";
    Category["SMILEYS_EMOTION"] = "Smileys & Emotion";
    Category["PEOPLE_BODY"] = "People & Body";
    Category["ANIMALS_NATURE"] = "Animals & Nature";
    Category["FOOD_DRINK"] = "Food & Drink";
    Category["TRAVEL_PLACES"] = "Travel & Places";
    Category["ACTIVITIES"] = "Activities";
    Category["OBJECTS"] = "Objects";
    Category["SYMBOLS"] = "Symbols";
    Category["FLAGS"] = "Flags";
})(Category || (Category = {}));
//# sourceMappingURL=constants.js.map