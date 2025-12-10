import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, User, Shield } from 'lucide-react';
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
    userManagement: 'User Management',
    addUser: 'Add User',
    searchUsers: 'Search users...',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
    cancel: 'Cancel',
    save: 'Save',
    editUser: 'Edit User',
    addNewUser: 'Add New User',
    confirmDelete: 'Confirm Deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this user? This action cannot be undone.',
    fullName: 'Full Name',
    selectRole: 'Select role',
    allFieldsRequired: 'Please fill in all required fields',
    invalidEmail: 'Email must end with @polytechnic.am'
  },
  hy: {
    userManagement: 'Օգտատերերի Կառավարում',
    addUser: 'Ավելացնել Օգտատեր',
    searchUsers: 'Փնտրել օգտատերերին...',
    name: 'Անուն',
    email: 'Էլ. փոստ',
    role: 'Դեր',
    actions: 'Գործողություններ',
    edit: 'Խմբագրել',
    delete: 'Ջնջել',
    student: 'Ուսանող',
    teacher: 'Դասախոս',
    admin: 'Ադմինիստրատոր',
    cancel: 'Չեղարկել',
    save: 'Պահպանել',
    editUser: 'Խմբագրել Օգտատերը',
    addNewUser: 'Ավելացնել Նոր Օգտատեր',
    confirmDelete: 'Հաստատել Ջնջումը',
    confirmDeleteMessage: 'Վստա՞հ եք, որ ցանկանում եք ջնջել այս օգտատիրոջը: Այս գործողությունը հնարավոր չէ հետ շրջել:',
    fullName: 'Անուն Ազգանուն',
    selectRole: 'Ընտրել դեր',
    allFieldsRequired: 'Խնդրում ենք լրացնել բոլոր պահանջվող դաշտերը',
    invalidEmail: 'Էլ. փոստը պետք է ավարտվի @polytechnic.am-ով'
  },
  ru: {
    userManagement: 'Управление Пользователями',
    addUser: 'Добавить Пользователя',
    searchUsers: 'Искать пользователей...',
    name: 'Имя',
    email: 'Эл. почта',
    role: 'Роль',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    student: 'Студент',
    teacher: 'Преподаватель',
    admin: 'Администратор',
    cancel: 'Отмена',
    save: 'Сохранить',
    editUser: 'Редактировать Пользователя',
    addNewUser: 'Добавить Нового Пользователя',
    confirmDelete: 'Подтвердить Удаление',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.',
    fullName: 'Полное имя',
    selectRole: 'Выберите роль',
    allFieldsRequired: 'Пожалуйста, заполните все обязательные поля',
    invalidEmail: 'Электронная почта должна заканчиваться на @polytechnic.am'
  }
};

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

interface UserManagementProps {
  language: 'en' | 'hy' | 'ru';
}

const initialUsers: User[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@polytechnic.am', role: 'student' },
  { id: 2, name: 'Prof. Sarah Johnson', email: 'sarah.johnson@polytechnic.am', role: 'teacher' },
  { id: 3, name: 'Prof. Michael Chen', email: 'michael.chen@polytechnic.am', role: 'teacher' },
  { id: 4, name: 'Emma Wilson', email: 'emma.wilson@polytechnic.am', role: 'student' },
  { id: 5, name: 'Prof. Emily Watson', email: 'emily.watson@polytechnic.am', role: 'teacher' },
  { id: 6, name: 'Admin User', email: 'admin@polytechnic.am', role: 'admin' },
  { id: 7, name: 'David Brown', email: 'david.brown@polytechnic.am', role: 'student' },
  { id: 8, name: 'Prof. James Martinez', email: 'james.martinez@polytechnic.am', role: 'teacher' },
];

export function UserManagement({ language }: UserManagementProps) {
  const t = translations[language];
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student' as User['role'] });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'student' });
    setDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSave = () => {
    // Validation
    if (!formData.name.trim()) {
      alert(t.allFieldsRequired || 'Please fill in all required fields');
      return;
    }

    if (!formData.email.trim()) {
      alert(t.allFieldsRequired || 'Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!formData.email.endsWith('@polytechnic.am')) {
      alert(t.invalidEmail || 'Email must end with @polytechnic.am');
      return;
    }

    // Validate email has proper format (something@polytechnic.am)
    const emailPart = formData.email.split('@')[0];
    if (!emailPart || emailPart.length === 0) {
      alert(t.invalidEmail || 'Invalid email format');
      return;
    }

    if (!formData.role) {
      alert(t.allFieldsRequired || 'Please select a role');
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...formData } : user
        )
      );
    } else {
      const newUser: User = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }
    setDialogOpen(false);
  };

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-amber-500 text-white hover:bg-amber-600';
      case 'teacher':
        return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'student':
        return 'bg-green-500 text-white hover:bg-green-600';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3 h-3" />;
      case 'teacher':
        return <User className="w-3 h-3" />;
      case 'student':
        return <User className="w-3 h-3" />;
    }
  };

  const getRoleLabel = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return t.admin;
      case 'teacher':
        return t.teacher;
      case 'student':
        return t.student;
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 dark:text-gray-100">{t.userManagement}</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage students, teachers, and administrators</p>
          </div>
          <Button onClick={handleAddUser} className="bg-[#225b73] hover:bg-[#1a4659] dark:bg-violet-600 dark:hover:bg-violet-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            {t.addUser}
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={t.searchUsers}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Users Table */}
        <Card className="overflow-hidden shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="overflow-x-auto scroll-smooth">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.name}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.email}
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.role}
                  </th>
                  <th className="px-6 py-4 text-right text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#225b73]/10 dark:bg-violet-500/20 flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-[#225b73] dark:text-violet-400" />
                        </div>
                        <div className="text-gray-900 dark:text-gray-100">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getRoleBadgeColor(user.role)} flex items-center gap-1 w-fit`}>
                        {getRoleIcon(user.role)}
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        className="mr-2 dark:hover:bg-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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
              <DialogTitle>{editingUser ? t.editUser : t.addNewUser}</DialogTitle>
              <DialogDescription>
                {editingUser ? 'Update user information' : 'Add a new user to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.fullName}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@polytechnic.am"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t.role}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: User['role']) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectRole} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">{t.student}</SelectItem>
                    <SelectItem value="teacher">{t.teacher}</SelectItem>
                    <SelectItem value="admin">{t.admin}</SelectItem>
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