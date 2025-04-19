
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ContentPreviewProps {
  content: string;
  type: 'html' | 'markdown' | 'text';
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ content, type = 'text' }) => {
  if (!content) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          No content to preview
        </CardContent>
      </Card>
    );
  }

  if (type === 'html') {
    return (
      <Card>
        <CardContent 
          className="prose dark:prose-invert max-w-none p-4" 
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4 whitespace-pre-wrap">
        {content}
      </CardContent>
    </Card>
  );
};

export default ContentPreview;
