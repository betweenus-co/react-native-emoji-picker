import { jsx as _jsx } from "react/jsx-runtime";
import { EmojiPickerModal } from './EmojiPickerModal';
// Re-export types and constants
export { SKIN_TONES, Category } from './constants';
// Re-export components
export { EmojiPicker } from './EmojiPicker';
export { EmojiPickerModal } from './EmojiPickerModal';
export { SkinToneSelector } from './SkinToneSelector';
export { EmojiSearch } from './EmojiSearch';
export { EmojiTabs } from './EmojiTabs';
// Default export: Modal version (most common use case)
export default function (props) {
    return _jsx(EmojiPickerModal, Object.assign({}, props));
}
//# sourceMappingURL=index.js.map