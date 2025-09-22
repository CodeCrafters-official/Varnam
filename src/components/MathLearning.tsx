import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, RotateCcw } from 'lucide-react';

interface MathConcept {
  id: string;
  title: string;
  description: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface MathLearningProps {
  onStartChallenge: (concept: MathConcept) => void;
}

export const MathLearning: React.FC<MathLearningProps> = ({ onStartChallenge }) => {
  const [concepts, setConcepts] = useState<MathConcept[]>([
    {
      id: 'symmetry',
      title: 'Lines of Symmetry',
      description: 'Learn to identify vertical, horizontal, and diagonal symmetry in Kolam patterns',
      example: 'Draw a pattern that looks the same when folded in half',
      difficulty: 'easy',
      completed: false
    },
    {
      id: 'counting',
      title: 'Dot Counting',
      description: 'Practice counting dots and understanding number patterns in grids',
      example: 'Create a Kolam using exactly 12 dots',
      difficulty: 'easy',
      completed: false
    },
    {
      id: 'sequences',
      title: 'Pattern Sequences',
      description: 'Recognize and continue repeating patterns in traditional designs',
      example: 'Complete the missing part of a repeating pattern',
      difficulty: 'medium',
      completed: false
    },
    {
      id: 'rotation',
      title: 'Rotational Symmetry',
      description: 'Understand how patterns look the same when rotated',
      example: 'Design a pattern that looks identical when turned 90°',
      difficulty: 'medium',
      completed: false
    },
    {
      id: 'geometry',
      title: 'Geometric Shapes',
      description: 'Identify triangles, squares, and other shapes within Kolam patterns',
      example: 'Find all the triangles hidden in a complex design',
      difficulty: 'hard',
      completed: false
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const toggleComplete = (id: string) => {
    setConcepts(prev => 
      prev.map(concept => 
        concept.id === id 
          ? { ...concept, completed: !concept.completed }
          : concept
      )
    );
  };

  const resetProgress = () => {
    setConcepts(prev => 
      prev.map(concept => ({ ...concept, completed: false }))
    );
  };

  const completedCount = concepts.filter(c => c.completed).length;
  const totalCount = concepts.length;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Math Learning Modules</h3>
          <p className="text-sm text-muted-foreground">
            Progress: {completedCount}/{totalCount} concepts mastered
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetProgress}>
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        {concepts.map((concept) => (
          <Card key={concept.id} className="p-4 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => toggleComplete(concept.id)}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {concept.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <h4 className="font-medium">{concept.title}</h4>
                  <Badge className={getDifficultyColor(concept.difficulty)}>
                    {concept.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 ml-8">
                  {concept.description}
                </p>
                
                <div className="ml-8 p-3 bg-muted rounded-md">
                  <p className="text-sm italic">
                    <strong>Example:</strong> {concept.example}
                  </p>
                </div>
              </div>
              
              <div className="ml-4">
                <Button
                  size="sm"
                  onClick={() => onStartChallenge(concept)}
                  className="bg-gradient-primary"
                >
                  {concept.completed ? 'Practice Again' : 'Start Challenge'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-bg rounded-lg">
        <h4 className="font-medium mb-2">🎯 Learning Goals</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Develop spatial reasoning through pattern recognition</li>
          <li>• Practice counting and number relationships</li>
          <li>• Understand geometric concepts in cultural context</li>
          <li>• Build confidence in mathematical thinking</li>
        </ul>
      </div>
    </Card>
  );
};