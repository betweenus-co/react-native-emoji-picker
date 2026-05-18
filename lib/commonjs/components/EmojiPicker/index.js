"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiTabs = exports.EmojiSearch = exports.SkinToneSelector = exports.EmojiPickerModal = exports.EmojiPicker = exports.Category = exports.SKIN_TONES = void 0;
exports.default = default_1;
const jsx_runtime_1 = require("react/jsx-runtime");
const EmojiPickerModal_1 = require("./EmojiPickerModal");
// Re-export types and constants
var constants_1 = require("./constants");
Object.defineProperty(exports, "SKIN_TONES", { enumerable: true, get: function () { return constants_1.SKIN_TONES; } });
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return constants_1.Category; } });
// Re-export components
var EmojiPicker_1 = require("./EmojiPicker");
Object.defineProperty(exports, "EmojiPicker", { enumerable: true, get: function () { return EmojiPicker_1.EmojiPicker; } });
var EmojiPickerModal_2 = require("./EmojiPickerModal");
Object.defineProperty(exports, "EmojiPickerModal", { enumerable: true, get: function () { return EmojiPickerModal_2.EmojiPickerModal; } });
var SkinToneSelector_1 = require("./SkinToneSelector");
Object.defineProperty(exports, "SkinToneSelector", { enumerable: true, get: function () { return SkinToneSelector_1.SkinToneSelector; } });
var EmojiSearch_1 = require("./EmojiSearch");
Object.defineProperty(exports, "EmojiSearch", { enumerable: true, get: function () { return EmojiSearch_1.EmojiSearch; } });
var EmojiTabs_1 = require("./EmojiTabs");
Object.defineProperty(exports, "EmojiTabs", { enumerable: true, get: function () { return EmojiTabs_1.EmojiTabs; } });
// Default export: Modal version (most common use case)
function default_1(props) {
    return (0, jsx_runtime_1.jsx)(EmojiPickerModal_1.EmojiPickerModal, Object.assign({}, props));
}
//# sourceMappingURL=index.js.map