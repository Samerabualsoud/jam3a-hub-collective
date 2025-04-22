
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getContent } from '@/utils/jam3aContent';

interface CategorySelectionProps {
  onSelect: (categoryId: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelect }) => {
  const { language } = useLanguage();
  const content = getContent(language);

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h2 className="text-2xl font-bold">{content.stepTitles[0]}</h2>
      <p className="text-muted-foreground">{content.selectCategoryText}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {content.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all hover:border-royal-blue hover:bg-royal-blue/5"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-sm font-medium text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;
