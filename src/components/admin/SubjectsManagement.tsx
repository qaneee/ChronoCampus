import { useState } from 'react';
import { Plus, Search, Edit, Trash2, BookOpen, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
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
    subjectsManagement: 'Subjects Management',
    addSubject: 'Add Subject',
    searchSubjects: 'Search subjects...',
    subjectName: 'Subject Name',
    assignedTeacher: 'Assigned Teacher',
    code: 'Code',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    editSubject: 'Edit Subject',
    addNewSubject: 'Add New Subject',
    confirmDelete: 'Confirm Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this subject? This action cannot be undone.',
    subjectCode: 'Subject Code',
    selectTeacher: 'Select a teacher',
    noTeacherAssigned: 'No teacher assigned'
  },
  hy: {
    subjectsManagement: 'Առարկաների Կառավարում',
    addSubject: 'Ավելացնել Առարկա',
    searchSubjects: 'Փնտրել առարկաներ...',
    subjectName: 'Առարկայի Անվանում',
    assignedTeacher: 'Նշանակված Դասախոս',
    code: 'Կոդ',
    actions: 'Գործողություններ',
    edit: 'Խմբագրել',
    delete: 'Ջնջել',
    cancel: 'Չեղարկել',
    save: 'Պահպանել',
    editSubject: 'Խմբագրել Առարկան',
    addNewSubject: 'Ավելացնել Նոր Առարկա',
    confirmDelete: 'Հաստատել Ջնջումը',
    confirmDeleteMessage: 'Վստա՞հ եք, որ ցանկանում եք ջնջել այս առարկան: Այս գործողությունը հնարավոր չէ հետ շրջել:',
    subjectCode: 'Առարկայի Կոդ',
    selectTeacher: 'Ընտրել դասախոս',
    noTeacherAssigned: 'Դասախոս չի նշանակված'
  },
  ru: {
    subjectsManagement: 'Управление Предметами',
    addSubject: 'Добавить Предмет',
    searchSubjects: 'Искать предметы...',
    subjectName: 'Название Предмета',
    assignedTeacher: 'Назначенный Преподаватель',
    code: 'Код',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отмена',
    save: 'Сохранить',
    editSubject: 'Редактировать Предмет',
    addNewSubject: 'Добавить Новый Предмет',
    confirmDelete: 'Подтвердить Удаление',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить этот предмет? Это действие нельзя отменить.',
    subjectCode: 'Код Предмета',
    selectTeacher: 'Выберите преподавателя',
    noTeacherAssigned: 'Преподаватель не назначен'
  }
};

interface Subject {
  id: number;
  name: string;
  code: string;
  teacherId: number | null;
  teacherName: string | null;
}

interface Teacher {
  id: number;
  name: string;
}

interface SubjectsManagementProps {
  language: 'en' | 'hy' | 'ru';
}

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Prof. Sarah Johnson' },
  { id: 2, name: 'Prof. Michael Chen' },
  { id: 3, name: 'Prof. Emily Watson' },
  { id: 4, name: 'Prof. James Martinez' },
  { id: 5, name: 'Prof. Linda Brown' },
  { id: 6, name: 'Prof. Robert Lee' },
];

const initialSubjects: Subject[] = [
  { id: 1, name: 'Computer Science Fundamentals', code: 'IT101', teacherId: 1, teacherName: 'Prof. Sarah Johnson' },
  { id: 2, name: 'Mathematics for Computing', code: 'MT205', teacherId: 2, teacherName: 'Prof. Michael Chen' },
  { id: 3, name: 'Database Systems', code: 'DB319', teacherId: 3, teacherName: 'Prof. Emily Watson' },
  { id: 4, name: 'Web Development', code: 'WD217', teacherId: 4, teacherName: 'Prof. James Martinez' },
  { id: 5, name: 'Software Engineering', code: 'SE401', teacherId: 5, teacherName: 'Prof. Linda Brown' },
  { id: 6, name: 'Data Structures & Algorithms', code: 'DS228', teacherId: 6, teacherName: 'Prof. Robert Lee' },
  { id: 7, name: 'Operating Systems', code: 'OS315', teacherId: 1, teacherName: 'Prof. Sarah Johnson' },
  { id: 8, name: 'Network Security', code: 'NS419', teacherId: 2, teacherName: 'Prof. Michael Chen' },
  { id: 9, name: 'Artificial Intelligence', code: 'AI502', teacherId: 3, teacherName: 'Prof. Emily Watson' },
  { id: 10, name: 'Mobile App Development', code: 'MA334', teacherId: 4, teacherName: 'Prof. James Martinez' },
];

export function SubjectsManagement({ language }: SubjectsManagementProps) {
  const t = translations[language];
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', teacherId: null as number | null });

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = () => {
    setEditingSubject(null);
    setFormData({ name: '', code: '', teacherId: null });
    setDialogOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({ name: subject.name, code: subject.code, teacherId: subject.teacherId });
    setDialogOpen(true);
  };

  const handleDeleteClick = (subject: Subject) => {
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter((s) => s.id !== subjectToDelete.id));
      setDeleteDialogOpen(false);
      setSubjectToDelete(null);
    }
  };

  const handleSave = () => {
    const teacher = mockTeachers.find((t) => t.id === formData.teacherId);
    if (editingSubject) {
      setSubjects(
        subjects.map((s) =>
          s.id === editingSubject.id
            ? { ...s, ...formData, teacherName: teacher?.name || null }
            : s
        )
      );
    } else {
      const newSubject: Subject = {
        id: Math.max(...subjects.map((s) => s.id), 0) + 1,
        ...formData,
        teacherName: teacher?.name || null
      };
      setSubjects([...subjects, newSubject]);
    }
    setDialogOpen(false);
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="mb-2">{t.subjectsManagement}</h1>
            <p className="text-gray-600">Add and manage subjects and assign teachers</p>
          </div>
          <Button onClick={handleAddSubject} className="bg-[#225b73] hover:bg-[#1a4659] w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {t.addSubject}
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t.searchSubjects}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Subjects Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.code}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.subjectName}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 uppercase tracking-wider">
                    {t.assignedTeacher}
                  </th>
                  <th className="px-6 py-4 text-right text-xs text-gray-500 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="text-[#225b73] border-[#225b73]">
                        {subject.code}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-gray-900">{subject.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {subject.teacherName ? (
                        <div className="flex items-center text-gray-600">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          {subject.teacherName}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">{t.noTeacherAssigned}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditSubject(subject)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(subject)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSubject ? t.editSubject : t.addNewSubject}</DialogTitle>
              <DialogDescription>
                {editingSubject ? 'Update subject information' : 'Add a new subject to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="code">{t.subjectCode}</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="CS101"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t.subjectName}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Introduction to Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">{t.assignedTeacher}</Label>
                <Select
                  value={formData.teacherId?.toString() || 'none'}
                  onValueChange={(value) =>
                    setFormData({ ...formData, teacherId: value === 'none' ? null : parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectTeacher} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t.noTeacherAssigned}</SelectItem>
                    {mockTeachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                {t.cancel}
              </Button>
              <Button onClick={handleSave} className="bg-[#225b73] hover:bg-[#1a4659]">
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