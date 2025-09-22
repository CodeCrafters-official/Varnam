import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eraser, RotateCcw, Eye, Download } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface KolamCanvasProps {
  gridSize?: number;
  dotSpacing?: number;
  showSymmetry?: boolean;
  onPatternComplete?: (pattern: Point[][]) => void;
}

export const KolamCanvas: React.FC<KolamCanvasProps> = ({
  gridSize = 9,
  dotSpacing = 40,
  showSymmetry = false,
  onPatternComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [allPaths, setAllPaths] = useState<Point[][]>([]);
  const [showSymmetryLines, setShowSymmetryLines] = useState(false);

  const getCanvasPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const drawDots = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'hsl(var(--kolam-dot))';
    const offsetX = (width - (gridSize - 1) * dotSpacing) / 2;
    const offsetY = (height - (gridSize - 1) * dotSpacing) / 2;
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = offsetX + i * dotSpacing;
        const y = offsetY + j * dotSpacing;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }, [gridSize, dotSpacing]);

  const drawSymmetryLines = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!showSymmetryLines) return;
    
    ctx.strokeStyle = 'hsl(var(--kolam-symmetry))';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Vertical center line
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    
    // Horizontal center line
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Diagonal lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width, 0);
    ctx.lineTo(0, height);
    ctx.stroke();
    
    ctx.setLineDash([]);
  }, [showSymmetryLines]);

  const drawPaths = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'hsl(var(--kolam-line))';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw completed paths
    allPaths.forEach(path => {
      if (path.length > 1) {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      }
    });

    // Draw current path
    if (currentPath.length > 1) {
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }
      ctx.stroke();
    }
  }, [allPaths, currentPath]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = 'hsl(var(--kolam-grid))';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw symmetry lines first (behind everything)
    drawSymmetryLines(ctx, canvas.width, canvas.height);
    
    // Draw dots
    drawDots(ctx, canvas.width, canvas.height);
    
    // Draw paths
    drawPaths(ctx);
  }, [drawDots, drawSymmetryLines, drawPaths]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const pos = getCanvasPosition(e);
    setCurrentPath([pos]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const pos = getCanvasPosition(e);
    setCurrentPath(prev => [...prev, pos]);
  };

  const handleMouseUp = () => {
    if (isDrawing && currentPath.length > 1) {
      setAllPaths(prev => [...prev, currentPath]);
      onPatternComplete?.(allPaths.concat([currentPath]));
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const clearCanvas = () => {
    setAllPaths([]);
    setCurrentPath([]);
    redrawCanvas();
  };

  const toggleSymmetry = () => {
    setShowSymmetryLines(!showSymmetryLines);
  };

  const downloadKolam = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'my-kolam.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Draw Your Kolam</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSymmetry}
            className={showSymmetryLines ? 'bg-accent text-accent-foreground' : ''}
          >
            <Eye className="w-4 h-4 mr-1" />
            Symmetry
          </Button>
          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Clear
          </Button>
          <Button variant="outline" size="sm" onClick={downloadKolam}>
            <Download className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-border rounded-lg cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Click and drag to draw connecting lines between the dots
      </div>
    </Card>
  );
};