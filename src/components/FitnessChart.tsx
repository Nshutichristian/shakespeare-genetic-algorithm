import React, { useEffect, useRef } from 'react';
import '../styles/FitnessChart.css';

export interface DataPoint {
  generation: number;
  bestFitness: number;
  averageFitness: number;
}

interface FitnessChartProps {
  data: DataPoint[];
}

const FitnessChart: React.FC<FitnessChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const padding = 50;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Draw background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    // Horizontal grid lines (fitness levels)
    for (let i = 0; i <= 10; i++) {
      const y = padding + (chartHeight * i) / 10;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();

      // Y-axis labels
      const fitness = 100 - (i * 10);
      ctx.fillStyle = '#888';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${fitness}%`, padding - 10, y + 4);
    }

    // Vertical grid lines (generations)
    const maxGen = Math.max(...data.map(d => d.generation));
    const genStep = Math.max(1, Math.ceil(maxGen / 10));

    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth * i) / 10;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();

      // X-axis labels
      const gen = Math.floor((i * maxGen) / 10);
      ctx.fillStyle = '#888';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(gen.toString(), x, canvas.height - padding + 20);
    }

    // Axis labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Generation', canvas.width / 2, canvas.height - 10);

    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Fitness (%)', 0, 0);
    ctx.restore();

    // Helper function to map data to canvas coordinates
    const getX = (generation: number) => {
      return padding + (generation / maxGen) * chartWidth;
    };

    const getY = (fitness: number) => {
      return padding + ((100 - fitness) / 100) * chartHeight;
    };

    // Draw best fitness line
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = getX(point.generation);
      const y = getY(point.bestFitness);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw average fitness line
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = getX(point.generation);
      const y = getY(point.averageFitness);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw legend
    const legendX = canvas.width - padding - 150;
    const legendY = padding + 20;

    // Best fitness legend
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(legendX, legendY, 20, 3);
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Best Fitness', legendX + 30, legendY + 4);

    // Average fitness legend
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(legendX, legendY + 20, 20, 2);
    ctx.fillStyle = '#fff';
    ctx.fillText('Avg Fitness', legendX + 30, legendY + 24);

  }, [data]);

  return (
    <div className="fitness-chart">
      <h3>Fitness Evolution</h3>
      <canvas
        ref={canvasRef}
        width={900}
        height={400}
        className="chart-canvas"
      />
    </div>
  );
};

export default FitnessChart;
