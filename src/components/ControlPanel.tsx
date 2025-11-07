import React, { useState } from 'react';
import '../styles/ControlPanel.css';

interface ControlPanelProps {
  onStart: (target: string, config: any) => void;
  onStop: () => void;
  onReset: () => void;
  isRunning: boolean;
  isComplete: boolean;
}

const SHAKESPEARE_QUOTES = [
  'TO BE OR NOT TO BE',
  'ALL THE WORLD IS A STAGE',
  'BREVITY IS THE SOUL OF WIT',
  'TO THINE OWN SELF BE TRUE',
  'THE COURSE OF TRUE LOVE NEVER DID RUN SMOOTH',
  'SOME ARE BORN GREAT',
  'WHAT IS PAST IS PROLOGUE',
  'LOVE ALL TRUST A FEW',
  'THE BETTER PART OF VALOR IS DISCRETION',
  'GOOD NIGHT GOOD NIGHT PARTING IS SUCH SWEET SORROW'
];

const ControlPanel: React.FC<ControlPanelProps> = ({
  onStart,
  onStop,
  onReset,
  isRunning,
  isComplete
}) => {
  const [selectedQuote, setSelectedQuote] = useState(SHAKESPEARE_QUOTES[0]);
  const [customPhrase, setCustomPhrase] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [populationSize, setPopulationSize] = useState(200);
  const [mutationRate, setMutationRate] = useState(1);
  const [elitismCount, setElitismCount] = useState(2);

  const handleStart = () => {
    const target = useCustom ? customPhrase.toUpperCase() : selectedQuote;

    if (!target || target.trim().length === 0) {
      alert('Please enter a target phrase');
      return;
    }

    const config = {
      populationSize: populationSize,
      mutationRate: mutationRate / 100, // Convert percentage to decimal
      crossoverRate: 0.8,
      elitismCount: elitismCount,
      tournamentSize: 5,
      charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ '
    };

    onStart(target, config);
  };

  return (
    <div className="control-panel">
      <h2>Genetic Algorithm Controls</h2>

      <div className="control-section">
        <h3>Target Phrase</h3>
        <div className="phrase-selection">
          <label>
            <input
              type="radio"
              checked={!useCustom}
              onChange={() => setUseCustom(false)}
              disabled={isRunning}
            />
            Shakespeare Quotes
          </label>
          <select
            value={selectedQuote}
            onChange={(e) => setSelectedQuote(e.target.value)}
            disabled={isRunning || useCustom}
            className="quote-select"
          >
            {SHAKESPEARE_QUOTES.map((quote, index) => (
              <option key={index} value={quote}>
                {quote}
              </option>
            ))}
          </select>
        </div>

        <div className="phrase-selection">
          <label>
            <input
              type="radio"
              checked={useCustom}
              onChange={() => setUseCustom(true)}
              disabled={isRunning}
            />
            Custom Phrase
          </label>
          <input
            type="text"
            value={customPhrase}
            onChange={(e) => setCustomPhrase(e.target.value)}
            disabled={isRunning || !useCustom}
            placeholder="Enter your custom phrase"
            className="custom-input"
          />
        </div>
      </div>

      <div className="control-section">
        <h3>Algorithm Parameters</h3>

        <div className="parameter">
          <label>
            Population Size: <strong>{populationSize}</strong>
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="50"
            value={populationSize}
            onChange={(e) => setPopulationSize(Number(e.target.value))}
            disabled={isRunning}
          />
          <span className="param-hint">More individuals = slower but better exploration</span>
        </div>

        <div className="parameter">
          <label>
            Mutation Rate: <strong>{mutationRate}%</strong>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={mutationRate}
            onChange={(e) => setMutationRate(Number(e.target.value))}
            disabled={isRunning}
          />
          <span className="param-hint">Higher = more diversity but slower convergence</span>
        </div>

        <div className="parameter">
          <label>
            Elitism Count: <strong>{elitismCount}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={elitismCount}
            onChange={(e) => setElitismCount(Number(e.target.value))}
            disabled={isRunning}
          />
          <span className="param-hint">Top individuals preserved each generation</span>
        </div>
      </div>

      <div className="control-buttons">
        {!isRunning && !isComplete && (
          <button className="btn btn-start" onClick={handleStart}>
            Start Evolution
          </button>
        )}

        {isRunning && (
          <button className="btn btn-stop" onClick={onStop}>
            Stop Evolution
          </button>
        )}

        {(isRunning || isComplete) && (
          <button className="btn btn-reset" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
