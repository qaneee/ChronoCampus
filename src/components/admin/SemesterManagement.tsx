import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
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
import { useAdmin } from '../../contexts/AdminContext';
import type { Semester } from '../../contexts/AdminContext';

const translations = {
  en: {
    semesterManagement: 'Semester Management',
    subtitle: 'Manage academic semesters and set the current active semester',
    addSemester: 'Add Semester',
    searchSemesters: 'Search semesters...',
    semesterName: 'Semester Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    weeks: 'Weeks',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    setCurrent: 'Set Current',
    cancel: 'Cancel',
    save: 'Save',
    editSemester: 'Edit Semester',
    addNewSemester: 'Add New Semester',
    confirmDelete: 'Confirm Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this semester? This will affect all schedules.',
    current: 'Current',
    inactive: 'Inactive',
    weeksCount: 'Weeks Count',
    allFieldsRequired: 'Please fill in all required fields',
    noResults: 'No semesters found',
    totalSemesters: 'Total Semesters'
  },
  hy: {
    semesterManagement: 'Կիսամյակի Կառավարում',
    subtitle: 'Ակադեմիական կիսամյակների կառավարում և ընթացիկ ակտիվ կիսամյակի սահմանում',
    addSemester: 'Ավելացնել Կիսամյակ',
    searchSemesters: 'Փնտրել կիսամյակներ...',
    semesterName: 'Կիսամյակի Անվանում',
    startDate: 'Մեկնարկի Ամսաթիվ',
    endDate: 'Ավարտի Ամսաթիվ',
    weeks: 'Շաբաթներ',
    status: 'Կարգավիճակ',
    actions: 'Գործողություններ',
    edit: 'Խմբագրել',
    delete: 'Ջնջել',
    setCurrent: 'Սահմանել Ընթացիկ',
    cancel: 'Չեղարկել',
    save: 'Պահպանել',
    editSemester: 'Խմբագրել Կիսամյակը',
    addNewSemester: 'Ավելացնել Նոր Կիսամյակ',
    confirmDelete: 'Հաստատել Ջնջումը',
    confirmDeleteMessage: 'Վստա՞հ եք, որ ցանկանում եք ջնջել այս կիսամյակը: Սա կազդի բոլոր ժամանակացույցերին:',
    current: 'Ընթացիկ',
    inactive: 'Ոչ ակտիվ',
    weeksCount: 'Շաբաթների Թիվ',
    allFieldsRequired: 'Խնդրում ենք լրացնել բոլոր պահանջվող դաշտերը',
    noResults: 'Կիսամյակներ չի գտնվել',
    totalSemesters: 'Ընդհանուր Կիսամյակներ'
  },
  ru: {
    semesterManagement: 'Управление Семестрами',
    subtitle: 'Управление учебными семестрами и установка текущего активного семестра',
    addSemester: 'Добавить Семестр',
    searchSemesters: 'Искать семестры...',
    semesterName: 'Название Семестра',
    startDate: 'Дата Начала',
    endDate: 'Дата Окончания',
    weeks: 'Недели',
    status: 'Статус',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    setCurrent: 'Установить Текущий',
    cancel: 'Отмена',
    save: 'Сохранить',
    editSemester: 'Редактировать Семестр',
    addNewSemester: 'Добавить Новый Семестр',
    confirmDelete: 'Подтвердить Удаление',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить этот семестр? Это повлияет на все расписания.',
    current: 'Текущий',
    inactive: 'Неактивный',
    weeksCount: 'Количество Недель',
    allFieldsRequired: 'Пожалуйста, заполните все обязательные поля',
    noResults: 'Семестры не найдены',
    totalSemesters: 'Всего Семестров'
  }
};

interface SemesterManagementProps {
  language: 'en' | 'hy' | 'ru';
}

export function SemesterManagement({ language }: SemesterManagementProps) {
  const t = translations[language];
  const { semesters, addSemester, updateSemester, deleteSemester, setCurrentSemester } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSemester, setEditingSemester] = useState<Semester | null>(null);
  const [semesterToDelete, setSemesterToDelete] = useState<Semester | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    weeksCount: 16,
    isCurrent: false
  });

  const filteredSemesters = semesters.filter((semester) =>
    semester.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSemester = () => {
    setEditingSemester(null);
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      weeksCount: 16,
      isCurrent: false
    });
    setDialogOpen(true);
  };

  const handleEditSemester = (semester: Semester) => {
    setEditingSemester(semester);
    setFormData({
      name: semester.name,
      startDate: semester.startDate,
      endDate: semester.endDate,
      weeksCount: semester.weeksCount,
      isCurrent: semester.isCurrent
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (semester: Semester) => {
    setSemesterToDelete(semester);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (semesterToDelete) {
      deleteSemester(semesterToDelete.id);
      setDeleteDialogOpen(false);
      setSemesterToDelete(null);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      return;
    }

    if (editingSemester) {
      updateSemester(editingSemester.id, formData);
    } else {
      addSemester(formData);
    }
    setDialogOpen(false);
  };

  const handleSetCurrent = (semesterId: number) => {
    setCurrentSemester(semesterId);
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{t.semesterManagement}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          </div>
          <Button onClick={handleAddSemester} className="bg-[#225b73] hover:bg-[#1a4659] dark:bg-violet-600 dark:hover:bg-violet-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {t.addSemester}
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t.searchSemesters}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Semesters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSemesters.map((semester) => (
            <Card key={semester.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      semester.isCurrent ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Calendar className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        semester.isCurrent ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm sm:text-base truncate">{semester.name}</h3>
                      <Badge variant={semester.isCurrent ? 'default' : 'secondary'} className={`text-xs ${semester.isCurrent ? 'bg-green-500 dark:bg-green-600' : 'dark:bg-gray-700'}`}>
                        {semester.isCurrent ? t.current : t.inactive}
                      </Badge>
                    </div>
                  </div>
                  {semester.isCurrent && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  )}
                </div>

                {/* Dates */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{semester.startDate}</span>
                    <span className="mx-2">→</span>
                    <span className="truncate">{semester.endDate}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{semester.weeksCount} {t.weeks}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 gap-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSemester(semester)}
                      className="dark:hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(semester)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {!semester.isCurrent && (
                    <Button
                      size="sm"
                      onClick={() => handleSetCurrent(semester.id)}
                      className="bg-[#225b73] hover:bg-[#1a4659] dark:bg-violet-600 dark:hover:bg-violet-700 text-xs whitespace-nowrap"
                    >
                      {t.setCurrent}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSemesters.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">{t.noResults}</p>
          </div>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">{editingSemester ? t.editSemester : t.addNewSemester}</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                {editingSemester ? 'Update semester information' : 'Add a new semester to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-200">{t.semesterName}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Fall 2024"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate" className="dark:text-gray-200">{t.startDate}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="dark:text-gray-200">{t.endDate}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weeksCount" className="dark:text-gray-200">{t.weeksCount}</Label>
                <Input
                  id="weeksCount"
                  type="number"
                  value={formData.weeksCount}
                  onChange={(e) => setFormData({ ...formData, weeksCount: parseInt(e.target.value) })}
                  placeholder="16"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">
                {t.cancel}
              </Button>
              <Button onClick={handleSave} className="bg-[#225b73] hover:bg-[#1a4659] dark:bg-violet-600 dark:hover:bg-violet-700">
                {t.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-gray-100">{t.confirmDelete}</AlertDialogTitle>
              <AlertDialogDescription className="dark:text-gray-400">{t.confirmDeleteMessage}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">{t.cancel}</AlertDialogCancel>
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