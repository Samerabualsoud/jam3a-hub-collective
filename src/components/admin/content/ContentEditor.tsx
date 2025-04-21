
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Eye } from 'lucide-react';
import ContentPreview from './ContentPreview';
import { ContentSection, saveContentSection } from './contentUtils';
import { useToast } from '@/hooks/use-toast';

interface ContentEditorProps {
  section?: ContentSection;
  onSave?: (section: ContentSection) => void;
  onCancel?: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  section, 
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(section?.name || '');
  const [content, setContent] = useState(section?.content || '');
  const [path, setPath] = useState(section?.path || '/');
  const [type, setType] = useState(section?.type || 'html');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for this content section",
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      const updatedSection = await saveContentSection({
        id: section?.id,
        name,
        content,
        path,
        type
      });
      
      toast({
        title: "Content Saved",
        description: `Successfully saved "${name}" content`,
        variant: "default"
      });
      
      if (onSave) {
        onSave(updatedSection);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{section ? 'Edit Content' : 'Add New Content'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Content section name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="path">Path (URL)</Label>
            <Input
              id="path"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/page-url"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Content</Label>
            <div className="space-x-2">
              <Button 
                variant={activeTab === 'edit' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('edit')}
              >
                Edit
              </Button>
              <Button 
                variant={activeTab === 'preview' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('preview')}
              >
                <Eye className="h-4 w-4 mr-1" /> Preview
              </Button>
            </div>
          </div>
          
          <div className="min-h-[300px]">
            {activeTab === 'edit' ? (
              <Textarea
                value={content || ''}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content here..."
                className="min-h-[300px]"
              />
            ) : (
              <ContentPreview content={content || ''} type={type as 'html' | 'markdown' | 'text'} />
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Content
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentEditor;
