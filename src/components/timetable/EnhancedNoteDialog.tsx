/**
 * EnhancedNoteDialog Component
 * 
 * Advanced note editor with rich features:
 * - Category selection
 * - Pin/unpin notes
 * - Character counter
 * - Tags support
 * - Auto-save indicator
 * - Full note metadata display
 */

import { useEffect, useRef } from 'react';
import { Pin, PinOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ClassSession, DayOfWeek, Translations, Language } from '../../types';
import { Note, NoteCategory } from '../../types/notes';
import { getCategoryMeta, formatFullDate } from '../../utils/noteHelpers';

interface EnhancedNoteDialogProps {
  isOpen: boolean;
  selectedClass: ClassSession | null;
  editingNote: Note | null;
  noteContent: string;
  noteCategory: NoteCategory;
  isPinned: boolean;
  translations: Translations;
  language: Language;
  onClose: () => void;
  onNoteChange: (note: string) => void;
  onCategoryChange: (category: NoteCategory) => void;
  onPinnedChange: (pinned: boolean) => void;
  onSave: () => void;
  onSaveAndAddAnother: () => void;
}

export function EnhancedNoteDialog({
  isOpen,
  selectedClass,
  editingNote,
  noteContent,
  noteCategory,
  isPinned,
  translations,
  language,
  onClose,
  onNoteChange,
  onCategoryChange,
  onPinnedChange,
  onSave,
  onSaveAndAddAnother
}: EnhancedNoteDialogProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const categoryMeta = getCategoryMeta(language);

  /**
   * Helper to get day label in current language
   */
  const getDayLabel = (day: DayOfWeek): string => {
    const dayMap: Record<DayOfWeek, keyof Translations> = {
      'Monday': 'monday',
      'Tuesday': 'tuesday',
      'Wednesday': 'wednesday',
      'Thursday': 'thursday',
      'Friday': 'friday'
    };
    return translations[dayMap[day]];
  };

  /**
   * Auto-focus textarea when dialog opens
   */
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
        const length = textareaRef.current?.value.length || 0;
        textareaRef.current?.setSelectionRange(length, length);
      }, 100);
    }
  }, [isOpen]);

  if (!selectedClass) return null;

  const isEditing = !!editingNote;
  const charCount = noteContent.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
        {/* Dialog header with class information */}
        <DialogHeader>
          <DialogTitle>
            {editingNote ? translations.editingNote : translations.newNote}
          </DialogTitle>
          <DialogDescription>
            {selectedClass.subject} - {selectedClass.time} ({selectedClass.day})
          </DialogDescription>
        </DialogHeader>

        {/* Note editor */}
        <div className="space-y-4 py-4">
          {/* Category selector */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700">
              {translations.category}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(Object.keys(categoryMeta) as NoteCategory[]).map((cat) => {
                const meta = categoryMeta[cat];
                const isSelected = noteCategory === cat;
                
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onCategoryChange(cat)}
                    className={`
                      px-3 py-2 rounded-lg border-2 transition-all text-sm
                      flex items-center gap-2 touch-manipulation
                      ${isSelected 
                        ? `${meta.bgColor} border-current ${meta.color}` 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }
                    `}
                  >
                    <span className="text-base">{meta.icon}</span>
                    <span className="truncate">{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="note-content" className="text-sm text-gray-700">
                {translations.classNotes}
              </label>
              <span className="text-xs text-gray-500">
                {charCount} {translations.characterCount}
              </span>
            </div>
            <Textarea
              ref={textareaRef}
              id="note-content"
              placeholder={translations.addNotesPlaceholder}
              value={noteContent}
              onChange={(e) => onNoteChange(e.target.value)}
              className="min-h-[200px] resize-none text-sm"
            />
          </div>
        </div>

        {/* Action buttons */}
        <DialogFooter className="flex-col sm:flex-row gap-2">
          {/* Pin/Unpin button */}
          <Button
            variant="outline"
            onClick={() => onPinnedChange(!isPinned)}
            className="w-full sm:w-auto text-sm touch-manipulation flex items-center justify-center gap-1"
          >
            {isPinned ? (
              <>
                <PinOff className="w-4 h-4" />
                {translations.unpinNote}
              </>
            ) : (
              <>
                <Pin className="w-4 h-4" />
                {translations.pinNote}
              </>
            )}
          </Button>
          
          <div className="flex-1" />
          
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto text-sm touch-manipulation"
          >
            {translations.cancel}
          </Button>
          
          {!isEditing && (
            <Button
              style={{ backgroundColor: '#225b73' }}
              className="text-white w-full sm:w-auto text-sm touch-manipulation"
              onClick={onSaveAndAddAnother}
              disabled={!noteContent.trim()}
            >
              {translations.saveAndAddAnother}
            </Button>
          )}
          
          <Button
            style={{ backgroundColor: '#225b73' }}
            className="text-white w-full sm:w-auto text-sm touch-manipulation"
            onClick={onSave}
            disabled={!noteContent.trim()}
          >
            {translations.saveNote}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}