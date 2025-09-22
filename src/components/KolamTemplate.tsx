import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface KolamPattern {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  dots: number;
  preview: React.ReactNode;
}

interface KolamTemplateProps {
  onSelectTemplate: (template: KolamPattern) => void;
}

const SimpleKolamPreview: React.FC<{ pattern: string }> = ({ pattern }) => (
  <div className="w-full h-20 flex items-center justify-center bg-kolam-grid rounded-md">
    <svg width="60" height="60" viewBox="0 0 60 60">
      {pattern === 'square' && (
        <>
          <circle cx="15" cy="15" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="15" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="45" cy="15" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="15" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="45" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="15" cy="45" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="45" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="45" cy="45" r="2" fill="hsl(var(--kolam-dot))" />
          <path d="M15 15 L45 15 L45 45 L15 45 Z" stroke="hsl(var(--kolam-line))" strokeWidth="2" fill="none" />
        </>
      )}
      {pattern === 'flower' && (
        <>
          <circle cx="30" cy="15" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="15" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="45" cy="30" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="45" r="2" fill="hsl(var(--kolam-dot))" />
          <path d="M30 15 Q15 30 30 30 Q45 30 30 15 M30 30 Q15 30 30 45 Q45 30 30 30" 
                stroke="hsl(var(--kolam-line))" strokeWidth="2" fill="none" />
        </>
      )}
      {pattern === 'star' && (
        <>
          <circle cx="30" cy="10" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="20" cy="25" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="40" cy="25" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="15" cy="40" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="30" cy="40" r="2" fill="hsl(var(--kolam-dot))" />
          <circle cx="45" cy="40" r="2" fill="hsl(var(--kolam-dot))" />
          <path d="M30 10 L20 25 L45 40 L15 40 L40 25 Z" 
                stroke="hsl(var(--kolam-line))" strokeWidth="2" fill="none" />
        </>
      )}
    </svg>
  </div>
);

const templates: KolamPattern[] = [
  {
    id: 'square',
    name: 'Basic Square',
    description: 'Simple 3x3 square pattern - perfect for beginners',
    difficulty: 'easy',
    dots: 9,
    preview: <SimpleKolamPreview pattern="square" />
  },
  {
    id: 'flower',
    name: 'Flower Petals',
    description: 'Beautiful curved lines forming flower petals',
    difficulty: 'medium',
    dots: 5,
    preview: <SimpleKolamPreview pattern="flower" />
  },
  {
    id: 'star',
    name: 'Five Point Star',
    description: 'Traditional star pattern with symmetrical design',
    difficulty: 'medium',
    dots: 6,
    preview: <SimpleKolamPreview pattern="star" />
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-accent';
    case 'medium': return 'text-primary';
    case 'hard': return 'text-secondary';
    default: return 'text-muted-foreground';
  }
};

export const KolamTemplate: React.FC<KolamTemplateProps> = ({ onSelectTemplate }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Choose a Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
            {template.preview}
            <div className="mt-3">
              <h4 className="font-medium text-sm">{template.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {template.description}
              </p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`capitalize font-medium ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                  <span className="text-muted-foreground">• {template.dots} dots</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onSelectTemplate(template)}
                >
                  Try It
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};