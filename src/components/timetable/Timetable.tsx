import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';
import { TimetableHeader } from './TimetableHeader';
import { ViewModeSelector } from './ViewModeSelector';
import { WeekSelector } from './WeekSelector';
import { DaySelector } from './DaySelector';
import { EnhancedClassCard } from './EnhancedClassCard';
import { EnhancedNoteDialog } from './EnhancedNoteDialog';
import { NotesListDialog } from './NotesListDialog';
import { FeedbackDialog } from '../FeedbackDialog';
import { UserRole, Language, DayOfWeek } from '../../types';
import { Note, NoteCategory, ClassNotesMap } from '../../types/notes';
import { translations } from '../../constants/translations';
import { mockTimetableData } from '../../constants/mockData';
import { getUniqueValues } from '../../utils/helpers';
import { createNote, updateNote } from '../../utils/noteHelpers';

// ============================================================================
// Component Props
// ============================================================================

interface TimetableProps {
  userRole: UserRole;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  userName?: string;
}

// ============================================================================
// LocalStorage Keys
// ============================================================================

const NOTES_STORAGE_KEY = 'chronocampus_class_notes';

// ============================================================================
// Main Component
// ============================================================================

export function Timetable({ userRole, onLogout, language, onLanguageChange, userName }: TimetableProps) {
  // Get translations for current language
  const t = translations[language];

  // ============================================================================
  // State Management
  // ============================================================================

  // Navigation state
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedWeek, setSelectedWeek] = useState<'numerator' | 'denominator'>('numerator');
  
  // View mode state - always in group view mode
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  
  // Notes state - now supporting multiple notes per class with localStorage persistence
  const [classNotes, setClassNotes] = useState<ClassNotesMap>(() => {
    // Load notes from localStorage on initial render
    if (typeof window !== 'undefined') {
      try {
        const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
        if (savedNotes) {
          return JSON.parse(savedNotes);
        }
      } catch (error) {
        console.error('Failed to load notes from localStorage:', error);
      }
    }
    return {};
  });
  
  // Note editor state
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [notesListDialogOpen, setNotesListDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // Note form state
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<NoteCategory>('general');
  const [notePinned, setNotePinned] = useState(false);

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Save notes to localStorage whenever they change
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(classNotes));
      } catch (error) {
        console.error('Failed to save notes to localStorage:', error);
      }
    }
  }, [classNotes]);

  // ============================================================================
  // Computed Values
  // ============================================================================

  /**
   * Get all available groups from the timetable data
   */
  const availableGroups = getUniqueValues(
    mockTimetableData.flatMap(session => session.groups)
  ).sort();

  /**
   * Filter classes based on current selections
   */
  const getFilteredClasses = () => {
    let filtered = mockTimetableData.filter(
      (session) => 
        session.day === selectedDay && 
        (session.week === selectedWeek || session.week === 'both')
    );

    // If viewing group schedule, filter by selected group
    if (selectedGroup) {
      filtered = filtered.filter(session => 
        session.groups.includes(selectedGroup)
      );
    }

    return filtered;
  };

  const filteredClasses = getFilteredClasses();

  // ============================================================================
  // Note Management Functions
  // ============================================================================

  /**
   * Reset note form to default state
   */
  const resetNoteForm = () => {
    setNoteContent('');
    setNoteCategory('general');
    setNotePinned(false);
    setEditingNote(null);
  };

  /**
   * Open the note editor for a new note
   */
  const handleAddNote = (classId: number) => {
    resetNoteForm();
    setSelectedClassId(classId);
    setNoteDialogOpen(true);
  };

  /**
   * Open the note editor for editing an existing note
   */
  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNoteContent(note.content);
    setNoteCategory(note.category);
    setNotePinned(note.isPinned);
    setNoteDialogOpen(true);
  };

  /**
   * Save the current note (create new or update existing)
   */
  const handleSaveNote = () => {
    if (!selectedClassId || !noteContent.trim()) return;

    const classId = selectedClassId;

    if (editingNote) {
      // Update existing note
      const updatedNote = updateNote(editingNote, {
        content: noteContent.trim(),
        category: noteCategory,
        isPinned: notePinned
      });

      setClassNotes(prev => ({
        ...prev,
        [classId]: (prev[classId] || []).map(n => 
          n.id === editingNote.id ? updatedNote : n
        )
      }));

      toast.success(t.noteSaved);
    } else {
      // Create new note
      const newNote = createNote(noteContent.trim(), noteCategory);
      newNote.isPinned = notePinned;

      setClassNotes(prev => ({
        ...prev,
        [classId]: [...(prev[classId] || []), newNote]
      }));

      toast.success(t.noteSaved);
    }

    handleCloseNoteDialog();
  };

  /**
   * Save the current note and keep dialog open to add another
   */
  const handleSaveAndAddAnother = () => {
    if (!selectedClassId || !noteContent.trim()) return;

    const classId = selectedClassId;

    if (editingNote) {
      // Update existing note
      const updatedNote = updateNote(editingNote, {
        content: noteContent.trim(),
        category: noteCategory,
        isPinned: notePinned
      });

      setClassNotes(prev => ({
        ...prev,
        [classId]: (prev[classId] || []).map(n => 
          n.id === editingNote.id ? updatedNote : n
        )
      }));

      toast.success(t.noteSaved);
      handleCloseNoteDialog();
    } else {
      // Create new note
      const newNote = createNote(noteContent.trim(), noteCategory);
      newNote.isPinned = notePinned;

      setClassNotes(prev => ({
        ...prev,
        [classId]: [...(prev[classId] || []), newNote]
      }));

      toast.success(t.noteSaved);
      
      // Reset form for next note
      setNoteContent('');
      setNoteCategory('general');
      setNotePinned(false);
      setEditingNote(null);
    }
  };

  /**
   * Delete a note
   */
  const handleDeleteNote = (noteId: string) => {
    if (!selectedClassId) return;

    setClassNotes(prev => ({
      ...prev,
      [selectedClassId]: (prev[selectedClassId] || []).filter(n => n.id !== noteId)
    }));

    toast.success(t.noteDeleted);
  };

  /**
   * Toggle pin status of a note
   */
  const handleTogglePin = (noteId: string) => {
    if (!selectedClassId) return;

    setClassNotes(prev => ({
      ...prev,
      [selectedClassId]: (prev[selectedClassId] || []).map(note =>
        note.id === noteId
          ? updateNote(note, { isPinned: !note.isPinned })
          : note
      )
    }));
  };

  /**
   * Open the notes list dialog
   */
  const handleOpenNotesList = (classId: number) => {
    setSelectedClassId(classId);
    setNotesListDialogOpen(true);
  };

  /**
   * Close the note editor dialog
   */
  const handleCloseNoteDialog = () => {
    setNoteDialogOpen(false);
    resetNoteForm();
  };

  /**
   * Close the notes list dialog
   */
  const handleCloseNotesList = () => {
    setNotesListDialogOpen(false);
    setSelectedClassId(null);
  };

  /**
   * Open note editor from the notes list
   */
  const handleAddNoteFromList = () => {
    setNotesListDialogOpen(false);
    resetNoteForm();
    setNoteDialogOpen(true);
  };

  /**
   * Edit a note from the notes list
   */
  const handleEditNoteFromList = (note: Note) => {
    setNotesListDialogOpen(false);
    handleEditNote(note);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header Section */}
      <TimetableHeader 
        userRole={userRole}
        onLogout={onLogout}
        translations={t}
        onLanguageChange={onLanguageChange}
        language={language}
        userName={userName}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 flex-1 overflow-hidden flex flex-col w-full">
        
        {/* Page Title and Description */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="min-w-0 w-full sm:w-auto">
              <h1 className="mb-1 sm:mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl truncate dark:text-gray-100">
                {t.classTimetable}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                {userRole === 'admin'
                  ? t.manageUniversityTimetable
                  : userRole === 'student' 
                  ? t.viewScheduleAndNotes
                  : t.viewTeachingSchedule}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Feedback Button for Students and Lecturers */}
              {(userRole === 'student' || userRole === 'lecturer') && (
                <FeedbackDialog
                  language={language}
                  userRole={userRole}
                  userName={userName || (userRole === 'student' ? 'John Doe' : 'Prof. Jane Smith')}
                />
              )}
              
              {/* Admin badge */}
              {userRole === 'admin' && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-xs flex-shrink-0">
                  <Shield className="w-3 h-3 mr-1" />
                  {t.adminAccess}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* View Mode Selector: My Schedule vs Group Schedule */}
        <ViewModeSelector
          viewMode={'group'}
          selectedGroup={selectedGroup}
          availableGroups={availableGroups}
          onViewModeChange={() => {}}
          onGroupChange={setSelectedGroup}
          translations={t}
        />

        {/* Week Selector: Numerator vs Denominator */}
        <WeekSelector
          selectedWeek={selectedWeek}
          onWeekChange={setSelectedWeek}
          translations={t}
        />

        {/* Day Selector: Monday - Friday */}
        <DaySelector
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          translations={t}
        />

        {/* Timetable Grid: List of Classes */}
        <div className="space-y-2 sm:space-y-3 overflow-y-auto flex-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          {filteredClasses.length > 0 ? (
            // Show all filtered classes
            filteredClasses.map((session) => {
              const sessionNotes = classNotes[session.id] || [];

              return (
                <EnhancedClassCard
                  key={session.id}
                  session={session}
                  userRole={userRole}
                  translations={t}
                  language={language}
                  notes={sessionNotes}
                  onOpenNotesList={() => handleOpenNotesList(session.id)}
                  onAddNote={() => handleAddNote(session.id)}
                />
              );
            })
          ) : (
            // No classes found message
            <Card className="dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="py-6 sm:py-8 md:py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                  {t.noClassesScheduled} {t[selectedDay.toLowerCase() as keyof typeof t]}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Note Editor Dialog */}
        <EnhancedNoteDialog
          isOpen={noteDialogOpen}
          selectedClass={selectedClassId !== null ? mockTimetableData.find(s => s.id === selectedClassId) || null : null}
          editingNote={editingNote}
          noteContent={noteContent}
          noteCategory={noteCategory}
          isPinned={notePinned}
          translations={t}
          language={language}
          onClose={handleCloseNoteDialog}
          onNoteChange={setNoteContent}
          onCategoryChange={setNoteCategory}
          onPinnedChange={setNotePinned}
          onSave={handleSaveNote}
          onSaveAndAddAnother={handleSaveAndAddAnother}
        />

        {/* Notes List Dialog */}
        <NotesListDialog
          isOpen={notesListDialogOpen}
          selectedClass={selectedClassId !== null ? mockTimetableData.find(s => s.id === selectedClassId) || null : null}
          notes={selectedClassId !== null ? classNotes[selectedClassId] || [] : []}
          translations={t}
          language={language}
          onClose={handleCloseNotesList}
          onAddNote={handleAddNoteFromList}
          onEditNote={handleEditNoteFromList}
          onDeleteNote={handleDeleteNote}
          onTogglePin={handleTogglePin}
        />
      </main>
    </div>
  );
}