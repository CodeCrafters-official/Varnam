import React, { useState } from 'react';
import { VarnamHeader } from '@/components/VarnamHeader';
import { KolamCanvas } from '@/components/KolamCanvas';
import { KolamTemplate } from '@/components/KolamTemplate';
import { MathLearning } from '@/components/MathLearning';
import { InteractiveChallenge } from '@/components/InteractiveChallenge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Target, Users, Globe } from 'lucide-react';
import kolamHero from '@/assets/kolam-hero.jpg';
import toast, { Toaster } from 'react-hot-toast';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'canvas' | 'learn'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setCurrentView('canvas');
    toast.success(`${template.name} template loaded! Start drawing your Kolam.`);
  };

  const handleChallengeStart = (concept: any) => {
    setCurrentChallenge(concept);
    setCurrentView('canvas');
    toast.success(`${concept.title} challenge started! Good luck!`);
  };

  const handleChallengeComplete = (success: boolean) => {
    if (success) {
      toast.success(`🎉 Congratulations! You've mastered the ${currentChallenge?.title} concept!`);
    }
    setCurrentChallenge(null);
  };

  const handleChallengeExit = () => {
    setCurrentChallenge(null);
    toast('Challenge exited. You can start a new one anytime!');
  };

  const renderHomeView = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${kolamHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-4">🪔</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-foreground">
              Welcome to Varnam
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Discover the beauty of South Indian Kolam art while learning mathematics through interactive patterns, 
              symmetry, and cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setCurrentView('canvas')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setCurrentView('learn')}
                className="bg-white/10 text-primary-foreground border-white/30 hover:bg-white/20"
              >
                <Target className="w-5 h-5 mr-2" />
                Learn Math
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Interactive Canvas</h3>
          <p className="text-sm text-muted-foreground">
            Draw beautiful Kolam patterns on dot grids with real-time feedback and symmetry guides.
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-secondary-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Math Learning</h3>
          <p className="text-sm text-muted-foreground">
            Explore geometry, symmetry, and patterns through traditional art forms and interactive challenges.
          </p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="font-semibold mb-2">Cultural Heritage</h3>
          <p className="text-sm text-muted-foreground">
            Learn about the rich tradition of Kolam art while developing mathematical thinking skills.
          </p>
        </Card>
      </div>

      {/* Quick Start Templates */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Start Templates</h2>
          <Badge className="bg-gradient-primary">Popular</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Simple Square', dots: 9, level: 'Beginner', id: 'square' },
          { name: 'Flower Pattern', dots: 13, level: 'Easy', id: 'flower' },
          { name: 'Star Design', dots: 16, level: 'Medium', id: 'star' },
          { name: 'Complex Mandala', dots: 25, level: 'Advanced', id: 'mandala' }
        ].map((template, index) => (
          <Card 
            key={index} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer hover-lift"
            onClick={() => handleTemplateSelect({ id: template.id, name: template.name })}
          >
              <div className="h-16 bg-kolam-grid rounded mb-3 flex items-center justify-center">
                <div className="text-kolam-line text-2xl">⚘</div>
              </div>
              <h4 className="font-medium text-sm mb-1">{template.name}</h4>
              <p className="text-xs text-muted-foreground">{template.dots} dots • {template.level}</p>
            </Card>
          ))}
        </div>
      </Card>

      {/* About Kolam */}
      <Card className="p-8 bg-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">About Kolam Art</h2>
          <p className="text-muted-foreground mb-6">
            Kolam is a traditional art form from South India, created using geometric patterns drawn with 
            rice flour. These intricate designs are not just beautiful—they're mathematical marvels that 
            teach symmetry, geometry, and logical thinking.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Family Tradition</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Mathematical Art</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span>Cultural Heritage</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderCanvasView = () => (
    <div className="space-y-6">
      {currentChallenge ? (
        <InteractiveChallenge 
          challenge={currentChallenge}
          onComplete={handleChallengeComplete}
          onExit={handleChallengeExit}
        />
      ) : (
        <KolamTemplate onSelectTemplate={handleTemplateSelect} />
      )}
      <KolamCanvas 
        selectedTemplate={selectedTemplate}
        showSymmetry={currentChallenge?.id === 'symmetry' || currentChallenge?.id === 'rotation'}
        onPatternComplete={(pattern) => {
          console.log('Pattern completed:', pattern);
          if (currentChallenge) {
            toast.success('Pattern completed! Checking your work...');
            setTimeout(() => {
              const success = confirm('Does your pattern meet the challenge requirements? Click OK if yes, Cancel to try again.');
              if (success) {
                handleChallengeComplete(true);
              } else {
                toast('Keep trying! You can do it!');
              }
            }, 1000);
          } else {
            toast.success('Beautiful Kolam created! 🎨');
          }
        }} 
      />
    </div>
  );

  const renderLearnView = () => (
    <div className="space-y-6">
      <MathLearning onStartChallenge={handleChallengeStart} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Toaster position="top-right" />
      <VarnamHeader currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="max-w-6xl mx-auto p-6">
        {currentView === 'home' && renderHomeView()}
        {currentView === 'canvas' && renderCanvasView()}
        {currentView === 'learn' && renderLearnView()}
      </main>
    </div>
  );
};

export default Index;
