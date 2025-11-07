import React from 'react';
import { IndividualClass } from '../types/Individual';
import '../styles/PopulationDisplay.css';

interface PopulationDisplayProps {
  population: IndividualClass[];
  target: string;
  generation: number;
  bestEver: IndividualClass | null;
  averageFitness: number;
  isComplete: boolean;
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({
  population,
  target,
  generation,
  bestEver,
  averageFitness,
  isComplete
}) => {
  /**
   * Renders a gene string with color coding for matching/non-matching characters
   */
  const renderColoredGenes = (genes: string, target: string) => {
    return (
      <span className="genes">
        {genes.split('').map((char, index) => {
          const isMatch = char === target[index];
          return (
            <span
              key={index}
              className={isMatch ? 'gene-match' : 'gene-mismatch'}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  if (population.length === 0) {
    return (
      <div className="population-display">
        <div className="no-data">
          <p>Configure parameters and click "Start Evolution" to begin</p>
        </div>
      </div>
    );
  }

  const displayCount = Math.min(20, population.length);
  const topIndividuals = population.slice(0, displayCount);

  return (
    <div className="population-display">
      {isComplete && (
        <div className="completion-message">
          <h2>Evolution Complete!</h2>
          <p>Target phrase found in {generation} generations</p>
          <div className="target-achieved">
            {target}
          </div>
        </div>
      )}

      <div className="stats-panel">
        <div className="stat">
          <span className="stat-label">Generation:</span>
          <span className="stat-value">{generation}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Best Fitness:</span>
          <span className="stat-value">{bestEver?.fitness.toFixed(2)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Avg Fitness:</span>
          <span className="stat-value">{averageFitness.toFixed(2)}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Population:</span>
          <span className="stat-value">{population.length}</span>
        </div>
      </div>

      <div className="target-display">
        <h3>Target Phrase:</h3>
        <div className="target-text">{target}</div>
      </div>

      <div className="best-individual">
        <h3>Best Individual:</h3>
        {bestEver && (
          <div className="individual-row">
            <div className="fitness-badge" style={{ backgroundColor: getFitnessColor(bestEver.fitness) }}>
              {bestEver.fitness.toFixed(1)}%
            </div>
            <div className="genes-display">
              {renderColoredGenes(bestEver.genes, target)}
            </div>
          </div>
        )}
      </div>

      <div className="population-list">
        <h3>Current Population (Top {displayCount}):</h3>
        <div className="individuals-container">
          {topIndividuals.map((individual, index) => (
            <div key={index} className="individual-row">
              <span className="individual-rank">#{index + 1}</span>
              <div className="fitness-badge" style={{ backgroundColor: getFitnessColor(individual.fitness) }}>
                {individual.fitness.toFixed(1)}%
              </div>
              <div className="genes-display">
                {renderColoredGenes(individual.genes, target)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Gets color based on fitness percentage
 */
const getFitnessColor = (fitness: number): string => {
  if (fitness >= 100) return '#00ff00';
  if (fitness >= 80) return '#66ff66';
  if (fitness >= 60) return '#ffff00';
  if (fitness >= 40) return '#ffaa00';
  if (fitness >= 20) return '#ff6600';
  return '#ff0000';
};

export default PopulationDisplay;
