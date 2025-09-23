import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, RotateCcw, Star, Heart, Sparkles } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [stars, setStars] = useState(0);
  
  useEffect(() => {
    // Set challenge-specific content
    const challengeContent = {
      symmetry: {
        hints: [
          "🪞 Make your pattern look exactly the same on both sides!",
          "📏 Use the dotted line in the middle as your mirror line",
          "✨ If you fold your pattern in half, both sides should match perfectly!"
        ],
        steps: [
          "Look at the dots and find the middle line",
          "Draw something on one side",
          "Draw the exact same thing on the other side",
          "Check if both sides match perfectly!"
        ]
      },
      counting: {
        hints: [
          "🔢 Count each dot as you touch it with your finger",
          "🎯 Your goal is to connect exactly 12 dots",
          "💡 You can count out loud: 1, 2, 3..."
        ],
        steps: [
          "Count all the dots first: 1, 2, 3...",
          "Plan your path to touch exactly 12 dots",
          "Draw your line connecting the dots",
          "Count again to make sure you got 12!"
        ]
      },
      sequences: {
        hints: [
          "🔄 Look for patterns that repeat over and over",
          "🎵 Like a song with a rhythm: do-re-mi, do-re-mi",
          "👀 Find what repeats and continue it!"
        ],
        steps: [
          "Look at the pattern and find what repeats",
          "Count how many parts repeat each time",
          "Draw the next part following the same pattern",
          "Keep going until you complete the sequence!"
        ]
      },
      rotation: {
        hints: [
          "🔄 Your pattern should look the same if you spin it around",
          "🎡 Like a pinwheel that looks identical from every angle",
          "🌟 Start from the center and work your way out evenly!"
        ],
        steps: [
          "Find the center point of your canvas",
          "Draw one part of your pattern",
          "Rotate and draw the same part 3 more times",
          "Check if it looks the same from all angles!"
        ]
      },
      geometry: {
        hints: [
          "🔺 Look for triangles (3 sides), squares (4 equal sides)",
          "⭕ Find circles and other round shapes too",
          "🔍 Shapes might be hiding inside bigger patterns!"
        ],
        steps: [
          "Look carefully at your Kolam pattern",
          "Point to each triangle you can find",
          "Point to each square or rectangle",
          "Count all the different shapes you found!"
        ]
      }
    };
    
    const content = challengeContent[challenge.id as keyof typeof challengeContent];
    setHints(content?.hints || []);
  }, [challenge.id]);

  const handleSuccess = () => {
    setStars(3);
    setTimeout(() => {
      setAttempts(prev => prev + 1);
      onComplete(true);
    }, 1500);
  };

  const handleRetry = () => {
    setAttempts(prev => prev + 1);
    setShowHints(true);
  };

  const getChallengeSteps = () => {
    const stepsByChallenge = {
      symmetry: [
        "🔍 Find the middle line on your canvas",
        "✏️ Draw something simple on one side",
        "🪞 Draw the exact same thing on the other side",
        "✅ Check if both sides match perfectly!"
      ],
      counting: [
        "👀 Look at all the dots on your canvas",
        "🔢 Count them: 1, 2, 3, 4...",
        "🎯 Plan a path that touches exactly 12 dots",
        "✏️ Draw your line connecting those 12 dots!"
      ],
      sequences: [
        "🔍 Look for the repeating pattern",
        "📝 Figure out what repeats (like: circle-line-circle-line)",
        "➡️ Continue the pattern in the same order",
        "🎉 Complete the whole sequence!"
      ],
      rotation: [
        "📍 Find the center of your canvas",
        "✏️ Draw one part of your pattern",
        "🔄 Spin and draw the same part 3 more times",
        "🌟 Your pattern should look the same from all sides!"
      ],
      geometry: [
        "👁️ Look carefully at the Kolam pattern",
        "🔺 Count all the triangles you can see",
        "⬜ Count all the squares and rectangles",
        "🎯 Try to find at least 3 different shapes!"
      ]
    };
    return stepsByChallenge[challenge.id as keyof typeof stepsByChallenge] || [];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      case 'hard': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted';
    }
  };

  const getChallengeIcon = () => {
    const icons = {
      symmetry: '🪞',
      counting: '🔢', 
      sequences: '🔄',
      rotation: '🌟',
      geometry: '🔺'
    };
    return icons[challenge.id as keyof typeof icons] || '🎯';
  };

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      {stars > 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-bounce">
            🎉 ⭐ 🎉
          </div>
        </div>
      )}

      {/* Challenge Header */}
      <Card className="p-6 border-accent bg-gradient-bg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl">
              {getChallengeIcon()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">{challenge.title} Adventure! 🚀</h2>
              <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                {challenge.difficulty} level
              </Badge>
            </div>
          </div>
          <Button variant="outline" onClick={onExit} className="text-lg px-6">
            🏠 Back Home
          </Button>
        </div>

        <div className="p-4 bg-background/50 rounded-xl border-2 border-dashed border-accent">
          <h3 className="text-lg font-semibold mb-2">🎯 Your Mission:</h3>
          <p className="text-base mb-4">{challenge.description}</p>
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-sm font-medium">📝 Example: {challenge.example}</p>
          </div>
        </div>
      </Card>

      {/* Step by Step Guide */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          📚 Step-by-Step Guide
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDemo(!showDemo)}
          >
            {showDemo ? 'Hide Steps' : 'Show Steps'}
          </Button>
        </h3>
        
        {showDemo && (
          <div className="space-y-3">
            {getChallengeSteps().map((step, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Progress and Actions */}
      <Card className="p-6 bg-secondary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">Your Progress:</h4>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.min(stars, attempts) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            {attempts > 0 && (
              <span className="text-sm text-muted-foreground ml-2">
                {attempts} attempt{attempts !== 1 ? 's' : ''} • Keep going! 💪
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button onClick={handleSuccess} className="bg-green-500 hover:bg-green-600 text-white text-lg py-6">
            <CheckCircle className="w-5 h-5 mr-2" />
            ✅ I Did It!
          </Button>
          <Button variant="outline" onClick={handleRetry} className="text-lg py-6">
            <RotateCcw className="w-5 h-5 mr-2" />
            🔄 Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowHints(!showHints)}
            className={`text-lg py-6 ${showHints ? 'bg-primary/10 border-primary' : ''}`}
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            💡 Need Help?
          </Button>
        </div>

        {showHints && hints.length > 0 && (
          <Card className="mt-4 p-4 bg-gradient-primary/10 border-primary/20">
            <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Helpful Tips Just for You! ✨
            </h4>
            <div className="space-y-2">
              {hints.map((hint, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
                  <span className="text-lg">💡</span>
                  <p className="text-sm font-medium">{hint}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {attempts > 2 && (
          <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-center text-accent font-medium">
              🌟 You're doing amazing! Practice makes perfect! 🌟
            </p>
          </div>
        )}
      </Card>

      {/* Encouraging Message */}
      <Card className="p-4 bg-gradient-subtle text-center">
        <p className="text-lg font-medium text-primary">
          🎨 Ready to create your masterpiece? Scroll down to start drawing! 👇
        </p>
      </Card>
    </div>
  );
};