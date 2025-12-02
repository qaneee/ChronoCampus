import { useState } from 'react';
import { BarChart3, Users, Building2, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const translations = {
  en: {
    reportsAnalytics: 'Reports & Analytics',
    overview: 'Overview',
    teacherUtilization: 'Teacher Utilization',
    classroomUtilization: 'Classroom Utilization',
    groupSchedules: 'Group Schedules',
    totalUsers: 'Total Users',
    totalSubjects: 'Total Subjects',
    totalClassrooms: 'Total Classrooms',
    totalSchedules: 'Total Schedules',
    students: 'Students',
    teachers: 'Teachers',
    administrators: 'Administrators',
    teacher: 'Teacher',
    hoursPerWeek: 'Hours per Week',
    utilization: 'Utilization',
    classroom: 'Classroom',
    capacity: 'Capacity',
    weeklyUsage: 'Weekly Usage',
    group: 'Group',
    scheduledClasses: 'Scheduled Classes',
    viewDetails: 'View Details',
    highUtilization: 'High',
    mediumUtilization: 'Medium',
    lowUtilization: 'Low'
  },
  hy: {
    reportsAnalytics: 'Հաշվետվություններ և Վերլուծություն',
    overview: 'Ընդհանուր Տեսք',
    teacherUtilization: 'Դասախոսների Օգտագործում',
    classroomUtilization: 'Լսարանների Օգտագործում',
    groupSchedules: 'Խմբերի Ժամանակացույցեր',
    totalUsers: 'Ընդհանուր Օգտատերեր',
    totalSubjects: 'Ընդհանուր Առարկաներ',
    totalClassrooms: 'Ընդհանուր Լսարաններ',
    totalSchedules: 'Ընդհանուր Ժամանակացույցեր',
    students: 'Ուսանողներ',
    teachers: 'Դասախոսներ',
    administrators: 'Ադմինիստրատորներ',
    teacher: 'Դասախոս',
    hoursPerWeek: 'Ժամեր Շաբաթվա Համար',
    utilization: 'Օգտագործում',
    classroom: 'Լսարան',
    capacity: 'Տարողություն',
    weeklyUsage: 'Շաբաթական Օգտագործում',
    group: 'Խումբ',
    scheduledClasses: 'Նշանակված Դասեր',
    viewDetails: 'Դիտել Մանրամասներ',
    highUtilization: 'Բարձր',
    mediumUtilization: 'Միջին',
    lowUtilization: 'Ցածր'
  },
  ru: {
    reportsAnalytics: 'Отчеты и Аналитика',
    overview: 'Обзор',
    teacherUtilization: 'Использование Преподавателей',
    classroomUtilization: 'Использование Аудиторий',
    groupSchedules: 'Расписания Групп',
    totalUsers: 'Всего Пользователей',
    totalSubjects: 'Всего Предметов',
    totalClassrooms: 'Всего Аудиторий',
    totalSchedules: 'Всего Расписаний',
    students: 'Студенты',
    teachers: 'Преподаватели',
    administrators: 'Администраторы',
    teacher: 'Преподаватель',
    hoursPerWeek: 'Часов в Неделю',
    utilization: 'Использование',
    classroom: 'Аудитория',
    capacity: 'Вместимость',
    weeklyUsage: 'Еженедельное Использование',
    group: 'Группа',
    scheduledClasses: 'Запланированные Занятия',
    viewDetails: 'Просмотр Деталей',
    highUtilization: 'Высокая',
    mediumUtilization: 'Средняя',
    lowUtilization: 'Низкая'
  }
};

interface ReportsProps {
  language: 'en' | 'hy' | 'ru';
}

const mockTeacherUtilization = [
  { id: 1, name: 'Prof. Sarah Johnson', hours: 18, utilization: 90 },
  { id: 2, name: 'Prof. Michael Chen', hours: 16, utilization: 80 },
  { id: 3, name: 'Prof. Emily Watson', hours: 14, utilization: 70 },
  { id: 4, name: 'Prof. James Martinez', hours: 12, utilization: 60 },
  { id: 5, name: 'Prof. Linda Brown', hours: 10, utilization: 50 },
  { id: 6, name: 'Prof. Robert Lee', hours: 8, utilization: 40 },
];

const mockClassroomUtilization = [
  { id: 1, number: '3201', capacity: 30, weeklyUsage: 25, utilization: 83 },
  { id: 2, number: '5308', capacity: 40, weeklyUsage: 30, utilization: 75 },
  { id: 3, number: '12405', capacity: 35, weeklyUsage: 20, utilization: 57 },
  { id: 4, number: '7210', capacity: 25, weeklyUsage: 15, utilization: 60 },
  { id: 5, number: '1503', capacity: 50, weeklyUsage: 35, utilization: 70 },
  { id: 6, number: '8107', capacity: 45, weeklyUsage: 22, utilization: 49 },
];

const mockGroupSchedules = [
  { id: 1, code: 'CS-1A', name: 'Computer Science 1A', scheduledClasses: 24 },
  { id: 2, code: 'CS-1B', name: 'Computer Science 1B', scheduledClasses: 22 },
  { id: 3, code: 'CS-2A', name: 'Computer Science 2A', scheduledClasses: 26 },
  { id: 4, code: 'CS-2B', name: 'Computer Science 2B', scheduledClasses: 25 },
  { id: 5, code: 'CS-3A', name: 'Computer Science 3A', scheduledClasses: 20 },
  { id: 6, code: 'CS-3B', name: 'Computer Science 3B', scheduledClasses: 21 },
];

export function Reports({ language }: ReportsProps) {
  const t = translations[language];

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 75) return 'bg-green-500';
    if (utilization >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getUtilizationLabel = (utilization: number) => {
    if (utilization >= 75) return t.highUtilization;
    if (utilization >= 50) return t.mediumUtilization;
    return t.lowUtilization;
  };

  const getUtilizationBadgeColor = (utilization: number) => {
    if (utilization >= 75) return 'bg-green-100 text-green-800';
    if (utilization >= 50) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2">{t.reportsAnalytics}</h1>
          <p className="text-gray-600">View analytics and utilization reports</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="teachers">{t.teacherUtilization}</TabsTrigger>
            <TabsTrigger value="classrooms">{t.classroomUtilization}</TabsTrigger>
            <TabsTrigger value="groups">{t.groupSchedules}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">{t.totalUsers}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">156</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{t.students}</span>
                      <span>128</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{t.teachers}</span>
                      <span>24</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{t.administrators}</span>
                      <span>4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">{t.totalSubjects}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">48</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Across all departments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">{t.totalClassrooms}</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">32</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    21 campuses active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">{t.totalSchedules}</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">284</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Classes per week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Summary Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Teachers</CardTitle>
                  <CardDescription>Based on teaching hours per week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTeacherUtilization.slice(0, 5).map((teacher) => (
                    <div key={teacher.id} className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{teacher.name}</div>
                        <div className="text-xs text-gray-500">{teacher.hours} hours/week</div>
                      </div>
                      <Badge className={getUtilizationBadgeColor(teacher.utilization)}>
                        {teacher.utilization}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Classroom Usage</CardTitle>
                  <CardDescription>Most utilized classrooms this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockClassroomUtilization.slice(0, 5).map((classroom) => (
                    <div key={classroom.id} className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">{classroom.number}</div>
                        <div className="text-xs text-gray-500">{classroom.weeklyUsage}/40 hours</div>
                      </div>
                      <Badge className={getUtilizationBadgeColor(classroom.utilization)}>
                        {classroom.utilization}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Teacher Utilization Tab */}
          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.teacherUtilization}</CardTitle>
                <CardDescription>
                  Teaching hours and utilization rates for all teachers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockTeacherUtilization.map((teacher) => (
                    <div key={teacher.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{teacher.name}</span>
                            <Badge className={getUtilizationBadgeColor(teacher.utilization)}>
                              {getUtilizationLabel(teacher.utilization)}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {teacher.hours} {t.hoursPerWeek}
                          </div>
                        </div>
                        <span className="text-sm">{teacher.utilization}%</span>
                      </div>
                      <Progress
                        value={teacher.utilization}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classroom Utilization Tab */}
          <TabsContent value="classrooms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.classroomUtilization}</CardTitle>
                <CardDescription>
                  Weekly usage and capacity information for all classrooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockClassroomUtilization.map((classroom) => (
                    <div key={classroom.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm">{t.classroom} {classroom.number}</span>
                            <Badge className={getUtilizationBadgeColor(classroom.utilization)}>
                              {getUtilizationLabel(classroom.utilization)}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {t.capacity}: {classroom.capacity} seats • {classroom.weeklyUsage}/40 hours used
                          </div>
                        </div>
                        <span className="text-sm">{classroom.utilization}%</span>
                      </div>
                      <Progress
                        value={classroom.utilization}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Group Schedules Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGroupSchedules.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-[#225b73] text-white">{group.code}</Badge>
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg mt-2">{group.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{t.scheduledClasses}</span>
                        <span className="">{group.scheduledClasses}</span>
                      </div>
                      <Progress value={(group.scheduledClasses / 30) * 100} className="h-2" />
                      <p className="text-xs text-gray-500 mt-2">
                        {group.scheduledClasses} out of 30 weekly time slots
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}