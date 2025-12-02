import { useState } from 'react';
import { Plus, Search, Edit, Trash2, AlertTriangle, Calendar, Clock, MapPin, Users, BookOpen, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

const translations = {
  en: {
    placeManagement: 'Schedule & Place Management',
    subtitle: 'Comprehensive class scheduling with conflict detection and capacity management',
    addSchedule: 'Add Schedule',
    searchSchedules: 'Search schedules...',
    subject: 'Subject',
    teacher: 'Teacher',
    classroom: 'Classroom',
    group: 'Group',
    day: 'Day',
    time: 'Time',
    week: 'Week',
    capacity: 'Capacity',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    editSchedule: 'Edit Schedule',
    addNewSchedule: 'Add New Schedule',
    confirmDelete: 'Confirm Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this schedule? This action cannot be undone.',
    selectSubject: 'Select subject',
    selectTeacher: 'Select teacher',
    selectClassroom: 'Select classroom',
    selectGroup: 'Select group',
    selectDay: 'Select day',
    selectTime: 'Select time slot',
    selectWeek: 'Select week',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    numerator: 'Numerator',
    denominator: 'Denominator',
    both: 'Both',
    conflictsDetected: 'Conflicts Detected!',
    warningsDetected: 'Warnings Detected',
    teacherConflict: 'Teacher is already scheduled at this time',
    classroomConflict: 'Classroom is already booked at this time',
    groupConflict: 'Group already has a class at this time',
    capacityWarning: 'Classroom capacity insufficient for group size',
    cannotSave: 'Cannot save due to time conflicts',
    canSaveWithWarning: 'You can save but please review capacity warnings',
    noConflicts: 'No conflicts or warnings detected',
    allFieldsRequired: 'Please fill in all fields',
    students: 'students',
    seats: 'seats',
    overcapacity: 'Overcapacity',
    okCapacity: 'OK'
  },
  hy: {
    placeManagement: 'Ժամանակացույցի և Տեղանքի Կառավարում',
    subtitle: 'Համապարփակ դասերի ժամանակացույց հակասությունների հայտնաբերմամբ և տարողության կառավարմամբ',
    addSchedule: 'Ավելացնել Ժամանակացույց',
    searchSchedules: 'Փնտրել ժամանակացույցեր...',
    subject: 'Առարկա',
    teacher: 'Դասախոս',
    classroom: 'Լսարան',
    group: 'Խումբ',
    day: 'Օր',
    time: 'Ժամ',
    week: 'Շաբաթ',
    capacity: 'Տարողություն',
    actions: 'Գործողություններ',
    edit: 'Խմբագրել',
    delete: 'Ջնջել',
    cancel: 'Չեղարկել',
    save: 'Պահպանել',
    editSchedule: 'Խմբագրել Ժամանակացույցը',
    addNewSchedule: 'Ավելացնել Նոր Ժամանակացույց',
    confirmDelete: 'Հաստատել Ջնջումը',
    confirmDeleteMessage: 'Վստա՞հ եք, որ ցանկանում եք ջնջել այս ժամանակացույցը: Այս գործողությունը հնարավոր չէ հետ շրջել:',
    selectSubject: 'Ընտրել առարկա',
    selectTeacher: 'Ընտրել դասախոս',
    selectClassroom: 'Ընտրել լսարան',
    selectGroup: 'Ընտրել խումբ',
    selectDay: 'Ընտրել օր',
    selectTime: 'Ընտրել ժամային պարապմունք',
    selectWeek: 'Ընտրել շաբաթ',
    monday: 'Երկուշաբթի',
    tuesday: 'Երեքշաբթի',
    wednesday: 'Չորեքշաբթի',
    thursday: 'Հինգշաբթի',
    friday: 'Ուրբաթ',
    numerator: 'Համարիչ',
    denominator: 'Հայտարար',
    both: 'Երկուսն էլ',
    conflictsDetected: 'Հայտնաբերված են Հակասություններ',
    warningsDetected: 'Հայտնաբերված են Նախազգուշացումներ',
    teacherConflict: 'Դասախոսը արդեն նշանակված է այս ժամին',
    classroomConflict: 'Լսարանը արդեն զբաղված է այս ժամին',
    groupConflict: 'Խումբը արդեն ունի դաս այս ժամին',
    capacityWarning: 'Լսարանի տարողությունը անբավարար է խմբի չափի համար',
    cannotSave: 'Հնարավոր չէ պահպանել ժամանակային հակասությունների պատճառով',
    canSaveWithWarning: 'Կարող եք պահպանել, բայց խնդրում ենք վերանայել տարողության նախազգուշացումները',
    noConflicts: 'Հակասություններ կամ նախազգուշացումներ չեն հայտնաբերվել',
    allFieldsRequired: 'Խնդրում ենք լրացնել բոլոր դաշտերը',
    students: 'ուսանողներ',
    seats: 'նստատեղեր',
    overcapacity: 'Գերազանց',
    okCapacity: 'Լավ'
  },
  ru: {
    placeManagement: 'Управление Расписанием и Местами',
    subtitle: 'Комплексное планирование занятий с обнаружением конфликтов и управлением вместимостью',
    addSchedule: 'Добавить Расписание',
    searchSchedules: 'Искать расписания...',
    subject: 'Предмет',
    teacher: 'Преподаватель',
    classroom: 'Аудитория',
    group: 'Группа',
    day: 'День',
    time: 'Время',
    week: 'Неделя',
    capacity: 'Вместимость',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отмена',
    save: 'Сохранить',
    editSchedule: 'Редактировать Расписание',
    addNewSchedule: 'Добавить Новое Расписание',
    confirmDelete: 'Подтвердить Удаление',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить это расписание? Это действие нельзя отменить.',
    selectSubject: 'Выберите предмет',
    selectTeacher: 'Выберите преподавателя',
    selectClassroom: 'Выберите аудиторию',
    selectGroup: 'Выберите группу',
    selectDay: 'Выберите день',
    selectTime: 'Выберите временной интервал',
    selectWeek: 'Выберите неделю',
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    numerator: 'Числитель',
    denominator: 'Знаменатель',
    both: 'Обе',
    conflictsDetected: 'Обнаружены Конфликты!',
    warningsDetected: 'Обнаружены Предупреждения',
    teacherConflict: 'Преподаватель уже занят в это время',
    classroomConflict: 'Аудитория уже занята в это время',
    groupConflict: 'Группа уже имеет занятие в это время',
    capacityWarning: 'Вместимость аудитории недостаточна для размера группы',
    cannotSave: 'Невозможно сохранить из-за временных конфликтов',
    canSaveWithWarning: 'Вы можете сохранить, но пожалуйста, проверьте предупреждения о вместимости',
    noConflicts: 'Конфликты или предупреждения не обнаружены',
    allFieldsRequired: 'Пожалуйста, заполните все поля',
    students: 'студентов',
    seats: 'мест',
    overcapacity: 'Превышение',
    okCapacity: 'OK'
  }
};

interface Schedule {
  id: number;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  classroomId: number;
  classroomNumber: string;
  classroomCapacity: number;
  groupId: number;
  groupCode: string;
  groupSize: number;
  day: string;
  timeSlot: string;
  week: 'numerator' | 'denominator' | 'both';
}

interface PlaceManagementProps {
  language: 'en' | 'hy' | 'ru';
}

interface ConflictCheck {
  hasTimeConflicts: boolean;
  hasCapacityWarning: boolean;
  timeConflicts: string[];
  capacityWarning?: string;
}

const mockSubjects = [
  { id: 1, name: 'Computer Science Fundamentals', code: 'IT101' },
  { id: 2, name: 'Mathematics for Computing', code: 'MT205' },
  { id: 3, name: 'Database Systems', code: 'DB319' },
  { id: 4, name: 'Web Development', code: 'WD217' },
  { id: 5, name: 'Software Engineering', code: 'SE401' },
];

const mockTeachers = [
  { id: 1, name: 'Prof. Sarah Johnson' },
  { id: 2, name: 'Prof. Michael Chen' },
  { id: 3, name: 'Prof. Emily Watson' },
  { id: 4, name: 'Prof. James Martinez' },
  { id: 5, name: 'Prof. Linda Brown' },
];

const mockClassrooms = [
  { id: 1, number: '3201', capacity: 30 },
  { id: 2, number: '5308', capacity: 40 },
  { id: 3, number: '12405', capacity: 35 },
  { id: 4, number: '7210', capacity: 25 },
  { id: 5, number: '1503', capacity: 50 },
];

const mockGroups = [
  { id: 1, code: 'CS-1A', size: 25 },
  { id: 2, code: 'CS-1B', size: 28 },
  { id: 3, code: 'CS-2A', size: 32 },
  { id: 4, code: 'CS-2B', size: 24 },
  { id: 5, code: 'CS-3A', size: 35 },
];

const timeSlots = [
  '09:30 - 10:50',
  '11:00 - 12:20',
  '12:50 - 14:10',
  '14:20 - 15:40',
  '15:50 - 17:10'
];

const initialSchedules: Schedule[] = [
  {
    id: 1,
    subjectId: 1,
    subjectName: 'Computer Science Fundamentals',
    teacherId: 1,
    teacherName: 'Prof. Sarah Johnson',
    classroomId: 1,
    classroomNumber: '3201',
    classroomCapacity: 30,
    groupId: 1,
    groupCode: 'CS-1A',
    groupSize: 25,
    day: 'Monday',
    timeSlot: '09:30 - 10:50',
    week: 'both'
  },
  {
    id: 2,
    subjectId: 2,
    subjectName: 'Mathematics for Computing',
    teacherId: 2,
    teacherName: 'Prof. Michael Chen',
    classroomId: 2,
    classroomNumber: '5308',
    classroomCapacity: 40,
    groupId: 1,
    groupCode: 'CS-1A',
    groupSize: 25,
    day: 'Monday',
    timeSlot: '11:00 - 12:20',
    week: 'numerator'
  },
];

export function PlaceManagement({ language }: PlaceManagementProps) {
  const t = translations[language];
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null);
  const [conflictCheck, setConflictCheck] = useState<ConflictCheck>({
    hasTimeConflicts: false,
    hasCapacityWarning: false,
    timeConflicts: [],
  });
  const [formData, setFormData] = useState({
    subjectId: 0,
    teacherId: 0,
    classroomId: 0,
    groupId: 0,
    day: '',
    timeSlot: '',
    week: 'both' as Schedule['week']
  });

  const days = [
    { key: 'Monday', label: t.monday },
    { key: 'Tuesday', label: t.tuesday },
    { key: 'Wednesday', label: t.wednesday },
    { key: 'Thursday', label: t.thursday },
    { key: 'Friday', label: t.friday }
  ];

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.groupCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.classroomNumber.includes(searchTerm)
  );

  const checkAllConflicts = (data: typeof formData, currentScheduleId?: number): ConflictCheck => {
    const timeConflicts: string[] = [];
    let capacityWarning: string | undefined;
    
    // Get selected classroom and group for capacity check
    const selectedClassroom = mockClassrooms.find((c) => c.id === data.classroomId);
    const selectedGroup = mockGroups.find((g) => g.id === data.groupId);
    
    // Check capacity
    if (selectedClassroom && selectedGroup) {
      if (selectedGroup.size > selectedClassroom.capacity) {
        capacityWarning = `${t.capacityWarning}: ${selectedGroup.size} ${t.students} > ${selectedClassroom.capacity} ${t.seats}`;
      }
    }
    
    // Check time conflicts
    schedules.forEach((schedule) => {
      // Skip the schedule being edited
      if (currentScheduleId && schedule.id === currentScheduleId) return;
      
      // Check if it's the same day and time
      if (schedule.day !== data.day || schedule.timeSlot !== data.timeSlot) return;
      
      // Check if weeks overlap
      const weeksOverlap = 
        data.week === 'both' || 
        schedule.week === 'both' || 
        data.week === schedule.week;
      
      if (!weeksOverlap) return;
      
      // Teacher conflict
      if (schedule.teacherId === data.teacherId) {
        timeConflicts.push(t.teacherConflict);
      }
      
      // Classroom conflict
      if (schedule.classroomId === data.classroomId) {
        timeConflicts.push(t.classroomConflict);
      }
      
      // Group conflict
      if (schedule.groupId === data.groupId) {
        timeConflicts.push(t.groupConflict);
      }
    });
    
    return {
      hasTimeConflicts: timeConflicts.length > 0,
      hasCapacityWarning: !!capacityWarning,
      timeConflicts: [...new Set(timeConflicts)], // Remove duplicates
      capacityWarning
    };
  };

  const handleAddSchedule = () => {
    setEditingSchedule(null);
    setFormData({
      subjectId: 0,
      teacherId: 0,
      classroomId: 0,
      groupId: 0,
      day: '',
      timeSlot: '',
      week: 'both'
    });
    setConflictCheck({
      hasTimeConflicts: false,
      hasCapacityWarning: false,
      timeConflicts: [],
    });
    setDialogOpen(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setFormData({
      subjectId: schedule.subjectId,
      teacherId: schedule.teacherId,
      classroomId: schedule.classroomId,
      groupId: schedule.groupId,
      day: schedule.day,
      timeSlot: schedule.timeSlot,
      week: schedule.week
    });
    setConflictCheck({
      hasTimeConflicts: false,
      hasCapacityWarning: false,
      timeConflicts: [],
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (schedule: Schedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (scheduleToDelete) {
      setSchedules(schedules.filter((s) => s.id !== scheduleToDelete.id));
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Check for conflicts when key fields are filled
    if (newFormData.day && newFormData.timeSlot && newFormData.teacherId && newFormData.classroomId && newFormData.groupId) {
      const conflicts = checkAllConflicts(newFormData, editingSchedule?.id);
      setConflictCheck(conflicts);
    } else {
      setConflictCheck({
        hasTimeConflicts: false,
        hasCapacityWarning: false,
        timeConflicts: [],
      });
    }
  };

  const handleSave = () => {
    // Validate all fields are filled
    if (!formData.subjectId || !formData.teacherId || !formData.classroomId || !formData.groupId || !formData.day || !formData.timeSlot) {
      alert(t.allFieldsRequired);
      return;
    }

    // Don't allow saving if there are TIME conflicts (capacity warnings are OK)
    if (conflictCheck.hasTimeConflicts) {
      return;
    }
    
    const subject = mockSubjects.find((s) => s.id === formData.subjectId);
    const teacher = mockTeachers.find((t) => t.id === formData.teacherId);
    const classroom = mockClassrooms.find((c) => c.id === formData.classroomId);
    const group = mockGroups.find((g) => g.id === formData.groupId);
    
    if (!subject || !teacher || !classroom || !group) return;
    
    if (editingSchedule) {
      setSchedules(
        schedules.map((s) =>
          s.id === editingSchedule.id
            ? {
                ...s,
                ...formData,
                subjectName: subject.name,
                teacherName: teacher.name,
                classroomNumber: classroom.number,
                classroomCapacity: classroom.capacity,
                groupCode: group.code,
                groupSize: group.size
              }
            : s
        )
      );
    } else {
      const newSchedule: Schedule = {
        id: Math.max(...schedules.map((s) => s.id), 0) + 1,
        ...formData,
        subjectName: subject.name,
        teacherName: teacher.name,
        classroomNumber: classroom.number,
        classroomCapacity: classroom.capacity,
        groupCode: group.code,
        groupSize: group.size
      };
      setSchedules([...schedules, newSchedule]);
    }
    setDialogOpen(false);
  };

  const getWeekBadgeColor = (week: Schedule['week']) => {
    switch (week) {
      case 'numerator':
        return 'bg-blue-500 text-white';
      case 'denominator':
        return 'bg-purple-500 text-white';
      case 'both':
        return 'bg-green-500 text-white';
    }
  };

  const getWeekLabel = (week: Schedule['week']) => {
    switch (week) {
      case 'numerator':
        return t.numerator;
      case 'denominator':
        return t.denominator;
      case 'both':
        return t.both;
    }
  };

  const getCapacityStatus = (schedule: Schedule) => {
    if (schedule.groupSize > schedule.classroomCapacity) {
      return {
        status: 'overcapacity',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        icon: <XCircle className="w-4 h-4" />
      };
    }
    return {
      status: 'ok',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: <CheckCircle2 className="w-4 h-4" />
    };
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="mb-2">{t.placeManagement}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <Button onClick={handleAddSchedule} className="bg-[#225b73] hover:bg-[#1a4659] w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {t.addSchedule}
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t.searchSchedules}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Schedules Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.subject}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.teacher}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.group}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.day}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.time}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.classroom}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.capacity}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.week}
                  </th>
                  <th className="px-6 py-4 text-right text-xs text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedules.map((schedule) => {
                  const capacityStatus = getCapacityStatus(schedule);
                  return (
                    <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-900">{schedule.subjectName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{schedule.teacherName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <Badge className="bg-[#225b73] text-white">{schedule.groupCode}</Badge>
                          <span className="text-xs text-gray-500">({schedule.groupSize})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {days.find((d) => d.key === schedule.day)?.label}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {schedule.timeSlot}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {schedule.classroomNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded ${capacityStatus.bgColor}`}>
                          {capacityStatus.icon}
                          <span className={`text-xs ${capacityStatus.color}`}>
                            {schedule.groupSize}/{schedule.classroomCapacity}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getWeekBadgeColor(schedule.week)}>
                          {getWeekLabel(schedule.week)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSchedule(schedule)}
                          className="mr-2"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(schedule)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingSchedule ? t.editSchedule : t.addNewSchedule}</DialogTitle>
              <DialogDescription>
                {editingSchedule ? 'Update schedule information with conflict detection' : 'Add a new class to the schedule with conflict detection'}
              </DialogDescription>
            </DialogHeader>
            
            {/* Time Conflict Alerts (CRITICAL - BLOCKS SAVING) */}
            {conflictCheck.hasTimeConflicts && (
              <Alert variant="destructive" className="my-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-1">{t.conflictsDetected}</div>
                  <ul className="list-disc list-inside space-y-1">
                    {conflictCheck.timeConflicts.map((conflict, index) => (
                      <li key={index} className="text-sm">{conflict}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-sm font-semibold">{t.cannotSave}</div>
                </AlertDescription>
              </Alert>
            )}

            {/* Capacity Warning (WARNING - DOESN'T BLOCK SAVING) */}
            {!conflictCheck.hasTimeConflicts && conflictCheck.hasCapacityWarning && (
              <Alert className="my-4 border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription>
                  <div className="font-semibold mb-1 text-yellow-800">{t.warningsDetected}</div>
                  <div className="text-sm text-yellow-700">{conflictCheck.capacityWarning}</div>
                  <div className="mt-2 text-sm text-yellow-700">{t.canSaveWithWarning}</div>
                </AlertDescription>
              </Alert>
            )}

            {/* No Issues */}
            {!conflictCheck.hasTimeConflicts && !conflictCheck.hasCapacityWarning && formData.day && formData.timeSlot && formData.teacherId && formData.classroomId && formData.groupId && (
              <Alert className="my-4 border-green-500 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <div className="text-sm text-green-700">{t.noConflicts}</div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">{t.subject}</Label>
                  <Select
                    value={formData.subjectId.toString()}
                    onValueChange={(value) => handleFormChange('subjectId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectSubject} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSubjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher">{t.teacher}</Label>
                  <Select
                    value={formData.teacherId.toString()}
                    onValueChange={(value) => handleFormChange('teacherId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectTeacher} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTeachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="group">{t.group}</Label>
                  <Select
                    value={formData.groupId.toString()}
                    onValueChange={(value) => handleFormChange('groupId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectGroup} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.code} ({group.size} {t.students})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classroom">{t.classroom}</Label>
                  <Select
                    value={formData.classroomId.toString()}
                    onValueChange={(value) => handleFormChange('classroomId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectClassroom} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClassrooms.map((classroom) => (
                        <SelectItem key={classroom.id} value={classroom.id.toString()}>
                          {classroom.number} ({classroom.capacity} {t.seats})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day">{t.day}</Label>
                  <Select
                    value={formData.day}
                    onValueChange={(value) => handleFormChange('day', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectDay} />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day.key} value={day.key}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">{t.time}</Label>
                  <Select
                    value={formData.timeSlot}
                    onValueChange={(value) => handleFormChange('timeSlot', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectTime} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="week">{t.week}</Label>
                  <Select
                    value={formData.week}
                    onValueChange={(value: Schedule['week']) => handleFormChange('week', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectWeek} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numerator">{t.numerator}</SelectItem>
                      <SelectItem value="denominator">{t.denominator}</SelectItem>
                      <SelectItem value="both">{t.both}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t.cancel}
              </Button>
              <Button 
                onClick={handleSave} 
                className="bg-[#225b73] hover:bg-[#1a4659]"
                disabled={conflictCheck.hasTimeConflicts}
              >
                {t.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.confirmDelete}</AlertDialogTitle>
              <AlertDialogDescription>{t.confirmDeleteMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700"
              >
                {t.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
