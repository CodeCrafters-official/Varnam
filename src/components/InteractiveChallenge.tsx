import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, RotateCcw } from 'lucide-react';

interface ChallengeProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    example: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  onComplete: (success: boolean) => void;
  onExit: () => void;
}

export const InteractiveChallenge: React.FC<ChallengeProps> = ({ 
  challenge, 
  onComplete, 
  onExit 
}) => {
  const [hints, setHints] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  useEffect(() => {
    // Set challenge-specific hints
    const challengeHints: Record<string, string[]> = {
      symmetry: [
        "Try to make your pattern look the same on both sides of the center line",
        "Use the symmetry guide lines to help align your drawing",
        "A symmetric pattern should look identical when folded in half"
      ],
      counting: [
        "Count the dots carefully before you start drawing",
        "Try connecting exactly 12 dots with your pattern",
        "Each dot you pass through counts toward your total"
      ],
      sequences: [
        "Look for repeating elements in the pattern",
        "Try to continue the pattern in the same rhythm",
        "Traditional Kolams often repeat every 2-4 elements"
      ],
      rotation: [
        "Your pattern should look the same when turned 90 degrees",
        "Start from the center and work outward symmetrically",
        "Each quarter of your design should be identical"
      ],
      geometry: [
        "Look for triangles, squares, and circles in your pattern",
        "Traditional Kolams hide many geometric shapes",
        "Try to identify at least 3 different shapes"
      ]
    };
    
    setHints(challengeHints[challenge.id] || []);
  }, [challenge.id]);

  const handleSuccess = () => {
    setAttempts(prev => prev + 1);
    onComplete(true);
  };

  const handleRetry = () => {
    setAttempts(prev => prev + 1);
    setShowHints(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="p-6 border-accent bg-accent/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">
              {challenge.id.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{challenge.title} Challenge</h3>
            <Badge className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onExit}>
          Exit Challenge
        </Button>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Challenge Goal:</p>
          <p className="text-sm text-muted-foreground">{challenge.description}</p>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm font-medium mb-2">Example Task:</p>
          <p className="text-sm italic">{challenge.example}</p>
        </div>

        {attempts > 0 && (
          <div className="p-3 bg-secondary/10 rounded-lg">
            <p className="text-sm">
              Attempts: <span className="font-semibold">{attempts}</span>
              {attempts > 2 && " - You're getting better with practice!"}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleSuccess} className="bg-accent hover:bg-accent/90">
            <CheckCircle className="w-4 h-4 mr-2" />
            I Completed It!
          </Button>
          <Button variant="outline" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowHints(!showHints)}
            className={showHints ? 'bg-primary/10' : ''}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHints ? 'Hide Hints' : 'Show Hints'}
          </Button>
        </div>

        {showHints && hints.length > 0 && (
          <Card className="p-4 bg-gradient-bg">
            <h4 className="font-medium mb-3">💡 Helpful Hints:</h4>
            <ul className="space-y-2">
              {hints.map((hint, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  {hint}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </Card>
  );
};