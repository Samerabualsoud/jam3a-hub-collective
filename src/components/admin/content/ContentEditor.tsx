
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Eye } from 'lucide-react';
import ContentPreview from './ContentPreview';
import { ContentTabType } from '../ContentManager';
import { useToast } from '@/hooks/use-toast';

interface ContentEditorProps {
  type: ContentTabType;
  content?: any;
  onSave?: (content: any) => void;
  onCancel?: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ 
  type,
  content, 
  onSave,
  onCancel
}) => {
  // Common fields
  const [name, setName] = useState(content?.name || '');
  const [contentText, setContentText] = useState(content?.content || '');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Specific fields
  const [title, setTitle] = useState(content?.title || '');
  const [path, setPath] = useState(content?.path || '/');
  const [contentType, setContentType] = useState(content?.type || 'html');
  const [slug, setSlug] = useState(content?.slug || '');
  const [metaDescription, setMetaDescription] = useState(content?.meta_description || '');
  const [metaKeywords, setMetaKeywords] = useState(content?.meta_keywords || '');
  const [imageUrl, setImageUrl] = useState(content?.image_url || '');
  const [link, setLink] = useState(content?.link || '');
  const [active, setActive] = useState(content?.active || false);
  const [question, setQuestion] = useState(content?.question || '');
  const [answer, setAnswer] = useState(content?.answer || '');
  const [category, setCategory] = useState(content?.category || '');
  const [displayOrder, setDisplayOrder] = useState(content?.display_order || 0);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      let contentToSave = {};
      
      switch (type) {
        case 'sections':
          if (!name.trim()) {
            throw new Error("Section name is required");
          }
          contentToSave = {
            id: content?.id,
            name,
            content: contentText,
            path,
            type: contentType
          };
          break;
          
        case 'banners':
          if (!title.trim()) {
            throw new Error("Banner title is required");
          }
          contentToSave = {
            id: content?.id,
            title,
            image_url: imageUrl,
            link,
            active
          };
          break;
          
        case 'pages':
          if (!title.trim()) {
            throw new Error("Page title is required");
          }
          if (!slug.trim()) {
            throw new Error("Page slug is required");
          }
          contentToSave = {
            id: content?.id,
            title,
            slug,
            content: contentText,
            meta_description: metaDescription,
            meta_keywords: metaKeywords
          };
          break;
          
        case 'faqs':
          if (!question.trim()) {
            throw new Error("Question is required");
          }
          if (!answer.trim()) {
            throw new Error("Answer is required");
          }
          contentToSave = {
            id: content?.id,
            question,
            answer,
            category,
            display_order: displayOrder
          };
          break;
      }
      
      if (onSave) {
        await onSave(contentToSave);
      }
      
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast({
        title: "Save Failed",
        description: error.message || 'An unknown error occurred',
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const renderFields = () => {
    switch (type) {
      case 'sections':
        return (
          <>
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
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="Enter your content here..."
                    className="min-h-[300px]"
                  />
                ) : (
                  <ContentPreview content={contentText} type={contentType as 'html' | 'markdown' | 'text'} />
                )}
              </div>
            </div>
          </>
        );
        
      case 'banners':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Banner title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://example.com/page"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={active}
                onCheckedChange={setActive}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </>
        );
        
      case 'pages':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="page-slug"
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
                    value={contentText}
                    onChange={(e) => setContentText(e.target.value)}
                    placeholder="Enter your content here..."
                    className="min-h-[300px]"
                  />
                ) : (
                  <ContentPreview content={contentText} type="html" />
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Input
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Page meta description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input
                id="metaKeywords"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </>
        );
        
      case 'faqs':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What is your question?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide the answer here..."
                rows={5}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="General"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{content ? `Edit ${type.slice(0, -1)}` : `Add New ${type.slice(0, -1)}`}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderFields()}
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
