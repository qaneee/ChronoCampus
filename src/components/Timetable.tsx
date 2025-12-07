import { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Users, GraduationCap, LogOut, StickyNote, Shield, Calendar, X, Trash2, Plus, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const translations = {
  en: {
    universityPortal: 'University Portal',
    studentDashboard: 'Student Dashboard',
    lecturerDashboard: 'Lecturer Dashboard',
    adminDashboard: 'Administrator Dashboard',
    logout: 'Logout',
    classTimetable: 'Class Timetable',
    manageUniversityTimetable: 'Manage university timetable',
    viewScheduleAndNotes: 'View schedule and add notes',
    viewTeachingSchedule: 'View teaching schedule',
    adminAccess: 'Admin Access',
    numerator: 'Numerator',
    denominator: 'Denominator',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    time: 'Time',
    classroom: 'Classroom',
    lecturer: 'Lecturer',
    group: 'Group',
    noClassesScheduled: 'No classes scheduled for',
    classNotes: 'Class Notes',
    addNotesPlaceholder: 'Add your notes for this class...',
    cancel: 'Cancel',
    saveNote: 'Save Note',
    editNote: 'Edit Note',
    addNote: 'Add Note',
    deleteNote: 'Delete Note',
    viewNote: 'View Note',
    noNotes: 'No notes yet. Click to add.'
  },
  hy: {
    universityPortal: 'Համալսարանի Պորտալ',
    studentDashboard: 'Ուսանողի Վահանակ',
    lecturerDashboard: 'Դասախոսի Վահանակ',
    adminDashboard: 'Ադմինիստրատորի Վահանակ',
    logout: 'Ելք',
    classTimetable: 'Դասացուցակ',
    manageUniversityTimetable: 'Կառավարել համալսարանի ժամանակացույցը',
    viewScheduleAndNotes: 'Դիտել ժամանակացույցը և ավելացնել նշումներ',
    viewTeachingSchedule: 'Դիտել դասավանդման ժամանակացույցը',
    adminAccess: 'Ադմին Մուտք',
    numerator: 'Համարիչ',
    denominator: 'Հայտարար',
    monday: 'Երկուշաբթի',
    tuesday: 'Երեքշաբթի',
    wednesday: 'Չորեքշաբթի',
    thursday: 'Հինգշաբթի',
    friday: 'Ուրբաթ',
    time: 'Ժամ',
    classroom: 'Լսարան',
    lecturer: 'Դասախոս',
    group: 'Խումբ',
    noClassesScheduled: 'Դասեր չկան նշանակված',
    classNotes: 'Դասի Նշումներ',
    addNotesPlaceholder: 'Ավելացրեք նշումներ այս դասի համար...',
    cancel: 'Չեղարկել',
    saveNote: 'Պահպանել Նշումը',
    editNote: 'Խմբագրել Նշումը',
    addNote: 'Ավելացնել Նշում',
    deleteNote: 'Ջնջել Նշումը',
    viewNote: 'Դիտել Նշումը',
    noNotes: 'Նշումներ դեռ չկան։ Սեղմեք ավելացնելու համար։'
  },
  ru: {
    universityPortal: 'Университетский Портал',
    studentDashboard: 'Панель Студента',
    lecturerDashboard: 'Панель Преподавателя',
    adminDashboard: 'Панель Администратора',
    logout: 'Выйти',
    classTimetable: 'Расписание Занятий',
    manageUniversityTimetable: 'Управление расписанием университета',
    viewScheduleAndNotes: 'Просмотр расписания и добавление заметок',
    viewTeachingSchedule: 'Просмотр расписания преподавания',
    adminAccess: 'Доступ Администратора',
    numerator: 'Числитель',
    denominator: 'Знаменатель',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    time: 'Время',
    classroom: 'Аудитория',
    lecturer: 'Преподаватель',
    group: 'Группа',
    noClassesScheduled: 'Нет занятий на',
    classNotes: 'Заметки к Занятию',
    addNotesPlaceholder: 'Добавьте заметки к этому занятию...',
    cancel: 'Отмена',
    saveNote: 'Сохранить Заметку',
    editNote: 'Редактировать Заметку',
    addNote: 'Добавить Заметку',
    deleteNote: 'Удалить Заметку',
    viewNote: 'Посмотреть Заметку',
    noNotes: 'Заметок пока нет. Нажмите, чтобы добавить.'
  }
};

interface TimetableProps {
  userRole: 'student' | 'lecturer' | 'admin';
  onLogout: () => void;
  language: 'en' | 'hy' | 'ru';
}

interface ClassSession {
  id: number;
  subject: string;
  lecturer: string;
  classroom: string;
  time: string;
  day: string;
  groups: string[];
  duration: string;
  week: 'numerator' | 'denominator' | 'both';
  teachingGroup?: string;
}

const mockTimetableData: ClassSession[] = [
  {
    id: 1,
    subject: 'Computer Science Fundamentals',
    lecturer: 'Prof. Sarah Johnson',
    classroom: '3201',
    time: '09:30 - 10:50',
    day: 'Monday',
    groups: ['CS-1A', 'CS-1B'],
    duration: '80 min',
    week: 'both',
    teachingGroup: 'IT101'
  },
  {
    id: 2,
    subject: 'Mathematics for Computing',
    lecturer: 'Prof. Michael Chen',
    classroom: '5308',
    time: '11:00 - 12:20',
    day: 'Monday',
    groups: ['CS-1A'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'MT205'
  },
  {
    id: 3,
    subject: 'Database Systems',
    lecturer: 'Prof. Emily Watson',
    classroom: '12405',
    time: '12:50 - 14:10',
    day: 'Monday',
    groups: ['CS-2A', 'CS-2B'],
    duration: '80 min',
    week: 'denominator',
    teachingGroup: 'DB319'
  },
  {
    id: 4,
    subject: 'Web Development',
    lecturer: 'Prof. James Martinez',
    classroom: '7210',
    time: '09:30 - 10:50',
    day: 'Tuesday',
    groups: ['CS-2A'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'WD217'
  },
  {
    id: 5,
    subject: 'Software Engineering',
    lecturer: 'Prof. Linda Brown',
    classroom: '1503',
    time: '12:50 - 14:10',
    day: 'Tuesday',
    groups: ['CS-3A', 'CS-3B'],
    duration: '80 min',
    week: 'both',
    teachingGroup: 'SE401'
  },
  {
    id: 6,
    subject: 'Data Structures & Algorithms',
    lecturer: 'Prof. Robert Lee',
    classroom: '8107',
    time: '11:00 - 12:20',
    day: 'Wednesday',
    groups: ['CS-2A', 'CS-2B'],
    duration: '80 min',
    week: 'denominator',
    teachingGroup: 'DS228'
  },
  {
    id: 7,
    subject: 'Operating Systems',
    lecturer: 'Prof. Sarah Johnson',
    classroom: '19312',
    time: '14:20 - 15:40',
    day: 'Wednesday',
    groups: ['CS-3A'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'OS315'
  },
  {
    id: 8,
    subject: 'Network Security',
    lecturer: 'Prof. Michael Chen',
    classroom: '4206',
    time: '09:30 - 10:50',
    day: 'Thursday',
    groups: ['CS-4A'],
    duration: '80 min',
    week: 'both',
    teachingGroup: 'NS419'
  },
  {
    id: 9,
    subject: 'Artificial Intelligence',
    lecturer: 'Prof. Emily Watson',
    classroom: '11508',
    time: '11:00 - 12:20',
    day: 'Thursday',
    groups: ['CS-4A', 'CS-4B'],
    duration: '80 min',
    week: 'denominator',
    teachingGroup: 'AI502'
  },
  {
    id: 10,
    subject: 'Mobile App Development',
    lecturer: 'Prof. James Martinez',
    classroom: '6409',
    time: '09:30 - 10:50',
    day: 'Friday',
    groups: ['CS-3A'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'MA334'
  },
  {
    id: 11,
    subject: 'Advanced Algorithms',
    lecturer: 'Prof. Michael Chen',
    classroom: '21104',
    time: '14:20 - 15:40',
    day: 'Monday',
    groups: ['CS-1A'],
    duration: '80 min',
    week: 'denominator',
    teachingGroup: 'AA156'
  },
  {
    id: 12,
    subject: 'Cloud Computing',
    lecturer: 'Prof. Emily Watson',
    classroom: '10302',
    time: '15:50 - 17:10',
    day: 'Monday',
    groups: ['CS-2A', 'CS-2B'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'CC298'
  },
  {
    id: 13,
    subject: 'Cybersecurity Fundamentals',
    lecturer: 'Prof. Robert Lee',
    classroom: '9215',
    time: '15:50 - 17:10',
    day: 'Tuesday',
    groups: ['CS-1A', 'CS-1B'],
    duration: '80 min',
    week: 'both',
    teachingGroup: 'CY124'
  },
  {
    id: 14,
    subject: 'Machine Learning',
    lecturer: 'Prof. Linda Brown',
    classroom: '14308',
    time: '15:50 - 17:10',
    day: 'Wednesday',
    groups: ['CS-4A'],
    duration: '80 min',
    week: 'numerator',
    teachingGroup: 'ML503'
  },
  {
    id: 15,
    subject: 'Blockchain Technology',
    lecturer: 'Prof. James Martinez',
    classroom: '18409',
    time: '14:20 - 15:40',
    day: 'Thursday',
    groups: ['CS-3A', 'CS-3B'],
    duration: '80 min',
    week: 'both',
    teachingGroup: 'BT387'
  }
];

export function Timetable({ userRole, onLogout, language }: TimetableProps) {
  const t = translations[language];
  const days = [
    { key: 'Monday', label: t.monday },
    { key: 'Tuesday', label: t.tuesday },
    { key: 'Wednesday', label: t.wednesday },
    { key: 'Thursday', label: t.thursday },
    { key: 'Friday', label: t.friday }
  ];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedWeek, setSelectedWeek] = useState<'numerator' | 'denominator'>('numerator');
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  const [classNotes, setClassNotes] = useState<Record<number, string>>({});
  const [currentNote, setCurrentNote] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Record<number, boolean>>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (notesDialogOpen && textareaRef.current) {
      const textarea = textareaRef.current;
      // Small delay to ensure the dialog is fully rendered
      setTimeout(() => {
        textarea.focus();
        // Set cursor to the end
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      }, 100);
    }
  }, [notesDialogOpen]);

  const filteredClasses = mockTimetableData.filter(
    (session) => session.day === selectedDay && (session.week === selectedWeek || session.week === 'both')
  );

  const handleOpenNoteDialog = (session: ClassSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedClass(session);
    setCurrentNote(classNotes[session.id] || '');
    setNotesDialogOpen(true);
  };

  const handleDeleteNote = (sessionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newNotes = { ...classNotes };
    delete newNotes[sessionId];
    setClassNotes(newNotes);
    // Collapse the note section after deletion
    setExpandedNotes(prev => ({ ...prev, [sessionId]: false }));
  };

  const toggleNoteExpansion = (sessionId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNotes(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  const handleSaveNote = () => {
    if (selectedClass) {
      setClassNotes(prev => ({
        ...prev,
        [selectedClass.id]: currentNote
      }));
    }
    setNotesDialogOpen(false);
    setSelectedClass(null);
    setCurrentNote('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#225b73] flex items-center justify-center flex-shrink-0">
              {userRole === 'admin' ? (
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : userRole === 'student' ? (
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-[#225b73] text-base sm:text-xl">{t.universityPortal}</h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                {userRole === 'admin' ? t.adminDashboard : userRole === 'student' ? t.studentDashboard : t.lecturerDashboard}
              </p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t.logout}</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1 overflow-hidden flex flex-col">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="mb-1 sm:mb-2 text-xl sm:text-3xl">{t.classTimetable}</h1>
              <p className="text-gray-600 text-sm">
                {userRole === 'admin'
                  ? t.manageUniversityTimetable
                  : userRole === 'student' 
                  ? t.viewScheduleAndNotes
                  : t.viewTeachingSchedule}
              </p>
            </div>
            {userRole === 'admin' && (
              <Badge className="bg-amber-500 text-white hover:bg-amber-600 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                {t.adminAccess}
              </Badge>
            )}
          </div>
        </div>

        {/* Week Selector */}
        <div className="mb-4">
          <Tabs value={selectedWeek} onValueChange={(value) => setSelectedWeek(value as 'numerator' | 'denominator')}>
            <TabsList className="grid w-full max-w-md grid-cols-2 text-xs sm:text-sm">
              <TabsTrigger value="numerator">{t.numerator}</TabsTrigger>
              <TabsTrigger value="denominator">{t.denominator}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Day Selector */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {days.map((day) => (
            <Button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              variant={selectedDay === day.key ? 'default' : 'outline'}
              className={`${selectedDay === day.key ? 'bg-[#225b73]' : ''} text-xs sm:text-sm whitespace-nowrap w-[110px] sm:w-[130px] flex items-center justify-center gap-2`}
            >
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{day.label}</span>
            </Button>
          ))}
        </div>

        {/* Timetable Grid */}
        <div className="space-y-3 overflow-y-auto flex-1">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((session) => (
              <Card 
                key={session.id} 
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-[#225b73] text-base sm:text-xl truncate">
                          {session.subject}
                        </CardTitle>
                        {classNotes[session.id] && (
                          <StickyNote className="w-4 h-4 text-amber-500 fill-amber-100 flex-shrink-0" />
                        )}
                        {session.week !== 'both' && (
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {session.week === 'numerator' ? 'N' : 'D'}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {session.groups.map((group) => (
                          <Badge key={group} variant="secondary" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge className="bg-[#225b73]/10 text-[#225b73] hover:bg-[#225b73]/20 text-xs whitespace-nowrap flex-shrink-0 h-fit">
                      {session.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">{t.time}</p>
                        <p className="text-sm sm:text-base text-gray-900 truncate">{session.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">{t.classroom}</p>
                        <p className="text-sm sm:text-base text-gray-900 truncate">{session.classroom}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">{userRole === 'lecturer' ? t.group : t.lecturer}</p>
                        <p className="text-sm sm:text-base text-gray-900 truncate">
                          {userRole === 'lecturer' ? session.teachingGroup : session.lecturer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section - Redesigned */}
                  {userRole === 'student' && (
                    <div className="border-t border-gray-100 pt-3">
                      {classNotes[session.id] ? (
                        <Collapsible
                          open={expandedNotes[session.id]}
                          onOpenChange={(open) => setExpandedNotes(prev => ({ ...prev, [session.id]: open }))}
                        >
                          <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between p-3 gap-2">
                              <CollapsibleTrigger 
                                className="flex items-center gap-2 flex-1 min-w-0 hover:opacity-70 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <StickyNote className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <span className="text-sm text-amber-900 truncate">
                                  {expandedNotes[session.id] ? t.classNotes : classNotes[session.id]}
                                </span>
                              </CollapsibleTrigger>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  className="h-7 w-7 rounded-md hover:bg-amber-200 transition-colors flex items-center justify-center"
                                  onClick={(e) => handleOpenNoteDialog(session, e)}
                                  type="button"
                                >
                                  <Edit className="w-3.5 h-3.5 text-amber-700" />
                                </button>
                                <button
                                  className="h-7 w-7 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center"
                                  onClick={(e) => handleDeleteNote(session.id, e)}
                                  type="button"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                </button>
                              </div>
                            </div>
                            <CollapsibleContent>
                              <div className="px-3 pb-3 pt-1 border-t border-amber-300">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                                  {classNotes[session.id]}
                                </p>
                              </div>
                            </CollapsibleContent>
                          </div>
                        </Collapsible>
                      ) : (
                        <button
                          onClick={(e) => handleOpenNoteDialog(session, e)}
                          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#225b73] hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-500 hover:text-[#225b73]"
                          type="button"
                        >
                          <Plus className="w-4 h-4" />
                          <span className="text-sm">{t.addNote}</span>
                        </button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 sm:py-12 text-center">
                <p className="text-gray-500 text-sm sm:text-base">
                  {t.noClassesScheduled} {days.find(d => d.key === selectedDay)?.label}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Notes Dialog */}
        <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-[#225b73]">
                {selectedClass?.subject}
              </DialogTitle>
              <DialogDescription>
                {selectedClass && days.find(d => d.key === selectedClass.day)?.label} • {selectedClass?.time} • {selectedClass?.classroom}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm text-gray-700">
                  {t.classNotes}
                </label>
                <Textarea
                  ref={textareaRef}
                  id="notes"
                  placeholder={t.addNotesPlaceholder}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setNotesDialogOpen(false);
                  setCurrentNote('');
                }}
              >
                {t.cancel}
              </Button>
              <Button
                style={{ backgroundColor: '#225b73' }}
                className="text-white"
                onClick={handleSaveNote}
              >
                {t.saveNote}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}