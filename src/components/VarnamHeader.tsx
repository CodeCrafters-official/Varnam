import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, BookOpen, Home } from 'lucide-react';
import varnamLogo from '@/assets/varnam-logo.png';

interface VarnamHeaderProps {
  currentView: 'home' | 'canvas' | 'learn';
  onViewChange: (view: 'home' | 'canvas' | 'learn') => void;
}

export const VarnamHeader: React.FC<VarnamHeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-gradient-primary p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={varnamLogo} 
            alt="Varnam Logo" 
            className="h-12 w-auto"
          />
          <div>
            <p className="text-sm text-primary-foreground/80">Interactive Kolam Learning</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-2">
          <Button
            variant={currentView === 'home' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => onViewChange('home')}
            className={currentView !== 'home' ? 'bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20' : ''}
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Button
            variant={currentView === 'canvas' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => onViewChange('canvas')}
            className={currentView !== 'canvas' ? 'bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20' : ''}
          >
            <Palette className="w-4 h-4 mr-1" />
            Create
          </Button>
          <Button
            variant={currentView === 'learn' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => onViewChange('learn')}
            className={currentView !== 'learn' ? 'bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20' : ''}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Learn
          </Button>
        </nav>
      </div>
    </header>
  );
};