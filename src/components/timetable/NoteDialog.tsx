/**
 * NoteDialog Component
 * 
 * Modal dialog for adding/editing class notes.
 * Features:
 * - Auto-focus on textarea when opened
 * - Cursor positioned at end of existing text
 * - Displays class context (subject, day, time, classroom)
 * - Save and cancel actions
 */

import { useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ClassSession, DayOfWeek, Translations } from '../../types';

interface NoteDialogProps {
  isOpen: boolean;
  selectedClass: ClassSession | null;
  currentNote: string;
  translations: Translations;
  onClose: () => void;
  onNoteChange: (note: string) => void;
  onSave: () => void;
}

export function NoteDialog({
  isOpen,
  selectedClass,
  currentNote,
  translations,
  onClose,
  onNoteChange,
  onSave
}: NoteDialogProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
   * Auto-focus textarea and position cursor at end when dialog opens
   */
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      const textarea = textareaRef.current;
      // Small delay to ensure dialog is fully rendered
      setTimeout(() => {
        textarea.focus();
        // Set cursor to the end
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }, 100);
    }
  }, [isOpen]);

  if (!selectedClass) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
        {/* Dialog header with class information */}
        <DialogHeader>
          <DialogTitle className="text-[#225b73] text-base sm:text-lg pr-8">
            {selectedClass.subject}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {getDayLabel(selectedClass.day)} • {selectedClass.time} • {selectedClass.classroom}
          </DialogDescription>
        </DialogHeader>

        {/* Note input area */}
        <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
          <div className="space-y-2">
            <label htmlFor="notes" className="text-xs sm:text-sm text-gray-700">
              {translations.classNotes}
            </label>
            <Textarea
              ref={textareaRef}
              id="notes"
              placeholder={translations.addNotesPlaceholder}
              value={currentNote}
              onChange={(e) => onNoteChange(e.target.value)}
              className="min-h-[180px] sm:min-h-[200px] resize-none text-sm"
            />
          </div>
        </div>

        {/* Action buttons */}
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto text-sm touch-manipulation"
          >
            {translations.cancel}
          </Button>
          <Button
            style={{ backgroundColor: '#225b73' }}
            className="text-white w-full sm:w-auto text-sm touch-manipulation"
            onClick={onSave}
          >
            {translations.saveNote}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
