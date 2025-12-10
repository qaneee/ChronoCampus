import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { translations } from '../constants/translations';
import { toast } from 'sonner';

interface FeedbackDialogProps {
  language: 'en' | 'hy' | 'ru';
  userRole: 'student' | 'lecturer';
  userName: string;
}

export function FeedbackDialog({ language, userRole, userName }: FeedbackDialogProps) {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'problem' as 'problem' | 'suggestion' | 'question' | 'other'
  });

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create feedback object
    const feedback = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      status: 'pending' as const,
      from: userName,
      role: userRole,
      date: new Date().toISOString(),
    };

    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('chronocampus_feedback') || '[]');
    
    // Add new feedback
    existingFeedback.push(feedback);
    
    // Save to localStorage
    localStorage.setItem('chronocampus_feedback', JSON.stringify(existingFeedback));

    // Show success message
    toast.success(t.feedbackSent);

    // Reset form and close dialog
    setFormData({ title: '', message: '', type: 'problem' });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          {t.sendFeedback}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t.sendFeedback}</DialogTitle>
          <DialogDescription>{t.feedbackDescription}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t.feedbackTitle}</Label>
            <Input
              id="title"
              placeholder={t.feedbackTitlePlaceholder}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">{t.feedbackType}</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'problem' | 'suggestion' | 'question' | 'other') =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="problem">{t.problem}</SelectItem>
                <SelectItem value="suggestion">{t.suggestion}</SelectItem>
                <SelectItem value="question">{t.question}</SelectItem>
                <SelectItem value="other">{t.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t.feedbackMessage}</Label>
            <Textarea
              id="message"
              placeholder={t.writeFeedback}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t.cancel}
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="h-4 w-4" />
            {t.submitFeedback}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}