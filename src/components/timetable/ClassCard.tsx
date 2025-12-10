/**
 * ClassCard Component
 * 
 * Displays information for a single class session including:
 * - Subject name
 * - Time and duration
 * - Classroom location
 * - Lecturer or group (depending on user role)
 * - Week indicator (Numerator/Denominator)
 * - Note indicator if notes exist
 * - Note-taking functionality (for students only)
 */

import { Clock, MapPin, Users, StickyNote, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { ClassSession, UserRole, Translations, Language } from '../../types';
import { getSubjectTranslation, getLecturerTranslation } from '../../constants/subjectTranslations';

interface ClassCardProps {
  session: ClassSession;
  userRole: UserRole;
  translations: Translations;
  language: Language;
  hasNote: boolean;
  noteContent?: string;
  isNoteExpanded: boolean;
  onOpenNoteDialog: (e: React.MouseEvent) => void;
  onDeleteNote: (e: React.MouseEvent) => void;
  onToggleNote: () => void;
}

export function ClassCard({
  session,
  userRole,
  translations,
  language,
  hasNote,
  noteContent,
  isNoteExpanded,
  onOpenNoteDialog,
  onDeleteNote,
  onToggleNote
}: ClassCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {/* Card Header: Subject, Groups, Duration */}
      <CardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Subject name with note indicator and week badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
              <CardTitle className="text-[#225b73] text-sm sm:text-base md:text-lg lg:text-xl truncate">
                {getSubjectTranslation(session.subject, language)}
              </CardTitle>
              
              {/* Note indicator icon */}
              {hasNote && (
                <StickyNote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-100 flex-shrink-0" />
              )}
              
              {/* Week badge (only shown if not 'both') */}
              {session.week !== 'both' && (
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {session.week === 'numerator' ? translations.numeratorShort : translations.denominatorShort}
                </Badge>
              )}
            </div>
            
            {/* Group badges */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {session.groups.map((group) => (
                <Badge key={group} variant="secondary" className="text-xs">
                  {group}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Duration badge */}
          <Badge className="bg-[#225b73]/10 text-[#225b73] hover:bg-[#225b73]/20 text-xs whitespace-nowrap flex-shrink-0 h-fit">
            {session.duration}
          </Badge>
        </div>
      </CardHeader>

      {/* Card Content: Time, Classroom, Lecturer/Group, Notes */}
      <CardContent className="p-3 sm:p-4 md:p-6 pt-0 space-y-3">
        {/* Class details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {/* Time */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">{translations.time}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900 truncate">{session.time}</p>
            </div>
          </div>

          {/* Classroom */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">{translations.classroom}</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900 truncate">{session.classroom}</p>
            </div>
          </div>

          {/* Lecturer (for students) or Group (for lecturers) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">
                {userRole === 'lecturer' ? translations.group : translations.lecturer}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900 truncate">
                {userRole === 'lecturer' ? session.teachingGroup : getLecturerTranslation(session.lecturer, language)}
              </p>
            </div>
          </div>
        </div>

        {/* Notes Section - Only visible for students */}
        {userRole === 'student' && (
          <div className="border-t border-gray-100 pt-2 sm:pt-3">
            {hasNote ? (
              /* Existing note - collapsible with edit/delete buttons */
              <Collapsible open={isNoteExpanded} onOpenChange={onToggleNote}>
                <div className="bg-amber-50 border border-amber-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-2.5 sm:p-3 gap-2">
                    {/* Click to expand/collapse note */}
                    <CollapsibleTrigger 
                      className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 hover:opacity-70 transition-opacity touch-manipulation"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StickyNote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-amber-900 truncate">
                        {isNoteExpanded ? translations.classNotes : noteContent}
                      </span>
                    </CollapsibleTrigger>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                      {/* Edit button */}
                      <button
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-md hover:bg-amber-200 transition-colors flex items-center justify-center touch-manipulation"
                        onClick={onOpenNoteDialog}
                        type="button"
                      >
                        <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700" />
                      </button>
                      
                      {/* Delete button */}
                      <button
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center touch-manipulation"
                        onClick={onDeleteNote}
                        type="button"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Expanded note content */}
                  <CollapsibleContent>
                    <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 pt-1 border-t border-amber-300">
                      <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap break-words">
                        {noteContent}
                      </p>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ) : (
              /* No note yet - show add note button */
              <button
                onClick={onOpenNoteDialog}
                className="w-full p-2.5 sm:p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#225b73] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-gray-500 hover:text-[#225b73] touch-manipulation"
                type="button"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">{translations.addNote}</span>
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}