"use strict";
/**
 * React Native Emoji Picker - Flexible emoji picker for React Native
 * @package @hiraku-ai/react-native-emoji-picker
 * @author Stef Buzas - Hiraku
 * @license Apache-2.0
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = exports.lightTheme = exports.useEmojiPickerTheme = exports.EmojiPickerThemeProvider = exports.emojiData = exports.useEmojiPickerRenderer = exports.useEmojiPicker = exports.default = exports.EmojiTabs = exports.EmojiSearch = exports.SkinToneSelector = exports.Category = exports.SKIN_TONES = exports.EmojiPicker = exports.EmojiPickerModal = void 0;
// Components
var EmojiPicker_1 = require("./components/EmojiPicker");
Object.defineProperty(exports, "EmojiPickerModal", { enumerable: true, get: function () { return __importDefault(EmojiPicker_1).default; } });
var EmojiPicker_2 = require("./components/EmojiPicker");
Object.defineProperty(exports, "EmojiPicker", { enumerable: true, get: function () { return EmojiPicker_2.EmojiPicker; } });
Object.defineProperty(exports, "SKIN_TONES", { enumerable: true, get: function () { return EmojiPicker_2.SKIN_TONES; } });
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return EmojiPicker_2.Category; } });
Object.defineProperty(exports, "SkinToneSelector", { enumerable: true, get: function () { return EmojiPicker_2.SkinToneSelector; } });
var EmojiSearch_1 = require("./components/EmojiPicker/EmojiSearch");
Object.defineProperty(exports, "EmojiSearch", { enumerable: true, get: function () { return __importDefault(EmojiSearch_1).default; } });
var EmojiTabs_1 = require("./components/EmojiPicker/EmojiTabs");
Object.defineProperty(exports, "EmojiTabs", { enumerable: true, get: function () { return __importDefault(EmojiTabs_1).default; } });
var EmojiPicker_3 = require("./components/EmojiPicker");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(EmojiPicker_3).default; } });
// Hooks
var useEmojiPicker_1 = require("./hooks/useEmojiPicker");
Object.defineProperty(exports, "useEmojiPicker", { enumerable: true, get: function () { return useEmojiPicker_1.useEmojiPicker; } });
var useEmojiPickerRenderer_1 = require("./hooks/useEmojiPickerRenderer");
Object.defineProperty(exports, "useEmojiPickerRenderer", { enumerable: true, get: function () { return useEmojiPickerRenderer_1.useEmojiPickerRenderer; } });
// Data & Icons
var emoji_json_1 = require("./assets/data/emoji.json");
Object.defineProperty(exports, "emojiData", { enumerable: true, get: function () { return __importDefault(emoji_json_1).default; } });
__exportStar(require("./assets/icons"), exports);
// Theme
var theme_1 = require("./theme");
Object.defineProperty(exports, "EmojiPickerThemeProvider", { enumerable: true, get: function () { return theme_1.EmojiPickerThemeProvider; } });
Object.defineProperty(exports, "useEmojiPickerTheme", { enumerable: true, get: function () { return theme_1.useEmojiPickerTheme; } });
Object.defineProperty(exports, "lightTheme", { enumerable: true, get: function () { return theme_1.lightTheme; } });
Object.defineProperty(exports, "darkTheme", { enumerable: true, get: function () { return theme_1.darkTheme; } });
//# sourceMappingURL=index.js.map